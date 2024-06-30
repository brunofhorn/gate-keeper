import { IVisitorDetail } from "@/interfaces/visitor";
import { maskCpf } from "@/service/functions/maskCpf";
import { maskMobile } from "@/service/functions/maskMobile";

export const VisitorDetail = ({ name = "", cpf = "", mobile = "" }: IVisitorDetail) => {
    return (
        <div className="flex flex-col gap-5">
            <div className="flex flex-row gap-2 justify-between">
                <div className="flex flex-1 flex-col gap-1">
                    <span className="font-bold">Nome:</span>
                    <span>{name}</span>
                </div>
                <div className="flex flex-1 flex-col gap-1">
                    <span className="font-bold">CPF:</span>
                    <span>{maskCpf(cpf)}</span>
                </div>
                <div className="flex flex-1 flex-col gap-1">
                    <span className="font-bold">Celular:</span>
                    <span>{maskMobile(mobile)}</span>
                </div>
            </div>
        </div>
    );
};