import { prisma } from "@/service/lib/prisma";
import { NextResponse } from "next/server";

export const dynamic = 'force-dynamic';

export async function PUT(request: Request) {
    const data = await request.json();

    try {
        const updatedVisitor = await prisma.visitor.update({
            data: {
                name: data.name,
                cpf: data.cpf,
                mobile: data.mobile,
            },
            where: {
                id: data.id
            },
        });

        return NextResponse.json(updatedVisitor, { status: 200, statusText: "Visitante atualizado." });
    } catch (error) {
        return NextResponse.json(error, { status: 500, statusText: "Erro ao atualizar o visitante." });
    }
}

export async function DELETE(request: Request, { params }: { params: { id: string; }; }) {
    const visitorId = params.id;

    try {
        const deletedVisitor = await prisma.visitor.delete({
            where: { id: visitorId },
        });

        return NextResponse.json(deletedVisitor, { status: 200, statusText: "Visitante removido." });
    } catch (error) {
        return NextResponse.json(error, { status: 500, statusText: "Erro ao remover o visitante." });
    }
}