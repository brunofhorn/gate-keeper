"use client";

import CountUp from 'react-countup';

type InfoCardProps = {
    number: number;
    title: string;
    subtitle?: string;
};

const InfoCard = ({ number, title, subtitle = "" }: InfoCardProps) => {
    return (
        <>
            <div className="flex flex-col bg-secondary rounded-lg w-full h-32 justify-center items-center shadow-sm">
                <CountUp delay={0} start={0} end={number} className='text-4xl text-primary font-semibold' />
                <div className="flex flex-col justify-center items-center">
                    <span className="text-base text-white/30">{title}</span>
                    <span className="text-xs text-white/20">{subtitle}</span>
                </div>
            </div>
        </>
    );
};

export default InfoCard;