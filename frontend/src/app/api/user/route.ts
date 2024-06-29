import { IUser } from "@/interfaces/user";
import { hashPassword } from "@/service/functions/password";
import { prisma } from "@/service/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    const data: IUser = await request.json();

    try {
        const userExist = await prisma.user.findUnique({
            where: {
                email: data.email,
                OR: [
                    { cpf: data.cpf }
                ]
            }
        });

        if (userExist) {
            return NextResponse.json({ status: 400, statusText: "O usuário já existe." });
        }

        const hashedPassword = await hashPassword(data.password);

        const user = await prisma.user.create({
            data: {
                cpf: data.cpf,
                name: data.name,
                username: data.username,
                email: data.email,
                password: hashedPassword,
            },
        });

        return NextResponse.json(user, { status: 200, statusText: "O usuário foi criado com sucesso." });
    } catch (error) {
        return NextResponse.json(error, { status: 500, statusText: "Erro no servidor ao tentar realizar o cadastro." });
    }
}