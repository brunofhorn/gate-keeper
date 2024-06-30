import { prisma } from "@/service/lib/prisma";
import { NextResponse } from "next/server";

export const dynamic = 'force-dynamic';

export async function PUT(request: Request) {
    const data = await request.json();

    try {
        const updatedDevice = await prisma.device.update({
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
            where: {
                id: data.id
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
            },
        });

        console.log("UPDATE: ", updatedDevice);

        return NextResponse.json(updatedDevice, { status: 200, statusText: "Dispositivo atualizado." });
    } catch (error) {
        return NextResponse.json(error, { status: 500, statusText: "Erro ao atualizar o dispositivo." });
    }
}

export async function DELETE(request: Request, { params }: { params: { id: string; }; }) {
    const deviceId = params.id;

    try {
        const deletedDevice = await prisma.device.delete({
            where: { id: deviceId },
        });

        return NextResponse.json(deletedDevice, { status: 200, statusText: "Dispositivo removido." });
    } catch (error) {
        return NextResponse.json(error, { status: 500, statusText: "Erro ao remover o dispositivo." });
    }
}