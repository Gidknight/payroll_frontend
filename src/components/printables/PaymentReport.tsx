"use client";
import { useState, useRef, useEffect } from "react";
import TextWithLabel from "../TextWithLabel";
import { convertDate } from "@/utils";
import { MdReceiptLong } from "react-icons/md";
import { PiPrinter } from "react-icons/pi";
import { useReactToPrint } from "react-to-print";
import { PaymentReportTypes } from "@/app/types";
import { CURRENCY } from "@/constants";

const PaymentReport = ({
  data,
  isLoading,
}: {
  data: PaymentReportTypes;
  isLoading: boolean;
}) => {
  const {
    date,
    attendant,
    store,
    payments,
    total_payment,
    total_card_payment,
    total_cash_payment,
    total_transfer_payment,
    total_customer,
  } = data;
  const componentRef = useRef<any>(null);

  const [isPrinting, setIsPrinting] = useState(false);

  // We store the resolve Promise being used in `onBeforeGetContent` here
  const promiseResolveRef = useRef<any>(null);
  const handlePrint = useReactToPrint({
    documentTitle: "Payments Record",
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
    <div className="holder-active min-w-full">
      {/* <style>{getPageMargins()}</style> */}
      <div className="flex flex-row items-center justify-between min-w-full">
        <div className="side-by-side pl-5">
          <span className="text-[30px]">{<MdReceiptLong />}</span>
          <h2 className="header-text whitespace-nowrap">Payment Report</h2>
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
        <div className="min-w-full h-full flex items-center justify-center">
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
            <h1 className="font-bold text-xl">Payment Report as of, {date}</h1>
            {payments.length > 0 ? (
              <table className="min-w-full bg-white border-collapse border border-gray-200">
                <thead>
                  <tr>
                    <th className="report-th">Payment ID</th>
                    <th className="report-th">Customer Name</th>
                    <th className="report-th">Attendant</th>
                    <th className="report-th">Amount ({CURRENCY})</th>
                    <th className="report-th">Mode Of Payment</th>
                    <th className="report-th">Reason</th>
                    <th className="report-th">Previous Balance ({CURRENCY})</th>
                    <th className="report-th">New Balance ({CURRENCY})</th>
                    <th className="report-th">Date</th>
                  </tr>
                </thead>

                <tbody>
                  {payments.map((payment) => (
                    <tr key={payment.id}>
                      <td className="report-td">{payment.id}</td>
                      <td className="report-td">{payment.customer_name}</td>
                      <td className="report-td">{payment.attendant}</td>
                      <td className="report-td">
                        {payment.payment?.toLocaleString("en-US")}
                      </td>
                      <td className="report-td">{payment.mode_of_payment}</td>
                      <td className="report-td">
                        {payment?.top_up == true ? "Top Up" : "Debt Payment"}
                      </td>

                      <td className="report-td">
                        {payment.prev_balance?.toLocaleString("en-US")}
                      </td>
                      <td className="report-td">
                        {payment.new_balance?.toLocaleString("en-US")}
                      </td>

                      <td className="report-td">{payment?.date_paid}</td>
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
            <thead className="align-middle">
              <tr>
                <th className=" report-th">Total Customers </th>
                <th className=" report-th">Total Cash Payment </th>
                <th className=" report-th">Total Card Payment </th>
                <th className=" report-th">Total Transfer Payment </th>
                <th className=" report-th">Total Payment ({CURRENCY})</th>
              </tr>
            </thead>
            <tbody className="align-middle">
              <tr>
                <td className="report-td align-middle">
                  {total_customer?.toLocaleString("en-US")}
                </td>
                <td className="report-td align-middle">
                  {total_cash_payment?.toLocaleString("en-US")}
                </td>
                <td className="report-td align-middle">
                  {total_card_payment?.toLocaleString("en-US")}
                </td>
                <td className="report-td align-middle">
                  {total_transfer_payment?.toLocaleString("en-US")}
                </td>

                <td className="report-td align-middle">
                  {total_payment?.toLocaleString("en-US")}
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

export default PaymentReport;
