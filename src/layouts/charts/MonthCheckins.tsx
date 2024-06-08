"use client";

import React, { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { ApexOptions } from 'apexcharts';

// Carrega o componente ReactApexChart dinamicamente para evitar problemas de SSR
const ReactApexChart = dynamic(() => import('react-apexcharts'), { ssr: false });

const MonthCheckins = () => {
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    if (!isMounted) {
        return null; // Retorna null durante a renderização no servidor
    }

    // Definindo as opções do gráfico
    const options: ApexOptions = {
        chart: {
            type: 'line',
        },
        xaxis: {
            categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        },
        title: {
            text: 'My First ApexChart',
            align: 'center',
        },
    };

    // Dados do gráfico
    const series = [
        {
            name: 'Sales',
            data: [30, 40, 35, 50, 49, 60, 70, 91, 125, 145, 160, 180],
        },
    ];

    return (
        <div>
            {isMounted && (
                <ReactApexChart
                    options={options}
                    series={series}
                    type="line"
                    height={350}
                />
            )}
        </div>
    );
};

export default MonthCheckins;
