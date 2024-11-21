"use client";
// import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

const ErrorComponent = ({ message }: { message: string }) => {
  // const router = useRouter();
  const [isRefreshing, setIsRefreshing] = useState(false);
  const refresh = () => {
    setIsRefreshing(true);
    toast.loading("Refreshing");
    window.location.reload();
  };
  return (
    <div className="flex flex-row items-center justify-center w-screen h-screen z-30">
      <div className="m-auto bg-white p-5 rounded-xl shadow-lg flex flex-col items-center justify-center gap-5">
        <h1 className="text-2xl font-extrabold text-error uppercase text-center">
          Error Occured
        </h1>
        <p className="text-2xl text-gray2 uppercase text-center font-semibold">
          {message}
        </p>
        <button
          disabled={isRefreshing}
          className="bg-error align-middle text-white text-lg font-bold hover:scale-105 hover:shadow-md transition-all duration-300 p-2 rounded-lg"
          onClick={refresh}
        >
          {isRefreshing ? "Refreshing..." : "Refresh Page"}
        </button>
      </div>
    </div>
  );
};

export default ErrorComponent;
