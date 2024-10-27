import { useState } from "react";
import toast from "react-hot-toast";

interface WebButtonTypes {
  icon: any;
  staff_id: number;
  purpose: string;
  text: string;
}
const WebButton = ({
  text,
  icon,
  staff_id,
  purpose = "single",
}: WebButtonTypes) => {
  const [isLoading, setIsLoading] = useState(false);

  const sendSingle = async () => {
    try {
      setIsLoading(true);
      const res = await fetch(`/api/staff/${staff_id}`, {
        method: "POST",
      });

      const response = await res.json();
      console.log(response);
      if (response.status) {
        toast.success(response.message);
        window.location.reload();
      } else {
        toast.error(response.message);
        window.location.reload();
      }
    } catch (error) {
      toast.error("Error Occured");
    } finally {
      setIsLoading(false);
    }
  };

  const sendMultiple = async () => {};
  return (
    <button
      className={`flex gap-2 items-center bg-gray1 font-bold text-lg p-2 text-none rounded-xl cursor-pointer hover:bg-primary hover:text-none hover:shadow-lg hover:scale-105 transition-all duration-300 capitalize ${
        isLoading && "hover:bg-red-500 cursor-text scale-105 bg-gray-100"
      }`}
      onClick={purpose === "single" ? sendSingle : sendMultiple}
      disabled={isLoading}
    >
      <span>{icon}</span>
      <span>{isLoading ? "Sending..." : text}</span>
    </button>
  );
};

export default WebButton;
