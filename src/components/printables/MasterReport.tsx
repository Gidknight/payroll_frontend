"use client";
import { useState, useRef, useEffect } from "react";
import TextWithLabel from "../TextWithLabel";

import { MdReceiptLong } from "react-icons/md";
import { PiPrinter } from "react-icons/pi";
import { useReactToPrint } from "react-to-print";

import { CURRENCY } from "../../constants";
import { MasterReportTypes } from "../../types";

const MasterReport = ({ data }: { data: MasterReportTypes | null }) => {
  if (data === null) return;
  const {
    date,
    available_allowances,
    available_deductions,
    organization,
    report,
    summations,
    title,
  } = data;
  const [isPrinting, setIsPrinting] = useState(false);
  const [serial, setSerial] = useState(0);

  // We store the resolve Promise being used in `onBeforeGetContent` here
  const promiseResolveRef = useRef<any>(null);
  const componentRef = useRef<any>(null);
  const handlePrint = useReactToPrint({
    documentTitle: "Master Report",
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
    <div className="holder-active">
      {/* <style>{getPageMargins()}</style> */}
      <div className="flex flex-row items-center justify-between w-full">
        <div className="side-by-side pl-5">
          <span className="text-[30px]">{<MdReceiptLong />}</span>
          <h2 className="header-text whitespace-nowrap">Master Report</h2>
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

        <div className="flex flex-col items-center justify-center w-100  gap-2 py-2">
          <h1 className="font-bold text-xl">
            {title}, {date?.Month + ", " + date?.Year}
          </h1>
          {report.length > 0 ? (
            <table className="min-w-full bg-white border-collapse border border-gray-200">
              <thead>
                <tr>
                  {/* <th className="report-th"></th> */}
                  <th className="report-th">SN</th>
                  <th className="report-th">Staff No</th>
                  <th className="report-th">Full Name</th>
                  <th className="report-th">Level</th>
                  <th className="report-th">Bank</th>
                  <th className="report-th">Subunit</th>
                  <th className="report-th">Basic Pay ({CURRENCY})</th>
                  <th className="report-th">
                    Gross Pay | Net Pay ({CURRENCY})
                  </th>
                  <th className="report-th">Allowances</th>
                  <th className="report-th">Deductions</th>
                </tr>
              </thead>

              {report.map((department, index) => (
                <>
                  <tbody>
                    <tr>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td className="text-nowrap font-bold text-center py-2 underline underline-offset-1">
                        {department[0]}
                      </td>
                      <td></td>
                      <td></td>
                      <td className="report-th">
                        <tr className="w-full flex items-center justify-between">
                          {/* <td>Name</td>
                          <td>Amount</td> */}
                        </tr>
                      </td>
                      <td className="report-th">
                        <tr className="w-full flex items-center justify-between">
                          {/* <td>Name</td>
                          <td>Amount</td> */}
                        </tr>
                      </td>
                    </tr>
                  </tbody>
                  <tbody key={index}>
                    {department?.map((rep, idx) => {
                      if (idx != 0) {
                        // setSerial((prev) => prev + 1);
                        return (
                          <tr key={idx}>
                            {/* <td className="report-td"></td> */}
                            <td className="report-td">{idx}</td>
                            <td className="report-td">{rep?.staff_no}</td>
                            <td className="report-td">{rep?.full_names}</td>
                            <td className="report-td">{rep?.level}</td>
                            <td className="report-td">{rep.bank}</td>
                            <td className="report-td">{rep.subunit}</td>
                            <td className="report-td">
                              {rep.basic_salary?.toLocaleString("en-US")}
                            </td>
                            <td className="report-td ">
                              {rep?.gross_pay?.toLocaleString("en-US") +
                                " | " +
                                rep.gross_pay?.toLocaleString("en-US")}
                            </td>
                            <td className="flex flex-col items-center justify-start w-full">
                              {rep?.allowances.map((allow, aindx) => (
                                <tr
                                  key={aindx}
                                  className="text-[9px] flex flex-row items-center justify-between w-full"
                                >
                                  <td>{allow.name}</td>
                                  <td>{allow.amount?.toFixed(2)}</td>
                                </tr>
                              ))}
                              <tr className="text-[10px] flex flex-row items-center justify-between w-full font-bold border-y border-black">
                                <td>Total</td>
                                <td>
                                  {rep.total_allowance.toLocaleString("en-US")}
                                </td>
                              </tr>
                            </td>

                            <td>
                              {rep?.deductions.map((allow, dindx) => (
                                <tr
                                  key={dindx}
                                  className="text-[9px] flex flex-row items-center justify-between"
                                >
                                  <td>{allow.name}</td>
                                  <td>{allow.amount?.toFixed(2)}</td>
                                </tr>
                              ))}
                              <tr className="text-[10px] flex flex-row items-center justify-between w-full font-bold border-y border-black">
                                <td>Total</td>
                                <td>
                                  {rep.total_deductions.toLocaleString("en-US")}
                                </td>
                              </tr>
                            </td>
                          </tr>
                        );
                      }
                    })}
                  </tbody>
                </>
              ))}
            </table>
          ) : (
            <div>
              <p className="text-lg text-slate-400 italic font-semibold">
                No data to display
              </p>
            </div>
          )}
        </div>

        <div className="my-5 w-full flex flex-row items-start justify-evenly gap-10">
          <div className="w-1/2 h-full">
            <h1 className="text-2xl font-bold uppercase">Allowances</h1>
            <table className="w-full">
              <thead>
                <tr>
                  <th className="border border-black">Name</th>
                  <th className="border border-black">Total</th>
                </tr>
              </thead>
              <tbody>
                {available_allowances.map((allow, indx) => (
                  <tr key={indx} className="">
                    <td className="px-4 border border-black">{allow?.name}</td>
                    <td className="text-right px-4 border border-black">
                      {allow?.total.toLocaleString("us-EN")}
                    </td>
                  </tr>
                ))}
                <tr className="font-bold text-[14px] border border-black">
                  <td>Total Allowance</td>
                  <td className="text-right">
                    {summations?.total_allowance.toLocaleString("en-US")}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="w-1/2">
            <h1 className="text-2xl font-bold uppercase">Deductions</h1>
            <table className="w-full ">
              <thead>
                <tr className="">
                  <th className="border border-black">Name</th>
                  <th className="border border-black">Total</th>
                </tr>
              </thead>
              <tbody>
                {available_deductions.map((deduc, indx) => (
                  <tr key={indx}>
                    <td className="px-4 border border-black">{deduc?.name}</td>
                    <td className="text-right px-4 border border-black">
                      {deduc?.total.toLocaleString("us-EN")}
                    </td>
                  </tr>
                ))}
                <tr className="font-bold text-[14px] border border-black">
                  <td>Total Deduction</td>
                  <td className="text-right">
                    {summations?.total_deduction.toLocaleString("en-US")}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        {/* SUMMATIONS INFO */}
        <div className="mx-auto flex flex-col items-center justify-center w-1/2 p-2 border border-gray-300 mt-5">
          <h1 className="text-2xl font-bold uppercase">Summation</h1>
          <div className="text-[14px] font-bold w-full border-2 border-black p-2 space-y-2 uppercase">
            <div className="flex flex-row items-center justify-between">
              <p>Total Allowance</p>
              <p>{summations?.total_allowance?.toLocaleString("us-EN")}</p>
            </div>
            <div className="flex flex-row items-center justify-between">
              <p>Total Basic Pay</p>
              <p>{summations?.total_basic?.toLocaleString("us-EN")}</p>
            </div>
            <div className="flex flex-row items-center justify-between">
              <p>Gross For Normal Staffs</p>
              <p>{summations?.total_gross?.toLocaleString("us-EN")}</p>
            </div>
            <div className="flex flex-row items-center justify-between">
              <p>Total Net Pay</p>
              <p>{summations?.total_netpay?.toLocaleString("us-EN")}</p>
            </div>
            <div className="flex flex-row items-center justify-between">
              <p>Total Deduction</p>
              <p>{summations?.total_deduction?.toLocaleString("us-EN")}</p>
            </div>
            <div className="flex flex-row items-center justify-between">
              <p>Total Number Of Staffs</p>
              <p>{summations?.no_of_staff?.toLocaleString("us-EN")}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MasterReport;
