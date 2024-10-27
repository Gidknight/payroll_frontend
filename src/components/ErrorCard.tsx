"use client";

import { BiError } from "react-icons/bi";

const ErrorCard = ({ errorMessage }: { errorMessage: string }) => {
  return (
    <div className="w-100 flex flex-col justify-start gap-2 p-2 bg-red-50 rounded-lg">
      <h2 className="text-red-500 font-semibold text-[20px]">
        <BiError /> Ops
      </h2>
      <hr className="bg-red-500 h-[2px] w-full " />
      <p className="text-red-400 font-semibold text-[16px]">{errorMessage}</p>
    </div>
  );
};

export default ErrorCard;
