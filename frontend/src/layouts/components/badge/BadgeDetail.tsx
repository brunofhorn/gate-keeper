import { IBadgeDetail } from "@/interfaces/badge";
import { formatDateToBrazilian } from "@/service/functions/formatDateToBrazilian";
import { maskCnpj } from "@/service/functions/maskCnpj";
import { maskCpf } from "@/service/functions/maskCpf";
import { maskMobile } from "@/service/functions/maskMobile";
import { Chip } from "@nextui-org/react";

export const BadgeDetail = ({ id, code, type, employee, permissions, visit, active }: IBadgeDetail) => {
    return (
        <>
            {type === "FIXED" ? (
                <div className="flex flex-col gap-5">
                    <div className="flex flex-row gap-2 justify-between">
                        <div className="flex flex-col gap-1 pr-4">
                            <span className="font-bold">Código:</span>
                            <span>{code}</span>
                            <Chip size="sm" color={active ? "success" : "danger"}>{active ? "ATIVO" : "INATIVO"}</Chip>
                        </div>
                        <div className="flex flex-1 flex-col gap-1">
                            <span className="font-bold">Nome do funcionário:</span>
                            <span>{employee?.name}</span>
                        </div>
                        <div className="flex flex-1 flex-col gap-1">
                            <span className="font-bold">CPF:</span>
                            <span>{maskCpf(employee?.cpf ?? "")}</span>
                        </div>
                        <div className="flex flex-1 flex-col gap-1">
                            <span className="font-bold">Celular:</span>
                            <span>{maskMobile(employee?.mobile ?? "")}</span>
                        </div>
                    </div>
                    <div className="flex flex-row gap-2 justify-between">
                        <div className="flex flex-1 flex-col gap-1">
                            <span className="font-bold">E-mail:</span>
                            <span>{employee?.email}</span>
                        </div>
                        <div className="flex flex-1 flex-col gap-1">
                            <span className="font-bold">Departamento:</span>
                            <div>{employee?.department}</div>
                        </div>
                        <div className="flex flex-1 flex-col gap-1">
                            <span className="font-bold">Cargo:</span>
                            <div>{employee?.role}</div>
                        </div>
                    </div>
                    <div className="flex flex-row gap-2 justify-between">
                        <div className="flex flex-1 flex-col gap-1">
                            <span className="font-bold">Empresa:</span>
                            <span>{employee?.company?.tradeName} ({maskCnpj(employee?.company?.cnpj ?? "")})</span>
                        </div>
                        <div className="flex flex-1 flex-col gap-1">
                            <span className="font-bold">Andar / Sala:</span>
                            <div>{employee?.company.floor} / {employee?.company.room}</div>
                        </div>
                    </div>
                    <div className="flex flex-1 flex-col gap-1">
                        <span className="font-bold">Áreas permitidas:</span>
                        <div>
                            {permissions?.map(permission => (
                                <Chip key={permission.id}>
                                    {permission.area.name}
                                </Chip>
                            ))}
                        </div>
                    </div>
                </div>
            ) : (
                <div className="flex flex-col gap-5">
                    <div className="flex flex-row gap-2 justify-between">
                        <div className="flex flex-1 flex-col gap-1">
                            <span className="font-bold">Código:</span>
                            <span>{code}</span>
                            <Chip size="sm" color={active ? "success" : "danger"}>{active ? "ATIVO" : "INATIVO"}</Chip>
                        </div>
                        <div className="flex flex-1 flex-col gap-1">
                            <span className="font-bold">Nome do Visitante:</span>
                            <span>{visit?.find(v => v.badgeId === id)?.visitor.name}</span>
                        </div>
                    </div>
                    <div className="flex flex-row gap-2 justify-between">
                        <div className="flex flex-1 flex-col gap-1">
                            <span className="font-bold">Responsável pela Visita:</span>
                            <span>{employee?.name}</span>
                        </div>
                        <div className="flex flex-1 flex-col gap-1">
                            <span className="font-bold">Empresa:</span>
                            <span>{employee?.company.tradeName}</span>
                        </div>
                    </div>
                    <div className="flex flex-row gap-2 justify-between">
                        <div className="flex flex-1 flex-col gap-1">
                            <span className="font-bold">Data inicial da visita:</span>
                            <span>{formatDateToBrazilian(visit?.find(v => v.badgeId === id)?.startDate ?? "")}</span>
                        </div>
                        <div className="flex flex-1 flex-col gap-1">
                            <span className="font-bold">Data final da visita:</span>
                            <span>{formatDateToBrazilian(visit?.find(v => v.badgeId === id)?.endDate ?? "")}</span>
                        </div>
                    </div>
                    <div className="flex flex-col gap-1">
                        <span className="font-bold">Áreas permitidas:</span>
                        <div className="flex flex-row gap-2">
                            {permissions?.map(permission => (
                                <Chip key={permission.id}>
                                    {permission.area.name}
                                </Chip>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </>

    );
};