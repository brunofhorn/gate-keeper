import { prisma } from "@/service/lib/prisma";
import { NextResponse } from "next/server";

export const dynamic = 'force-dynamic';

export async function PUT(request: Request) {
    const data = await request.json();

    try {
        const updatedArea = await prisma.area.update({
            data: {
                name: data.name,
                description: data.description,
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
                company: {
                    select: {
                        tradeName: true
                    }
                }
            }
        });

        const areaWithTradeName = {
            ...updatedArea,
            companyTradeName: updatedArea.company.tradeName
        };

        return NextResponse.json(areaWithTradeName, { status: 200, statusText: "Área atualizada." });
    } catch (error) {
        return NextResponse.json(error, { status: 500, statusText: "Erro ao atualizar a área." });
    }
}

export async function DELETE(request: Request, { params }: { params: { id: string; }; }) {
    const areaId = params.id;

    try {
        const deletedArea = await prisma.area.delete({
            where: { id: areaId },
        });

        return NextResponse.json(deletedArea, { status: 200, statusText: "Área removida." });
    } catch (error) {
        return NextResponse.json(error, { status: 500, statusText: "Erro ao remover a área." });
    }
}