"use client";
import { useState, useRef, useEffect } from "react";
import { MdReceiptLong } from "react-icons/md";
import { PiPrinter } from "react-icons/pi";
import { useReactToPrint } from "react-to-print";
import { SalesReportTypes } from "@/app/types";
import { CURRENCY } from "@/constants";

const SalesReport = ({
  data,
  isLoading,
  title = "Cash Sales Report",
}: {
  data: SalesReportTypes;
  isLoading: boolean;
  title: string;
}) => {
  const { date, attendant, store, sales, total_cash_sales, total_discount } =
    data;
  const [isPrinting, setIsPrinting] = useState(false);

  // We store the resolve Promise being used in `onBeforeGetContent` here
  const promiseResolveRef = useRef<any>(null);
  const componentRef = useRef<any>(null);
  const handlePrint = useReactToPrint({
    documentTitle: "Custormer Sale Record",
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
      <div className="flex flex-row items-center justify-between min-w-full">
        <div className="side-by-side pl-5">
          <span className="text-[30px]">{<MdReceiptLong />}</span>
          <h2 className="header-text whitespace-nowrap">Sales Report</h2>
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
              {title} {date}
            </h1>
            {sales.length > 0 ? (
              <table className="min-w-full bg-white border-collapse border border-gray-200">
                <thead>
                  <tr>
                    <th className="report-th">Sales ID</th>
                    <th className="report-th">Customer Name</th>
                    <th className="report-th">Mode Of Payment</th>
                    <th className="report-th">Product(s)</th>
                    <th className="report-th">Quantity</th>
                    <th className="report-th">Total ({CURRENCY})</th>
                    <th className="report-th">Discount ({CURRENCY})</th>
                    <th className="report-th">Total Cash Paid ({CURRENCY})</th>
                    <th className="report-th">Cash Change ({CURRENCY})</th>
                    {/* <th className="report-th">Debt ({CURRENCY})</th> */}
                    <th className="report-th">Date</th>
                  </tr>
                </thead>

                <tbody>
                  {sales.map((sale) => (
                    <tr key={sale.id}>
                      <td className="report-td">{sale.id}</td>
                      <td className="report-td">{sale.customer_name}</td>
                      <td className="report-td">{sale.mode_of_payment}</td>
                      <td className="report-td">{sale?.products.join(", ")}</td>
                      <td className="report-td">
                        {sale.quantity?.toLocaleString("en-US")}
                      </td>

                      <td className="report-td">
                        {sale.price?.toLocaleString("en-US")}
                      </td>
                      <td className="report-td">
                        {sale.discount?.toLocaleString("en-US")}
                      </td>
                      <td className="report-td">
                        {sale?.amount_paid?.toLocaleString("en-US")}
                      </td>
                      <td className="report-td">
                        {sale?.change?.toLocaleString("en-US")}
                      </td>
                      {/* <td className="report-td">
                        {sale?.debt?.toLocaleString("en-US")}
                      </td> */}
                      <td className="report-td">{sale?.date_paid}</td>
                    </tr>
                  ))}
                  {/* <tr>
                    <td className="report-td font-bold">Total</td>
                    <td className=""></td>
                    <td className=""></td>
                    <td className=""></td>
                    <td className=""></td>
                    <td className="report-td font-bold">
                      {total_discount?.toLocaleString("en-US")}
                    </td>
                    <td className="report-td font-bold">
                      {total_cash_sales?.toLocaleString("en-US")}
                    </td>
                  </tr> */}
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
                <th className=" report-th">Total Cash Sales ({CURRENCY})</th>

                <th className=" report-th">Total Discount ({CURRENCY})</th>
                {/* <th className=" report-th">Total Interest ({CURRENCY})</th> */}
              </tr>
            </thead>
            <tbody className="align-middle">
              <tr>
                <td className="report-td align-middle">
                  {total_cash_sales?.toLocaleString("en-US")}
                </td>

                <td className="report-td align-middle">
                  {total_discount?.toLocaleString("en-US")}
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

export default SalesReport;
