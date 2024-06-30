import { ICompanyDetail } from "@/interfaces/company";
import { maskCnpj } from "@/service/functions/maskCnpj";
import { maskPhone } from "@/service/functions/maskPhone";

export const CompanyDetail = ({ companyName, tradeName, cnpj, phone, room = "", floor = "" }: ICompanyDetail) => {
    return (
        <div className="flex flex-col gap-5">
            <div className="flex flex-row gap-2">
                <div className="flex flex-1 flex-col gap-1">
                    <span className="font-bold">Nome fantasia:</span>
                    <span>{companyName}</span>
                </div>
                <div className="flex flex-1 flex-col gap-1">
                    <span className="font-bold">Razão social:</span>
                    <span>{tradeName}</span>
                </div>
            </div>
            <div className="flex flex-row gap-2 justify-between">
                <div className="flex flex-1 flex-col gap-1">
                    <span className="font-bold">CNPJ:</span>
                    <span>{maskCnpj(cnpj ?? "")}</span>
                </div>
                <div className="flex flex-1 flex-col gap-1">
                    <span className="font-bold">Telefone:</span>
                    <span>{maskPhone(phone ?? "")}</span>
                </div>
            </div>
            <div className="flex flex-row gap-2 justify-between">
                <div className="flex flex-1 flex-col gap-1">
                    <span className="font-bold">Sala:</span>
                    <span>{room}</span>
                </div>
                <div className="flex flex-1 flex-col gap-1">
                    <span className="font-bold">Andar:</span>
                    <span>{floor}</span>
                </div>
            </div>
        </div>
    );
};