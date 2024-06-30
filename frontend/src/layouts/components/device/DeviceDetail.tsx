import { IDeviceDetail } from "@/interfaces/device";

export const DeviceDetail = ({ name = "", description = "", ip = "", image = "", belongsArea }: IDeviceDetail) => {
    return (
        <div className="flex flex-col gap-5">
            <div className="flex flex-row gap-2 justify-between">
                <div className="flex flex-1 flex-col gap-1">
                    <span className="font-bold">Empresa:</span>
                    <span>{belongsArea?.company?.tradeName}</span>
                </div>
                <div className="flex flex-1 flex-col gap-1">
                    <span className="font-bold">Nome da área:</span>
                    <span>{belongsArea?.name}</span>
                </div>
            </div>
            <div className="flex flex-row gap-2 justify-between">
                <div className="flex flex-1 flex-col gap-1">
                    <span className="font-bold">Dispositivo:</span>
                    <span>{name}</span>
                </div>
                <div className="flex flex-1 flex-col gap-1">
                    <span className="font-bold">IP:</span>
                    <span>{ip}</span>
                </div>
            </div>
            <div className="flex flex-1 flex-col gap-1">
                <span className="font-bold">Descrição:</span>
                <span>{description}</span>
            </div>
        </div>
    );
};