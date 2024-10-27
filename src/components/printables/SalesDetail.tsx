"use client";
import { useState, useRef, useEffect } from "react";
import TextWithLabel from "../TextWithLabel";
import { convertDate } from "@/utils";
import { MdReceiptLong } from "react-icons/md";
import { PiPrinter } from "react-icons/pi";
import { useReactToPrint } from "react-to-print";
import { CURRENCY } from "@/constants";

interface ItemsSoldTypes {
  id: number;
  product_name: string;
  price: number;
  quantity: number[];
  units_sold: { id: number; name: string; price: number; qty: number }[];
}

interface SoldByTypes {
  user_name: string;
  first_name: string;
  last_name: string;
  id: string;
  email: string;
  contact: string;
}
interface ReceiptTypes {
  id: number;
  customer_id: number;
  mode_of_payment: string;
  total: number;
  amount_tendered: number;
  change: number;
  discount: number;
  review: string;
  sold_at: Date;
  sold_by: SoldByTypes;
  items_sold: ItemsSoldTypes[];
}

const SalesDetail = ({ sale }: { sale: ReceiptTypes }) => {
  let totalQuantitySold = 0;
  sale.items_sold.forEach((item) => {
    totalQuantitySold =
      totalQuantitySold + item?.quantity[0] + item?.quantity[1];
  });

  const [isPrinting, setIsPrinting] = useState(false);

  // We store the resolve Promise being used in `onBeforeGetContent` here
  const promiseResolveRef = useRef<any>(null);
  const componentRef = useRef(null);
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

  // const handleDownload = useReactToPrint({
  //   documentTitle: "Custormer Sale Record",
  //   onBeforePrint: () => console.log("before downloading..."),
  //   onAfterPrint: () => console.log("after downloading..."),
  //   removeAfterPrint: true,
  //   content: () => componentRef.current,
  //   print: async (printIframe: HTMLIFrameElement) => {
  //     // Do whatever you want here, including asynchronous work
  //     await generateAndSavePDF(printIframe);
  //   },
  // });

  // We watch for the state to change here, and for the Promise resolve to be available
  useEffect(() => {
    if (isPrinting && promiseResolveRef.current) {
      // Resolves the Promise, letting `react-to-print` know that the DOM updates are completed
      promiseResolveRef.current();
    }
  }, [isPrinting]);

  const date = convertDate(sale.sold_at, false);
  const { day_in_word, year, month_in_word, day }: any = date;

  return (
    <div className="holder-active">
      {/* <style>{getPageMargins()}</style> */}
      <div className="flex flex-row items-center justify-between w-full">
        <div className="side-by-side pl-5">
          <span className="text-[30px]">{<MdReceiptLong />}</span>
          <h2 className="header-text whitespace-nowrap">Sales Detail</h2>
        </div>
        <div>
          <button
            onClick={handlePrint}
            className="side-by-side p-2 bg-print text-white"
          >
            <span>
              <PiPrinter />
            </span>
            <span>{isPrinting ? "Printing..." : "Print full detail"}</span>
          </button>
        </div>
      </div>

      <div
        ref={componentRef}
        className=" w-full flex flex-col items-center justify-center gap-2 "
      >
        <div className="mx-auto flex flex-col items-center justify-center w-[600px]  p-2 border-y-2 border-dashed">
          <TextWithLabel label="Transaction ID" string={sale.id} />
          <TextWithLabel
            label="Transaction Date"
            string={day_in_word + ", " + day + "-" + month_in_word + "-" + year}
          />
        </div>

        <div className="flex flex-col items-center justify-center w-100  gap-2">
          <h2 className="font-bold text-xl  w-100 text-secondary  py-2 px-4 rounded-full bg-slate-100">
            Description
          </h2>
          <div className="w-[600px] max-w-[600px]  p-2 border-y-2 border-dashed">
            <p className="flex flex-row items-center justify-between px-5 font-bold text-lg pb-2">
              <span>Items Bought</span>
              <span>Prices / Quantities</span>
            </p>

            {sale.items_sold.map((item: ItemsSoldTypes, index: number) => (
              <div
                key={item.id}
                className="flex flex-col w-full h-full items-start justify-start gap-2"
              >
                <div className="side-by-side w-full">
                  <b>{index + 1}. </b>

                  <div className="flex flex-row items-center justify-between w-full">
                    <h5 className="font-bold text-lg text-primary capitalize">
                      {item?.product_name}:
                    </h5>
                    <div className="flex flex-row items-center justify-end gap-2">
                      {item?.units_sold.map((sold) => (
                        <div className="flex flex-col items-center justify-end">
                          <h6 key={sold.id} className="">
                            <span>
                              {sold?.price.toLocaleString("us-EN") + "/"}
                            </span>
                            <span className=" text-sm italic font-semibold">
                              {"1" + sold?.name}
                            </span>
                            {" x "}
                            <span>
                              {sold?.qty.toLocaleString("us-EN")}
                              {/* <span>{sold?.name}</span> */}
                            </span>
                            ,
                          </h6>
                          <h2 className="font-semibold">
                            {"Sum: " +
                              (sold?.price * sold?.qty).toLocaleString("us-EN")}
                          </h2>
                        </div>
                      ))}
                    </div>
                    {/* <h6 className="">
                      <span className="text-base font-semibold px-1">
                        {item?.units_sold[0] &&
                          item.units_sold[0]?.price.toLocaleString("us-EN")}
                      </span>
                      {item?.units_sold[1] && (
                        <span className="text-base font-semibold">
                          {" -  " +
                            item.units_sold[1]?.price.toLocaleString("us-EN")}
                        </span>
                      )}
                      {" // "}
                      <span>{item?.quantity[0] && item?.quantity[0]}</span>
                      <span className=" text-sm italic font-semibold">
                        {item?.units_sold[0] && item?.units_sold[0]?.name}
                      </span>
                      {item.quantity[1] && (
                        <>
                          {" - "}
                          <span>{item?.quantity[1]}</span>

                          <span className=" text-sm italic font-semibold">
                            {item?.units_sold[1]?.name}
                          </span>
                        </>
                      )}
                    </h6> */}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* <div className="flex flex-row items-center justify-between w-[600px] px-5  text-lg pb-2">
          <p>Total Items / Quantity</p>
          <p>
            {sale.items_sold.length?.toLocaleString("us-EN") +
              " / " +
              totalQuantitySold?.toLocaleString("us-EN")}
          </p>
        </div> */}

        <div className="mx-auto flex flex-col items-center justify-center w-[600px]  p-2 border-y-2 border-dashed">
          <TextWithLabel
            label="Bill Total"
            string={CURRENCY + " " + sale.total?.toLocaleString("us-EN")}
            bold={true}
          />
          <TextWithLabel
            label="Discount"
            string={CURRENCY + " " + sale.discount?.toLocaleString("us-EN")}
          />
          <TextWithLabel label="Tax" string={CURRENCY + " " + 0} />
          <TextWithLabel
            label="Net Value"
            string={CURRENCY + " " + sale.total?.toLocaleString("us-EN")}
          />
          <TextWithLabel
            label="Amount Tendered"
            string={
              CURRENCY + " " + sale.amount_tendered?.toLocaleString("us-EN")
            }
          />
          <TextWithLabel
            label="Change Given"
            string={CURRENCY + " " + sale.change?.toLocaleString("us-EN")}
          />
          <TextWithLabel
            label="Mode Of Payment"
            string={sale.mode_of_payment}
          />
        </div>

        <div className="flex flex-col items-center justify-center w-full">
          <h2 className="font-bold text-xl  w-100 text-secondary  py-2 px-4 rounded-full bg-slate-100">
            Attendant Information
          </h2>
          <div className="max-w-[800px] min-w-[500px]">
            <TextWithLabel string={sale.sold_by.user_name} label="User Name" />
            <TextWithLabel
              string={sale.sold_by.first_name}
              label="First Name"
            />
            <TextWithLabel string={sale.sold_by.last_name} label="Last Name" />
            <TextWithLabel
              string={sale.sold_by.email || "not provided by user"}
              label="Email"
              cap={false}
            />
            <TextWithLabel string={sale.sold_by?.contact} label="Contact" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SalesDetail;
