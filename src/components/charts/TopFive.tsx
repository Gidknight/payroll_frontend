"use client";

import React, { useState, useEffect } from "react";
import MonthSelector from "../MonthSelector";
import { getTopFives } from "@/utils/analysis";
import moment from "moment";
interface TopsTypes {
  name: string;
  quantity: number;
}

const TopFive = ({
  title = "title",
  type,
}: {
  title: string;
  type: string;
}) => {
  const date = moment().toDate();
  const CURRENT_MONTH = date.getMonth() + 1;
  const [month, setMonth] = useState(CURRENT_MONTH);
  const [isLoading, setIsLoading] = useState(false);
  const [tops, setTops] = useState<TopsTypes[]>([]);
  const [resMessage, setResMessage] = useState("");
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const data = {
        month,
        type,
      };
      try {
        setTops([]);
        const response = await getTopFives(data);
        if (response.status) {
          console.log(response);
          setTops(response.data);
        } else {
          console.log(response);
          setResMessage(response.message);
        }
      } catch (error) {
        console.log(error);
        setResMessage("No data found");
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [month]);
  return (
    <div className="holder-active">
      <div className="flex flex-row items-center justify-between w-full">
        <h2 className="font-semibold capitalize">{title}</h2>
        <MonthSelector
          selectedMonth={month}
          changeMonth={setMonth}
          id={title.trim() + "_topfive"}
        />
      </div>
      <div className="min-h-[150px] h-full bg-slate-50">
        {isLoading ? (
          <div className="w-full">
            <p className="text-center text-primary italic  animate-pulse">
              Fetching Data...
            </p>
          </div>
        ) : !isLoading && tops.length > 0 ? (
          <ol className="space-y-1">
            {tops.map((item, index) => (
              <li
                key={index}
                className="whitespace-nowrap flex flex-row items-center justify-between w-full border border-slate-400 rounded-lg px-2 py-1"
              >
                <span className="truncate whitespace-nowrap pr-1">
                  {item.name}
                </span>

                <span className="font-bold pl-1 border-l border-slate-600">
                  {item.quantity}
                </span>
              </li>
            ))}
          </ol>
        ) : (
          <div className="w-full">
            <p className="text-center text-slate-500 font-semibold italic">
              {resMessage}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default TopFive;
