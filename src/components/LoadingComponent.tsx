import React from "react";
import { FaSpinner } from "react-icons/fa";
import { MdError } from "react-icons/md";

interface LoadComponentTypes {
  loading: boolean;
  message: string;
}

const LoadingComponent = ({ loading, message }: LoadComponentTypes) => {
  return (
    <div className="w-full flex flex-col items-center justify-center bg-white p-5 rounded-xl font-bold gap-2 text-xl text-live">
      {loading ? (
        <span className="animate-spin">
          <FaSpinner />
        </span>
      ) : (
        <span className="text-error">
          <MdError />
        </span>
      )}
      <span className="font-semibold animate-pulse">{message}...</span>
    </div>
  );
};

export default LoadingComponent;
