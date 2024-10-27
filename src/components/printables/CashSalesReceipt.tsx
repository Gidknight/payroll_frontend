"use client";

import { useGeneralStore } from "@/app/(stores)/general";
import { getSingleSaleDetail } from "@/utils/requests";
import { convertDate } from "@/utils";
import React, { useEffect, useState, forwardRef } from "react";
import { FaSpinner } from "react-icons/fa";
import TextWithLabel from "../TextWithLabel";

interface CashSalesReceiptProps {
  sale_id: number;
  isReady: boolean;
  setIsReady: React.Dispatch<React.SetStateAction<boolean>>;
}

interface SaleReceiptTypes {
  id: number;
  sold_at: string;
  sold_by: {
    first_name: string;
    last_name: string;
  };
  customer_id?: string;
  customer_name?: string;
  items_sold: {}[];
  total: number;
  discount: number;
  mode_of_payment: string;
  amount_tendered: number;
  change: number;
  units: {}[];
}

const CashSalesReceipt = forwardRef<HTMLDivElement, CashSalesReceiptProps>(
  ({ sale_id, isReady, setIsReady }, ref) => {
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);
    const [totalItems, setTotalItems] = useState(0);
    const [data, setData] = useState<SaleReceiptTypes | null>(null);
    const storeData = useGeneralStore((state: any) => state.storeData);

    useEffect(() => {
      setIsLoading(true);
      const getDetail = async () => {
        if (!sale_id) return;
        try {
          setIsError(false);
          setIsLoading(true);
          const res = await getSingleSaleDetail(sale_id);
          let totalQuantitySold = 0;
          res.items_sold.forEach((item: { quantity: number }) => {
            totalQuantitySold += item.quantity;
          });
          setTotalItems(totalQuantitySold);
          console.log(res);
          setData(res);
          setIsReady(true);
        } catch (error) {
          console.error(error);
          setIsError(true);
          setIsReady(false);
        } finally {
          setIsLoading(false);
        }
      };
      setTimeout(() => {
        getDetail();
      }, 5000);
    }, [sale_id, setIsReady]);

    if (isLoading) {
      return (
        <div className="w-[350px] p-4 flex items-center justify-center">
          <div className="flex flex-col items-center justify-center gap-5 bg-gray-100 p-5 rounded-xl">
            <FaSpinner size={30} className="animate-spin text-primary" />
            <p className="animate-pulse text-primary italic text-lg">
              Preparing Receipt, Please wait...
            </p>
          </div>
        </div>
      );
    }

    return (
      <div className="w-[350px] p-4" ref={ref}>
        {isError && (
          <div className="text-red-500 font-bold">Error fetching data</div>
        )}
        {data && (
          <div className="w-full h-full  flex flex-col items-start justify-start gap-1 ">
            <div className="w-full flex flex-col items-center justify-center">
              <h2 className="font-bold text-xl capitalize text-center text-primary">
                {storeData.name}
              </h2>
              <p className="text-center align-middle capitalize px-5">
                {storeData.address}
              </p>
              <p>
                Phone:{" "}
                <span>
                  {storeData.primary_contact +
                    (storeData.secondary_contact
                      ? ", " + storeData.secondary_contact
                      : "")}
                </span>
              </p>
              <p>
                Email: <span>{storeData.email}</span>
              </p>
            </div>

            <div className="w-full flex flex-col items-center justify-center border-y border-gray2 border-dashed">
              <TextWithLabel
                label="Receipt No"
                string={data.id.toString()}
                bold={true}
              />
              <TextWithLabel
                label="Purchase Date"
                string={`${convertDate(data.sold_at)?.toString()}`}
              />
              <TextWithLabel
                label="Sales Person"
                string={data.sold_by.last_name + " " + data.sold_by.first_name}
              />
              {/* {data.customer_id && (
                <TextWithLabel
                  label="Customer ID"
                  string={data?.customer_id?.toString()}
                  textsize="text-xs"
                />
              )} */}
              {data.customer_name && (
                <TextWithLabel
                  label="Customer Name"
                  string={data?.customer_name}
                />
              )}
            </div>

            <div className="w-full">
              <p className="flex flex-row items-center justify-between  font-bold text-base">
                <span>Items Bought</span>
                <span>Price | Quantity</span>
              </p>

              {data.items_sold.map((item: any, index: number) => (
                <div
                  key={item.id}
                  className="flex flex-col w-full h-full items-start justify-start gap-1 py-1"
                >
                  <div className="side-by-side w-full">
                    <i className="text-sm">{index + 1}. </i>
                    {/* <TextWithLabel
                      label={item.product_name}
                      string={
                        item.price.toLocaleString("en-US") +
                        " / " +
                        item.quantity
                      }
                    /> */}
                    <div className="flex flex-row items-center justify-between w-full">
                      <h5 className="font-semibold text-sm text-primary capitalize">
                        {item?.product_name}:
                      </h5>
                      <div className="flex flex-row items-center justify-end gap-2">
                        {item?.units_sold.map(
                          (sold: {
                            id: number;
                            name: string;
                            price: number;
                            qty: number;
                          }) => (
                            <div className="flex flex-col items-center justify-end text-sm">
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
                              {/* <h2 className="font-semibold">
                              {"Sum: " +
                                (sold?.price * sold?.qty).toLocaleString(
                                  "us-EN"
                                )}
                            </h2> */}
                            </div>
                          )
                        )}
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

            <div className="mx-auto flex flex-col items-center justify-center w-full border-y border-gray2 border-dashed">
              <TextWithLabel
                label="Bill Total"
                string={
                  "NGN " + (data.discount + data.total).toLocaleString("en-US")
                }
              />
              <TextWithLabel
                label="Discount"
                string={"NGN " + data.discount.toLocaleString("en-US")}
              />
              <TextWithLabel label="Tax" string={"NGN " + 0} />
              <TextWithLabel
                label="Net Payment"
                string={"NGN " + data.total.toLocaleString("en-US")}
                bold={true}
              />
            </div>

            <div className="mx-auto flex flex-col items-center justify-center w-full border-b border-gray2 border-dashed">
              <TextWithLabel
                label="Mode Of Payment"
                string={data.mode_of_payment}
              />
              <TextWithLabel
                label={
                  data.mode_of_payment === "cash" ||
                  data.mode_of_payment == "credit"
                    ? "Amount Tendered"
                    : "Amount Transfered"
                }
                string={"NGN " + data.amount_tendered.toLocaleString("en-US")}
              />
              <TextWithLabel
                label="Change Due"
                string={"NGN " + data.change.toLocaleString("en-US")}
              />
            </div>

            {/* {data.mode_of_payment === "bank transfer" && (
              <div className="mx-auto flex flex-col items-center justify-center w-full border-y border-gray2 border-dashed">
                <TextWithLabel
                  label="Mode Of Payment"
                  string={data.mode_of_payment}
                />
                <TextWithLabel
                  label="Amount Transferred"
                  string={"NGN " + data.amount_tendered}
                />
                <TextWithLabel
                  label="Change Due"
                  string={"NGN " + data.change.toFixed(1)}
                />
              </div>
            )}

            {data.mode_of_payment === "card" && (
              <div className="mx-auto flex flex-col items-center justify-center w-full border-y border-gray2 border-dashed">
                <TextWithLabel
                  label="Mode Of Payment"
                  string={data.mode_of_payment}
                />
                <TextWithLabel
                  label="Amount Transferred"
                  string={"NGN " + data.amount_tendered}
                />
                <TextWithLabel
                  label="Change Due"
                  string={"NGN " + data.change.toFixed(1)}
                />
              </div>
            )}

            {data.mode_of_payment === "credit" && (
              <div className="mx-auto flex flex-col items-center justify-center w-full border-y border-gray2 border-dashed">
                <TextWithLabel
                  label="Mode Of Payment"
                  string={data.mode_of_payment}
                />
                <TextWithLabel
                  label="Amount Transferred"
                  string={"NGN " + data.amount_tendered}
                />
                <TextWithLabel
                  label="Change Due"
                  string={"NGN " + data.change.toFixed(1)}
                />
              </div>
            )} */}

            <div className="w-full flex flex-col items-center justify-center text-sm">
              {storeData.website && (
                <p className="font-bold text-center">
                  Website: <span>{storeData.website}</span>
                </p>
              )}
              <p className="text-center">
                Please keep this as a proof of purchase
              </p>
              <p className="font-bold text-center">
                Thank you for shopping with us!
              </p>
            </div>
          </div>
        )}
      </div>
    );
  }
);

export default CashSalesReceipt;
