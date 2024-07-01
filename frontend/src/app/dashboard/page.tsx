import MonthCheckins from "@/layouts/charts/MonthCheckins";
import InfoCard from "@/layouts/components/InfoCard";
import DynamicIcon from "@/layouts/helpers/DynamicIcon";
import PageTitle from "@/layouts/partials/PageTitle";
import { infoData } from "@/service/mock/infoData";
import { Tooltip } from "@nextui-org/react";

export default function Dashboard() {
    return (
        <>
            <PageTitle title="Dashboard" />
            <div className="flex flex-col gap-2 bg-black p-10 pb-44 overflow-y-auto h-screen">
                <div id="cards" className="flex flex-row gap-2">
                    {infoData.map((card, index) => (
                        <InfoCard key={index} {...card} />
                    ))}
                </div>
                <div id="report" className="flex flex-row gap-2 w-full">
                    <div className="flex bg-secondary rounded-md w-2/3">
                        <div className="flex flex-col w-full">
                            <div className="flex flex-row justify-between items-center px-6 pt-6">
                                <h2 className="text-white font-semibold">Funcionários x Visitantes / Mês</h2>
                            </div>
                            <MonthCheckins />
                        </div>
                    </div>
                    <div className="flex flex-col gap-4 justify-center bg-secondary rounded-md w-1/3 p-6 h-fit">
                        <div className="flex flex-row justify-between items-center">
                            <h2 className="text-white font-semibold">Áreas de Acesso Popular</h2>
                            <span className="text-tertiary text-xs">Ver todos</span>
                        </div>
                        <div className="grid grid-cols-3 gap-4 w-full">
                            <Tooltip content="Laboratório">
                                <div className="bg-primary rounded-md w-full h-20 flex justify-center items-center">
                                    <DynamicIcon icon="FaFlask" color="#FFF" className="text-4xl" />
                                </div>
                            </Tooltip>
                            <Tooltip content="Cozinha">
                                <div className="bg-primary rounded-md w-full h-20 flex justify-center items-center">
                                    <DynamicIcon icon="FaKitchenSet" color="#FFF" className="text-4xl" />
                                </div>
                            </Tooltip>
                            <Tooltip content="Sala de Servidores">
                                <div className="bg-primary rounded-md w-full h-20 flex justify-center items-center">
                                    <DynamicIcon icon="FaServer" color="#FFF" className="text-4xl" />
                                </div>
                            </Tooltip>
                            <Tooltip content="Portaria">
                                <div className="bg-primary rounded-md w-full h-20 flex justify-center items-center">
                                    <DynamicIcon icon="FaDoorClosed" color="#FFF" className="text-4xl" />
                                </div>
                            </Tooltip>
                            <Tooltip content="Sala de Estar">
                                <div className="bg-primary rounded-md w-full h-20 flex justify-center items-center">
                                    <DynamicIcon icon="FaCouch" color="#FFF" className="text-4xl" />
                                </div>
                            </Tooltip>
                            <Tooltip content="Almoxarifado">
                                <div className="bg-primary rounded-md w-full h-20 flex justify-center items-center">
                                    <DynamicIcon icon="FaBroom" color="#FFF" className="text-4xl" />
                                </div>
                            </Tooltip>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

