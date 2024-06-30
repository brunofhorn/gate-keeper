import { IEmployeeDetail } from "@/interfaces/employee";
import DynamicIcon from "@/layouts/helpers/DynamicIcon";
import { formatDateToBrazilian } from "@/service/functions/formatDateToBrazilian";
import { maskCpf } from "@/service/functions/maskCpf";
import { maskMobile } from "@/service/functions/maskMobile";
import { validateDate } from "@/service/functions/validateDate";
import { Avatar } from "@nextui-org/react";

export const EmployeeDetail = ({ name = "", avatar = "", birthDate = "", company, cpf = "", department = "", role = "", email = "", mobile = "" }: IEmployeeDetail) => {
    return (
        <div className="flex flex-col gap-5">
            <div className="flex flex-row gap-2 justify-between">
                <div className="pr-3">
                    <Avatar
                        src={avatar}
                        size="lg"
                        radius="md"
                        showFallback
                        fallback={
                            <DynamicIcon icon="FaUser" />
                        }
                    />
                </div>
                <div className="flex flex-1 flex-col gap-1">
                    <span className="font-bold">Nome:</span>
                    <span>{name}</span>
                </div>
                <div className="flex flex-1 flex-col gap-1">
                    <span className="font-bold">CPF:</span>
                    <span>{maskCpf(cpf)}</span>
                </div>
            </div>
            <div className="flex flex-row gap-2 justify-between">
                <div className="flex flex-1 flex-col gap-1">
                    <span className="font-bold">E-mail:</span>
                    <span>{email}</span>
                </div>
                <div className="flex flex-1 flex-col gap-1">
                    <span className="font-bold">Celular:</span>
                    <span>{maskMobile(mobile)}</span>
                </div>
                <div className="flex flex-1 flex-col gap-1">
                    <span className="font-bold">Data de Nascimento:</span>
                    <span>{formatDateToBrazilian(birthDate)}</span>
                </div>
            </div>
            <div className="flex flex-row gap-2 justify-between">
                <div className="flex flex-1 flex-col gap-1">
                    <span className="font-bold">Empresa:</span>
                    <span>{company?.tradeName}</span>
                </div>
                <div className="flex flex-1 flex-col gap-1">
                    <span className="font-bold">Departamento:</span>
                    <span>{department}</span>
                </div>
                <div className="flex flex-1 flex-col gap-1">
                    <span className="font-bold">Cargo:</span>
                    <span>{role}</span>
                </div>
            </div>
        </div>
    );
};