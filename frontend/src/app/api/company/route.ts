import { CompanyFormData } from "@/layouts/components/CompanyForm";
import { prisma } from "@/service/lib/prisma";
import { NextResponse } from "next/server";

export const dynamic = 'force-dynamic'; // defaults to auto
export async function GET(request: Request) {

}

export async function POST(request: Request) {
    const data: CompanyFormData = await request.json();

    try {
        const companyExist = await prisma.company.findUnique({
            where: {
                cnpj: data.cnpj
            }
        });

        if (!companyExist) {
            const company = await prisma.company.create({ data });
            return NextResponse.json(company, { status: 201, statusText: "Empresa criada." });
        } else {
            return NextResponse.json(companyExist, { status: 200, statusText: "Empresa já existe." });
        }
    } catch (error) {
        return NextResponse.json(error, { status: 500, statusText: "Erro ao cadastrar a empresa" });
    }
}