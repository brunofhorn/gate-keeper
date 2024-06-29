import { AreaFormData } from "@/layouts/components/area/AreaForm";
import { prisma } from "@/service/lib/prisma";
import { NextResponse } from "next/server";

export const dynamic = 'force-dynamic';

export async function GET() {
    try {
        const areas = await prisma.area.findMany({
            include: {
                company: {
                    select: {
                        tradeName: true
                    }
                }
            },
            orderBy: {
                name: "asc"
            }
        });

        const areasWithTradeName = areas.map(area => ({
            ...area,
            companyTradeName: area.company.tradeName
        }));

        return NextResponse.json(areasWithTradeName, { status: 200, statusText: "Áreas listadas." });
    } catch (error) {
        return NextResponse.json(error, { status: 500, statusText: "Erro ao listar as áreas." });
    }
}

export async function POST(request: Request) {
    const data: AreaFormData = await request.json();

    try {
        const areaExist = await prisma.area.findFirst({
            where: {
                name: data.name,
                OR: [{ companyId: data.company }]
            }
        });

        if (!areaExist) {
            const area = await prisma.area.create({
                data: {
                    name: data.name,
                    description: data.description,
                    companyId: data.company
                }
            });

            return NextResponse.json(area, { status: 201, statusText: "Área criada." });
        } else {
            return NextResponse.json(areaExist, { status: 200, statusText: "Área já existe." });
        }
    } catch (error) {
        return NextResponse.json(error, { status: 500, statusText: "Erro ao cadastrar a área." });
    }
}