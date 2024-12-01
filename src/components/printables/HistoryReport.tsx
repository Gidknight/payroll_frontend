"use client";
import { useState, useRef, useEffect } from "react";
import TextWithLabel from "../TextWithLabel";

import { MdReceiptLong } from "react-icons/md";
import { PiPrinter } from "react-icons/pi";
import { useReactToPrint } from "react-to-print";

import { CURRENCY } from "../../constants";
import { HistoryLogTypes, MasterReportTypes } from "../../types";

const HistoryReport = ({ data }: { data: HistoryLogTypes | null }) => {
  if (data === null) return;
  const { date, organization, title, records, columns } = data;
  const [isPrinting, setIsPrinting] = useState(false);

  // We store the resolve Promise being used in `onBeforeGetContent` here
  const promiseResolveRef = useRef<any>(null);
  const componentRef = useRef<any>(null);
  const handlePrint = useReactToPrint({
    documentTitle: `${title} ${date?.Month + " " + date?.Year}`,
    contentRef: componentRef,
    onBeforePrint: () => {
      return new Promise((resolve) => {
        promiseResolveRef.current = resolve;
        setIsPrinting(true);
      });
    },
    onAfterPrint: () => {
      // Reset the Promise resolve so we can print again
      promiseResolveRef.current = null;
      setIsPrinting(false);
    },
  });

  // const getPageMargins = () => {
  //   return `@page { margin: ${marginTop} ${marginRight} ${marginBottom} ${marginLeft} !important; }`;
  // };

  // We watch for the state to change here, and for the Promise resolve to be available
  useEffect(() => {
    if (isPrinting && promiseResolveRef.current) {
      // Resolves the Promise, letting `react-to-print` know that the DOM updates are completed
      promiseResolveRef.current();
    }
  }, [isPrinting]);

  // const date = convertDate(sale.sold_at);
  // const { day_in_word, year, month_in_word } = date;

  return (
    <div className="holder-active w-full">
      {/* <style>{getPageMargins()}</style> */}
      <div className="flex flex-row items-center justify-between w-full">
        <div className="side-by-side pl-5">
          <span className="text-[30px]">{<MdReceiptLong />}</span>
          <h2 className="header-text whitespace-nowrap">History Log </h2>
        </div>
        <div>
          <button
            onClick={() => handlePrint()}
            className="side-by-side p-2 bg-print text-white"
          >
            <span>
              <PiPrinter />
            </span>
            <span>{isPrinting ? "Printing..." : "Print Report"}</span>
          </button>
        </div>
      </div>

      <div
        ref={componentRef}
        className=" w-full flex flex-col items-center justify-center gap-2 p-5"
      >
        {/* COMPANY INFO */}
        <div className="mx-auto flex flex-col items-center justify-center w-full p-2 border-y-2 border-dashed">
          <h1 className="font-extrabold text-xl uppercase text-primary">
            {organization?.OrganisationName}
          </h1>
          <h2>
            {/* <span>Address: </span> */}
            <span className="font-semibold text-base capitalize">
              {organization?.OrganisationAddress}
            </span>
          </h2>
          <h3>
            {/* <span>Email: </span> */}
            <span className="font-semibold text-base">
              {organization?.OtherInfo1}
            </span>
            <span className="font-semibold text-base">
              {organization?.OtherInfo2}
            </span>
          </h3>
        </div>

        <div className="flex flex-col items-center justify-center w-full  gap-2 py-2">
          <h1 className="font-bold text-xl">
            {title} {date?.Month + " " + date?.Year}
          </h1>
          {records.length > 0 ? (
            <table className="min-w-full bg-white border-collapse border border-gray-200">
              <thead>
                <tr>
                  {/* <th className="report-th">SN</th> */}
                  {columns.map((title) => (
                    <th
                      key={title}
                      className="border border-black whitespace-nowrap px-4"
                    >
                      {title}
                    </th>
                  ))}
                </tr>
              </thead>

              <tbody>
                {records.map((record, index) => (
                  <tr key={index} className="border-collapse">
                    {record.map((row, idx) => (
                      <td
                        key={idx}
                        className="px-2 w-100 border border-black text-sm"
                      >
                        {row}
                      </td>
                    ))}
                    {/* <td className="report-td"></td> */}
                    {/* <td className="report-td">{record.staff}</td>
                    <td className="report-td">{record.action}</td>
                    <td className="report-td">{record.createdAt}</td> */}
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div>
              <p className="text-lg text-slate-400 italic font-semibold">
                No data to display
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default HistoryReport;
