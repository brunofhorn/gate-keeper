import { IAreaDetail } from "@/interfaces/area";

export const AreaDetail = ({ name = "", description = "", companyTradeName = "" }: IAreaDetail) => {
    return (
        <div className="flex flex-col gap-5">
            <div className="flex flex-row gap-2 justify-between">
                <div className="flex flex-1 flex-col gap-1">
                    <span className="font-bold">Empresa:</span>
                    <span>{companyTradeName}</span>
                </div>
                <div className="flex flex-1 flex-col gap-1">
                    <span className="font-bold">Nome da área:</span>
                    <span>{name}</span>
                </div>
            </div>
            <div className="flex flex-1 flex-col gap-1">
                <span className="font-bold">Descrição:</span>
                <span>{description}</span>
            </div>
        </div>
    );
};