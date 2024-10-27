"use client";
import { useState, useRef, useEffect } from "react";
import TextWithLabel from "../TextWithLabel";
import { convertDate } from "@/utils";
import { MdReceiptLong } from "react-icons/md";
import { PiPrinter } from "react-icons/pi";
import { useReactToPrint } from "react-to-print";
import { CreditReportTypes } from "@/app/types";
import { CURRENCY } from "@/constants";

const CreditsReport = ({
  data,
  isLoading,
}: {
  data: CreditReportTypes;
  isLoading: boolean;
}) => {
  const {
    date,
    attendant,
    store,
    credits,
    total_credit_sales,
    total_discount,
    total_interest,
  } = data;

  const [isPrinting, setIsPrinting] = useState(false);
  const promiseResolveRef = useRef<any>(null);

  const componentRef = useRef<any>(null);
  const handlePrint = useReactToPrint({
    documentTitle: "Credit Sale Record",
    content: () => componentRef.current,
    onBeforeGetContent: () => {
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

  // We store the resolve Promise being used in `onBeforeGetContent` here

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
      <div className="flex flex-row items-center justify-between min-w-full">
        <div className="side-by-side pl-5">
          <span className="text-[30px]">{<MdReceiptLong />}</span>
          <h2 className="header-text whitespace-nowrap">Credit Sales Report</h2>
        </div>
        <div>
          <button
            onClick={handlePrint}
            className="side-by-side p-2 bg-print text-white"
            disabled={isLoading || isPrinting}
          >
            <span>
              <PiPrinter />
            </span>
            <span>{isPrinting ? "Printing..." : "Print Report"}</span>
          </button>
        </div>
      </div>

      {isLoading ? (
        <div className="w-full h-full flex items-center justify-center">
          <h3 className="animate-pulse text-slate-400 text-xl font-bold">
            Generating Report Please Wait...
          </h3>
        </div>
      ) : (
        <div
          ref={componentRef}
          className=" w-full flex flex-col items-center justify-center gap-2 p-5"
        >
          {/* COMPANY INFO */}
          <div className="mx-auto flex flex-col items-center justify-center w-full p-2 border-y-2 border-dashed">
            <h1 className="font-extrabold text-xl uppercase text-primary">
              {store?.name}
            </h1>
            <h2>
              <span>Address: </span>
              <span className="font-semibold text-base capitalize">
                {store?.address}
              </span>
            </h2>
            <h3>
              <span>Email: </span>
              <span className="font-semibold text-base">{store?.email}</span>
            </h3>
            <h3>
              <span>Phone Contact(s): </span>
              <span className="font-semibold text-base">
                {store?.contact2
                  ? store?.contact1 + ", " + store?.contact2
                  : store?.contact1}
              </span>
            </h3>
          </div>

          <div className="flex flex-col items-center justify-center w-100  gap-2 py-2">
            <h1 className="font-bold text-xl">
              Credit Sales Report as of, {date}
            </h1>
            {credits.length > 0 ? (
              <table className="min-w-full bg-white border-collapse border border-gray-200">
                <thead>
                  <tr>
                    <th className="report-th">Aggrement ID</th>
                    <th className="report-th">Customer Name</th>
                    <th className="report-th">Total ({CURRENCY})</th>
                    <th className="report-th">Interest ({CURRENCY})</th>
                    <th className="report-th">Discount ({CURRENCY})</th>
                    <th className="report-th">Date Of Sale</th>
                    <th className="report-th">Start Date</th>
                    {/* <th className="report-th">Debt ({CURRENCY})</th> */}
                    <th className="report-th">Due Date</th>
                  </tr>
                </thead>

                <tbody>
                  {credits.map((credit) => (
                    <tr key={credit.id}>
                      <td className="report-td">{credit.id}</td>
                      <td className="report-td">{credit.customer_name}</td>

                      <td className="report-td">
                        {credit?.total?.toLocaleString("en-US")}
                      </td>

                      <td className="report-td">
                        {credit.interest?.toLocaleString("en-US")}
                      </td>
                      <td className="report-td">
                        {credit.discount?.toLocaleString("en-US")}
                      </td>
                      <td className="report-td">{credit?.date_sold}</td>
                      <td className="report-td">{credit?.start_date}</td>

                      <td className="report-td">{credit?.end_date}</td>
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

          {/* Total Table */}
          <table className="min-w-full bg-white border-collapse border border-gray-200 al">
            <thead className="">
              <tr>
                <th className=" report-th">Total Sold ({CURRENCY})</th>

                <th className=" report-th">Total Discount ({CURRENCY})</th>
                <th className=" report-th">Total Interest ({CURRENCY})</th>
              </tr>
            </thead>
            <tbody className="align-middle">
              <tr>
                <td className="report-td align-middle">
                  {total_credit_sales?.toLocaleString("en-US")}
                </td>

                <td className="report-td align-middle">
                  {total_discount?.toLocaleString("en-US")}
                </td>
                <td className="report-td align-middle">
                  {total_interest?.toLocaleString("en-US")}
                </td>
              </tr>
            </tbody>
          </table>

          {/* ATTENDANT INFO */}
          <div className="mx-auto flex flex-col items-center justify-center w-full p-2 border-y-2 border-dashed">
            <h2 className="font-bold text-base">Prepared By</h2>
            <h3>
              <span>Staff Name: </span>
              <span className="font-semibold text-base">
                {attendant?.full_name + " (" + attendant?.username + ")"}
              </span>
            </h3>
            <h3>
              <span>Email: </span>
              <span className="font-semibold text-base">
                {attendant?.email}
              </span>
            </h3>
            <h3>
              <span>Phone Contact: </span>
              <span className="font-semibold text-base">
                {attendant?.contact}
              </span>
            </h3>
          </div>
        </div>
      )}
    </div>
  );
};

export default CreditsReport;
