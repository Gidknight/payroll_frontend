"use client";

import React, { useEffect, useState } from "react";
import { BiLoaderCircle } from "react-icons/bi";

interface ButtonType {
  title: string;
  isLoading: boolean;
  isLock?: boolean;
  cusFunc?: () => void;
  type?: any;
}

const PrimaryButton = ({
  title = "primary",
  isLoading,
  isLock,
  cusFunc,
  type = "button",
}: ButtonType) => (
  <button
    disabled={isLoading || isLock}
    onClick={cusFunc}
    type={type}
    className={`flex items-center justify-center w-full text-[14px] font-semibold text-white py-2 px-4 rounded-2xl capitalize
              ${
                isLock
                  ? "bg-gray-200 cursor-not-allowed"
                  : "bg-primary cursor-pointer hover:shadow-md transition-all duration-300"
              } `}
  >
    {isLoading ? (
      <BiLoaderCircle className="animate-spin" color="#ffffff" size={25} />
    ) : (
      title
    )}
  </button>
);
export default PrimaryButton;
