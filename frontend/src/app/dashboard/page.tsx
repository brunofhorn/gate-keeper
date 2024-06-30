import MonthCheckins from "@/layouts/charts/MonthCheckins";
import InfoCard from "@/layouts/components/InfoCard";
import DynamicIcon from "@/layouts/helpers/DynamicIcon";
import PageTitle from "@/layouts/partials/PageTitle";
import { infoData } from "@/service/mock/infoData";

export default function Dashboard() {
    const popularAreas = [1, 2, 3, 4, 5, 6];
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
                        <MonthCheckins />
                    </div>
                    <div className="flex flex-col gap-4 justify-center bg-secondary rounded-md w-1/3 p-6 h-fit">
                        <div className="flex flex-row justify-between items-center">
                            <h2 className="text-white font-semibold">Áreas de Acesso Popular</h2>
                            <span className="text-tertiary text-xs">Ver todos</span>
                        </div>
                        <div className="grid grid-cols-3 gap-4 w-full">
                            {popularAreas.map((popular) => (
                                <div className="bg-primary rounded-md w-full h-20 flex justify-center items-center" key={popular.toString()}>
                                    <DynamicIcon icon="FaFlask" color="#FFF" className="text-4xl" />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

