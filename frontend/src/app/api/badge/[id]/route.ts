import { prisma } from "@/service/lib/prisma";
import { NextResponse } from "next/server";

export const dynamic = 'force-dynamic';

export async function GET(request: Request, { params }: { params: { id: string; }; }) {
    const badgeId = params.id;

    try {
        const badge = await prisma.badge.findFirst({
            where: {
                code: badgeId,
            }
        });

        if (!badge) {
            return NextResponse.json({ status: 200, statusText: "Crachá disponível para cadastro." });
        } else {
            if (badge.active) {
                return NextResponse.json(badge, { status: 202, statusText: "O crachá já está cadastrado." });
            } else {
                return NextResponse.json({ status: 200, statusText: "Crachá disponível para cadastro." });
            }
        }
    } catch (error) {
        return NextResponse.json(error, { status: 500, statusText: "Erro ao buscar o crachá." });
    }
}

export async function PUT(request: Request, { params }: { params: { id: string; }; }) {
    const badgeId = params.id;

    try {
        const updatedBadge = await prisma.badge.update({
            data: {
                active: false,
                updatedAt: new Date()
            },
            include: {
                employee: {
                    include: {
                        company: true,
                    }
                },
                permissions: {
                    include: {
                        area: true,
                        badge: true
                    }
                },
                visit: {
                    include: {
                        badge: true,
                        responsibleForTheVisit: true,
                        visitor: true
                    }
                }
            },
            where: { id: badgeId },
        });

        return NextResponse.json(updatedBadge, { status: 200, statusText: "Crachá inativado." });
    } catch (error) {
        return NextResponse.json(error, { status: 500, statusText: "Erro ao inativar crachá." });
    }
}