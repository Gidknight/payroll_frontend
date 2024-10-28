"use client";

import { STATS_OPTIONS } from "../constants";
import { useGeneralStore } from "../stores/general";

const StatsNavigation = ({
  noOfAwaiting = 0,
  noOfFailed = 0,
  noOfSent = 0,
}) => {
  const isStatsCurrent = useGeneralStore((state) => state.isStatsCurrent);
  const setIsStatsCurrent = useGeneralStore((state) => state.setIsStatsCurrent);
  const activeStyle =
    "cursor-not-allowed font-bold capitalize py-1 px-2 border-b-2 text-primary border-primary bg-white shadow-md";
  const notActiveStyle =
    "cursor-pointer py-1 px-2 font-normal capitalize border-b-2 hover:shadow-md transition-all duration-200 hover:text-primary hover:border-primary";
  return (
    <div className="flex flex-row items-center justify-center gap-5 w-full py-5">
      {STATS_OPTIONS.map((option) => (
        <button
          key={option.id}
          onClick={() => setIsStatsCurrent(option.text)}
          className={
            isStatsCurrent === option.text ? activeStyle : notActiveStyle
          }
        >
          {option.text}{" "}
          {option.text == "sent emails" ? (
            <span>({noOfSent})</span>
          ) : option.text == "failed emails" ? (
            <span>({noOfFailed})</span>
          ) : (
            <span>({noOfAwaiting})</span>
          )}
        </button>
      ))}
    </div>
  );
};

export default StatsNavigation;
