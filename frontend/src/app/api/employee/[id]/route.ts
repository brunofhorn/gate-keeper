import { prisma } from "@/service/lib/prisma";
import { NextResponse } from "next/server";

export const dynamic = 'force-dynamic';

export async function PUT(request: Request) {
    const data = await request.json();

    try {
        const updatedEmployee = await prisma.employee.update({
            data: {
                name: data.name,
                avatar: "",
                birthDate: data.birthDate,
                cpf: data.cpf,
                department: data.department,
                email: data.email,
                mobile: data.mobile,
                role: data.role,
                company: {
                    connect: {
                        id: data.company
                    }
                }
            },
            where: {
                id: data.id
            },
            include: {
                company: true
            },
        });

        return NextResponse.json(updatedEmployee, { status: 200, statusText: "Funcionário atualizado." });
    } catch (error) {
        return NextResponse.json(error, { status: 500, statusText: "Erro ao atualizar o funcionário." });
    }
}

export async function DELETE(request: Request, { params }: { params: { id: string; }; }) {
    const employeeId = params.id;

    try {
        const deletedEmployee = await prisma.employee.delete({
            where: { id: employeeId },
        });

        return NextResponse.json(deletedEmployee, { status: 200, statusText: "Funcionário removido." });
    } catch (error) {
        return NextResponse.json(error, { status: 500, statusText: "Erro ao remover o funcionário." });
    }
}