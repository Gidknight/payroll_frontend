"use client";
import { useState, useRef, useEffect } from "react";
import { MdReceiptLong } from "react-icons/md";
import { PiPrinter } from "react-icons/pi";
import { useReactToPrint } from "react-to-print";
import { OrganizationTypes, PayslipReportTypes } from "../../types";
import PayslipDocument from "./PayslipDocument";
import PayslipDocumentHTML from "./PayslipDocumentHTML";

const PayslipsReport = ({
  data,
  isLoading,
  institute,
}: {
  institute: OrganizationTypes;
  data: PayslipReportTypes[];
  isLoading: boolean;
}) => {
  const [isPrinting, setIsPrinting] = useState(false);

  // We store the resolve Promise being used in `onBeforeGetContent` here
  const promiseResolveRef = useRef<any>(null);
  const componentRef = useRef<any>(null);
  const handlePrint = useReactToPrint({
    documentTitle: "Payslip Report",

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

  useEffect(() => {
    if (isPrinting && promiseResolveRef.current) {
      // Resolves the Promise, letting `react-to-print` know that the DOM updates are completed
      promiseResolveRef.current();
    }
  }, [isPrinting]);

  // const date = convertDate(sale.sold_at);
  // const { day_in_word, year, month_in_word } = date;

  return (
    <div className="holder-active h-full">
      <div className="flex flex-row items-center justify-between min-w-full">
        <div className="side-by-side pl-5">
          <span className="text-[30px]">{<MdReceiptLong />}</span>
          <h2 className="header-text whitespace-nowrap">Payslip Report</h2>
        </div>
        <div>
          <button
            onClick={() => handlePrint()}
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
          {data.map((staff) => (
            <PayslipDocumentHTML
              institute={institute}
              staff={staff}
              forMail={false}
              key={staff.id}
            />
          ))}

          {/* COMPANY INFO */}
          {/* <div className="mx-auto flex flex-col items-center justify-center w-full p-2 border-y-2 border-dashed">
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
          </div> */}
        </div>
      )}
    </div>
  );
};

export default PayslipsReport;
