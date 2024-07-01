import { VisitorFormData } from "@/layouts/components/visitor/VisitorForm";
import { prisma } from "@/service/lib/prisma";
import { NextResponse } from "next/server";

export const dynamic = 'force-dynamic';

export async function GET() {
    try {
        const visitors = await prisma.visitor.findMany({
            orderBy: {
                name: "asc"
            }
        });

        return NextResponse.json(visitors, { status: 200, statusText: "Visitantes listados." });
    } catch (error) {
        return NextResponse.json(error, { status: 500, statusText: "Erro ao listar os visitantes." });
    }
}

export async function POST(request: Request) {
    const data: VisitorFormData = await request.json();

    try {
        const visitorExist = await prisma.visitor.findFirst({
            where: {
                cpf: data.cpf
            }
        });

        if (!visitorExist) {
            const visitor = await prisma.visitor.create({
                data: {
                    name: data.name,
                    cpf: data.cpf,
                    mobile: data.mobile,
                },
            });

            return NextResponse.json(visitor, { status: 201, statusText: "Visitante criado." });
        } else {
            return NextResponse.json(visitorExist, { status: 200, statusText: "Visitante já existe." });
        }
    } catch (error) {
        return NextResponse.json(error, { status: 500, statusText: "Erro ao cadastrar o visitante." });
    }
}