import { BadgeFormData } from "@/layouts/components/badge/BadgeForm";
import { prisma } from "@/service/lib/prisma";
import { BadgeType } from "@prisma/client";
import { NextResponse } from "next/server";

export const dynamic = 'force-dynamic';

export async function GET() {
    try {
        const badges = await prisma.badge.findMany({
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
            orderBy: {
                code: "asc"
            }
        });

        return NextResponse.json(badges, { status: 200, statusText: "Crachás listados." });
    } catch (error) {
        return NextResponse.json(error, { status: 500, statusText: "Erro ao listar os crachás." });
    }
}

export async function POST(request: Request) {
    const data: BadgeFormData = await request.json();

    try {
        const badgeExist = await prisma.badge.findFirst({
            where: {
                code: data.code,
            }
        });

        if (!badgeExist) {
            const permissionsArray = data.permissions.split(',').map(id => id.trim());

            if (data.type === "FIXED") {
                const badge = await prisma.badge.create({
                    data: {
                        type: data.type as BadgeType,
                        code: data.code,
                        employee: {
                            connect: {
                                id: data.employee,
                            },
                        },
                        permissions: {
                            create: permissionsArray.map(areaId => ({
                                area: {
                                    connect: { id: areaId }
                                }
                            })),
                        },
                    }
                });

                return NextResponse.json(badge, { status: 201, statusText: "Crachá de funcionário criado." });
            } else {
                const badge = await prisma.badge.create({
                    data: {
                        type: data.type as BadgeType,
                        code: data.code,
                        employee: {
                            connect: {
                                id: data.employee,
                            },
                        },
                        permissions: {
                            create: permissionsArray.map(areaId => ({
                                area: {
                                    connect: { id: areaId }
                                }
                            })),
                        },
                        visit: {
                            create: {
                                visitor: {
                                    connect: {
                                        id: data.visitor,
                                    },
                                },
                                responsibleForTheVisit: {
                                    connect: {
                                        id: data.employee,
                                    },
                                },
                                startDate: data?.startDate ?? "",
                                endDate: data?.endDate ?? "",
                                observations: data?.observations ?? "",
                            },
                        },
                    }
                });

                return NextResponse.json(badge, { status: 201, statusText: "Crachá de visitante criado." });
            }
        } else {
            return NextResponse.json(badgeExist, { status: 200, statusText: "Crachá já existe." });
        }
    } catch (error) {
        return NextResponse.json(error, { status: 500, statusText: "Erro ao cadastrar o crachá." });
    }
}