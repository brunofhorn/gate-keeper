import { IUser } from "@/interfaces/user";
import { comparePasswords } from "@/service/functions/password";
import { prisma } from "@/service/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    const data: IUser = await request.json();

    try {
        const user = await prisma.user.findUnique({
            where: { email: data.email },
        });

        if (!user) {
            return NextResponse.json({ status: 400, statusText: "Dados inválidos." });
        }

        const passwordMatch = await comparePasswords(data.password, user.password);

        if (!passwordMatch) {
            return NextResponse.json({ status: 400, statusText: "Dados inválidos." });
        }

        return NextResponse.json(user, { status: 200, statusText: "Login feito com sucesso." });
    } catch (error) {
        return NextResponse.json(error, { status: 500, statusText: "Erro no servidor ao tentar efetuar o login." });
    }
}