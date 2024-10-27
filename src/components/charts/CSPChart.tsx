"use client";

import { useState } from "react";
import { AllItemsChart } from "@/app/(components)";
import Link from "next/link";

const CSPChart = ({
  lowStockProducts,
  activeCategories,
  activeSuppliers,
  categoryCount = 0,
  productCount = 0,
  supplierCount = 0,
}: {
  categoryCount: number;
  productCount: number;
  supplierCount: number;
  lowStockProducts: number;
  activeCategories: number;
  activeSuppliers: number;
}) => {
  const [toggle, setToggle] = useState(false);
  let product_in_stock = productCount - lowStockProducts;
  let p_percent = (product_in_stock / productCount) * 100;

  let s_percent = (activeSuppliers / supplierCount) * 100;
  let c_percent = (activeCategories / categoryCount) * 100;

  return (
    <div className="holder-null">
      <div className="w-full flex flex-row items-center justify-evenly p-2 gap-5">
        <div className="w-1/3 flex flex-col items-center justify-center">
          <h2 className="text-gray2 font-semibold text-lg text-center ">
            Active Categories
          </h2>

          <div className="w-32">
            <AllItemsChart
              percentage={parseFloat(c_percent.toFixed(0))}
              stroke="rgb(19, 153, 82)"
            />
          </div>
          <h2 className="text-gray2 font-semibold text-lg text-center ">
            Total Categories: {categoryCount}
          </h2>
        </div>
        <div className="w-1/3 flex flex-col items-center justify-center">
          <h2 className="text-gray2 font-semibold text-lg text-center ">
            Active Suppliers
          </h2>

          <div className="w-32">
            <AllItemsChart
              percentage={parseFloat(s_percent.toFixed(0))}
              stroke="rgb(226, 160, 18)"
            />
          </div>
          <h2 className="text-gray2 font-semibold text-lg text-center ">
            Total Suppliers: {supplierCount}
          </h2>
        </div>
        <div className="w-1/3 flex flex-col items-center justify-center">
          <h2 className="text-gray2 font-semibold text-lg text-center ">
            Active Products
          </h2>

          <div className="w-32">
            <AllItemsChart
              percentage={parseFloat(p_percent.toFixed(0))}
              stroke="rgb(14, 85, 201)"
            />
          </div>

          <h2 className="text-gray2 font-semibold text-lg text-center ">
            Total Products: {productCount}
          </h2>
        </div>
      </div>
    </div>
  );
};

export default CSPChart;
