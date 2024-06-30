import { DeviceFormData } from "@/layouts/components/device/DeviceForm";
import { prisma } from "@/service/lib/prisma";
import { NextResponse } from "next/server";

export const dynamic = 'force-dynamic';

export async function GET() {
    try {
        const devices = await prisma.device.findMany({
            include: {
                belongsArea: {
                    select: {
                        id: true,
                        name: true,
                        description: true,
                        company: {
                            select: {
                                id: true,
                                companyName: true,
                                tradeName: true
                            }
                        }
                    }
                },
            },
            orderBy: {
                name: "asc"
            }
        });

        return NextResponse.json(devices, { status: 200, statusText: "Devices listados." });
    } catch (error) {
        return NextResponse.json(error, { status: 500, statusText: "Erro ao listar os devices." });
    }
}

export async function POST(request: Request) {
    const data: DeviceFormData = await request.json();

    try {
        const deviceExist = await prisma.device.findFirst({
            where: {
                name: data.name,
                OR: [{ areaId: data.area }]
            }
        });

        if (!deviceExist) {
            const device = await prisma.device.create({
                data: {
                    name: data.name,
                    description: data.description,
                    ip: data.ip,
                    image: "",
                    belongsArea: {
                        connect: {
                            id: data.area
                        }
                    }
                },
                include: {
                    belongsArea: {
                        select: {
                            id: true,
                            name: true,
                            description: true,
                            company: {
                                select: {
                                    id: true,
                                    companyName: true,
                                    tradeName: true
                                }
                            }
                        }
                    },
                }
            });

            return NextResponse.json(device, { status: 201, statusText: "Dispositivo criado." });
        } else {
            return NextResponse.json(deviceExist, { status: 200, statusText: "Dispositivo já existe." });
        }
    } catch (error) {
        return NextResponse.json(error, { status: 500, statusText: "Erro ao cadastrar o dispositivo." });
    }
}