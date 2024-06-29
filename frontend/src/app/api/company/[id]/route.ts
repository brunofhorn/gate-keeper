import { prisma } from "@/service/lib/prisma";
import { NextResponse } from "next/server";

export const dynamic = 'force-dynamic';

export async function PUT(request: Request) {
    const data = await request.json();

    try {
        const updatedCompany = await prisma.company.update({
            data: { ...data },
            where: {
                id: data.id
            }
        });

        return NextResponse.json(updatedCompany, { status: 200, statusText: "Empresa atualizada." });
    } catch (error) {
        return NextResponse.json(error, { status: 500, statusText: "Erro ao atualizar a empresa." });
    }
}

export async function DELETE(request: Request, { params }: { params: { id: string; }; }) {
    const companyId = params.id;

    try {
        const deletedCompany = await prisma.company.delete({
            where: { id: companyId },
        });

        return NextResponse.json(deletedCompany, { status: 200, statusText: "Empresa removida." });
    } catch (error) {
        return NextResponse.json(error, { status: 500, statusText: "Erro ao remover a empresa." });
    }
}