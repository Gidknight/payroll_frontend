"use client";

import React from "react";
import { Bar, BarChart, CartesianGrid, Tooltip, XAxis, YAxis } from "recharts";

const dummy = [
  { key: "january", value: 304505 },
  { key: "february", value: 230545 },
  { key: "march", value: 230456 },
  { key: "april", value: 53045 },
  { key: "may", value: 673045 },
  { key: "june", value: 278456 },
  { key: "july", value: 278304 },
  { key: "august", value: 278304 },
  { key: "september", value: 278304 },
  { key: "october", value: 278304 },
  { key: "november", value: 278304 },
  { key: "december", value: 278304 },
];

interface BarGraphTypes {
  title: string;
  height?: number;
  width?: number;
  fill?: string;
  data: { key: string | number; value: number }[];
}

const BarGraph = ({
  title = "title",
  data = [],
  width = 700,
  height = 300,
  fill = "#1A4CAF",
}: BarGraphTypes) => {
  return (
    <div className="holder-null">
      <h2 className="font-bold text-2xl capitalize pb-3">{title}</h2>

      <div className="w-full mx-auto">
        {data.length === 0 ? (
          <div>
            <p>No Data To Display</p>
          </div>
        ) : (
          <BarChart
            width={width}
            height={height}
            data={data}
            margin={{ top: 10, right: 20, left: 20, bottom: 10 }}
          >
            <XAxis dataKey="key" />
            {/* <YAxis /> */}
            <Tooltip />
            {/* <CartesianGrid stroke="#f5f5f5" strokeDasharray="5 5" /> */}
            <Bar type="monotone" dataKey="value" fill={fill} />
            {/* <Line type="monotone" dataKey="pv" stroke="#387908" yAxisId={1} /> */}
          </BarChart>
        )}
      </div>
    </div>
  );
};

export default BarGraph;
