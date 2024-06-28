import { ICompanyDetail } from "@/interfaces/company";

export const CompanyDetail = ({ nomeFantasia, razaoSocial, cnpj, telefone, sala = "", andar = "" }: ICompanyDetail) => {
    return (
        <div className="flex flex-col gap-5">
            <div className="flex flex-row gap-2">
                <div className="flex flex-1 flex-col gap-1">
                    <span className="font-bold">Nome fantasia:</span>
                    <span>{nomeFantasia}</span>
                </div>
                <div className="flex flex-1 flex-col gap-1">
                    <span className="font-bold">Razão social:</span>
                    <span>{razaoSocial}</span>
                </div>
            </div>
            <div className="flex flex-row gap-2 justify-between">
                <div className="flex flex-1 flex-col gap-1">
                    <span className="font-bold">CNPJ:</span>
                    <span>{cnpj}</span>
                </div>
                <div className="flex flex-1 flex-col gap-1">
                    <span className="font-bold">Telefone:</span>
                    <span>{telefone}</span>
                </div>
            </div>
            <div className="flex flex-row gap-2 justify-between">
                <div className="flex flex-1 flex-col gap-1">
                    <span className="font-bold">Sala:</span>
                    <span>{sala}</span>
                </div>
                <div className="flex flex-1 flex-col gap-1">
                    <span className="font-bold">Andar:</span>
                    <span>{andar}</span>
                </div>
            </div>
        </div>
    );
};