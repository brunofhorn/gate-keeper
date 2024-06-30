import { EmployeeFormData } from "@/layouts/components/employee/EmployeeForm";
import { prisma } from "@/service/lib/prisma";
import { NextResponse } from "next/server";

export const dynamic = 'force-dynamic';

export async function GET() {
    try {
        const employees = await prisma.employee.findMany({
            include: {
                company: true
            },
            orderBy: {
                name: "asc"
            }
        });

        return NextResponse.json(employees, { status: 200, statusText: "Employees listados." });
    } catch (error) {
        return NextResponse.json(error, { status: 500, statusText: "Erro ao listar os employees." });
    }
}

export async function POST(request: Request) {
    const data: EmployeeFormData = await request.json();

    try {
        const employeeExist = await prisma.employee.findFirst({
            where: {
                cpf: data.cpf
            }
        });

        if (!employeeExist) {
            const employee = await prisma.employee.create({
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
                include: {
                    company: true
                }
            });

            return NextResponse.json(employee, { status: 201, statusText: "Funcionário criado." });
        } else {
            return NextResponse.json(employeeExist, { status: 200, statusText: "Funcionário já existe." });
        }
    } catch (error) {
        return NextResponse.json(error, { status: 500, statusText: "Erro ao cadastrar o funcionário." });
    }
}