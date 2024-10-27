"use client";

import React from "react";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

const AllItemsChart = ({
  percentage = 0,
  stroke = "rgb(14, 85, 201)",
}: {
  percentage: number;
  stroke?: string;
}) => {
  return (
    <div>
      <CircularProgressbar
        value={percentage}
        text={`${percentage}%`}
        styles={{
          path: {
            stroke: percentage > 25 ? stroke : "red",
            // strokeLinecap: "butt",
            // transition: "stroke-dashoffset 0.5s ease 0s",
            // transform: "rotate(0.25turn)",
            // transformOrigin: "center center",
          },
          text: {
            fill: percentage > 25 ? stroke : "red",
            // Text size
            fontSize: "20px",
            fontWeight: "normal",
          },
        }}
        // styles={{
        //   // Customize the root svg element
        //   root: {},
        //   // Customize the path, i.e. the "completed progress"
        //   path: {
        //     // Path color
        //     stroke: `rgba(62, 152, 199, ${percentage / 100})`,
        //     // Whether to use rounded or flat corners on the ends - can use 'butt' or 'round'
        //     strokeLinecap: "butt",
        //     // Customize transition animation
        //     transition: "stroke-dashoffset 0.5s ease 0s",
        //     // Rotate the path
        //     transform: "rotate(0.25turn)",
        //     transformOrigin: "center center",
        //   },
        //   // Customize the circle behind the path, i.e. the "total progress"
        //   trail: {
        //     // Trail color
        //     stroke: "#d6d6d6",
        //     // Whether to use rounded or flat corners on the ends - can use 'butt' or 'round'
        //     strokeLinecap: "butt",
        //     // Rotate the trail
        //     transform: "rotate(0.25turn)",
        //     transformOrigin: "center center",
        //   },
        //   // Customize the text
        //   text: {
        //     // Text color
        //     fill: "green",
        //     // Text size
        //     fontSize: "16px",
        //   },
        //   // Customize background - only used when the `background` prop is true
        //   background: {
        //     fill: "#3e98c7",
        //   },
        // }}
      />
    </div>
  );
};

export default AllItemsChart;
