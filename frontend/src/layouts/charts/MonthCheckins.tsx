"use client";
// components/ExampleChart.tsx
import React from 'react';
import { VictoryChart, VictoryArea, VictoryTheme } from 'victory';

const data = [
    { x: 1, y: 2 },
    { x: 2, y: 3 },
    { x: 3, y: 3 },
    { x: 4, y: 4 },
    { x: 5, y: 6 },
];

const data2 = [
    { x: 1, y: 1 },
    { x: 2, y: 3 },
    { x: 3, y: 2 },
    { x: 4, y: 3 },
    { x: 5, y: 1 },
];

const MonthCheckins = () => (
    <VictoryChart theme={VictoryTheme.material}>
        <VictoryArea
            data={data}
            style={{
                data: { stroke: "#7C0ED9" },
                parent: { border: "1px solid #ccc" }
            }}
        />
        <VictoryArea
            data={data2}
            style={{
                data: { stroke: "#fff444" },
                parent: { border: "1px solid #ccc" }
            }}
        />
    </VictoryChart>
);

export default MonthCheckins;
