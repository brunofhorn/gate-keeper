import MonthCheckins from "@/layouts/charts/MonthCheckins";
import InfoCard from "@/layouts/components/InfoCard";
import { infoData } from "@/service/mock/infoData";

export default function Dashboard() {
    return (
        <>
            <div className="flex flex-col gap-2">
                <div id="cards" className="flex flex-row gap-2">
                    {infoData.map((card, index) => (
                        <InfoCard key={index} {...card} />
                    ))}
                </div>
                <div id="report" className="flex flex-row gap-2 w-full">
                    <div className="flex bg-secondary rounded-md w-full">
                        <MonthCheckins />
                    </div>
                    <div className="flex bg-secondary rounded-md w-full">
                        RELATORIO
                    </div>
                </div>
            </div>
        </>
    );
}