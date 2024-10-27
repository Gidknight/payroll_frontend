"use client";
import { useState, useRef, useEffect } from "react";
import TextWithLabel from "../TextWithLabel";
import { convertDate } from "@/utils";
import { MdReceiptLong } from "react-icons/md";
import { PiPrinter } from "react-icons/pi";
import { useReactToPrint } from "react-to-print";
import { InventoryReportTypes } from "@/app/types";
import { CURRENCY } from "@/constants";

const InventoryReport = ({ data }: { data: InventoryReportTypes }) => {
  const { date, attendant, store, inventory, net_total } = data;
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
          <h2 className="header-text whitespace-nowrap">Inventory Report</h2>
        </div>
        <div>
          <button
            onClick={handlePrint}
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
            Product Inventory Report as of today, {date}
          </h1>
          {inventory.length > 0 ? (
            <table className="min-w-full bg-white border-collapse border border-gray-200">
              <thead>
                <tr>
                  <th className="report-th">Product ID</th>
                  <th className="report-th">Product Name</th>
                  <th className="report-th">Supplier</th>
                  <th className="report-th">Quantity Left</th>
                  <th className="report-th">Cost Price ({CURRENCY})</th>
                  <th className="report-th">Selling Price ({CURRENCY})</th>
                  <th className="report-th">Total ({CURRENCY})</th>
                  <th className="report-th">Re-Order</th>
                </tr>
              </thead>

              <tbody>
                {inventory.map((product) => (
                  <tr key={product.id}>
                    <td className="report-td">{product.id}</td>
                    <td className="report-td">{product.name}</td>
                    <td className="report-td">{product.supplier_name}</td>
                    <td className="report-td">
                      {product.quantity_left?.toLocaleString("en-US")}
                    </td>
                    <td className="report-td">
                      {product.cost_price?.toLocaleString("en-US")}
                    </td>
                    <td className="report-td">
                      {product.selling_price?.toLocaleString("en-US")}
                    </td>
                    <td className="report-td">
                      {product.total?.toLocaleString("en-US")}
                    </td>
                    <td className="report-td text-red-500 font-semibold">
                      {product?.reorder}
                    </td>
                  </tr>
                ))}
                <tr>
                  <td className=""></td>
                  <td className=""></td>
                  <td className=""></td>
                  <td className=""></td>
                  <td className=""></td>
                  <td className="report-td font-bold">Net Total</td>
                  <td className="report-td font-bold">
                    {net_total?.toLocaleString("en-US")}
                  </td>
                </tr>
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
            <span className="font-semibold text-base">{attendant?.email}</span>
          </h3>
          <h3>
            <span>Phone Contact: </span>
            <span className="font-semibold text-base">
              {attendant?.contact}
            </span>
          </h3>
        </div>
      </div>
    </div>
  );
};

export default InventoryReport;
