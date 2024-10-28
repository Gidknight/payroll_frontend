import { useEffect, useState } from "react";
import toast from "react-hot-toast";

interface WebButtonTypes {
  icon: any;
  staff_id: string;

  text: string;
  isLoading: boolean;
  sendFunction: () => void;
}
const WebButton = ({
  text,
  icon,
  staff_id,
  isLoading = false,
  sendFunction,
}: WebButtonTypes) => {
  const [isOnline, setIsOnline] = useState(true);

  useEffect(() => {
    const handleOfflineStatus = () => {
      setIsOnline(navigator.onLine);
    };

    if (typeof window !== "undefined") {
      setIsOnline(navigator.onLine);

      window.addEventListener("online", handleOfflineStatus);
      window.addEventListener("offline", handleOfflineStatus);

      return () => {
        window.removeEventListener("online", handleOfflineStatus);
        window.removeEventListener("offline", handleOfflineStatus);
      };
    }
  }, []);

  return (
    <button
      className={`flex gap-2 items-center bg-gray1 font-bold text-lg p-2 text-none rounded-xl border cursor-pointer hover:bg-primary hover:text-white hover:shadow-lg hover:scale-105 transition-all duration-300 capitalize ${
        (isLoading || !isOnline) &&
        "hover:bg-red-500 cursor-text scale-105 bg-gray-100"
      }`}
      onClick={sendFunction}
      disabled={isLoading || !isOnline}
    >
      <span>{icon}</span>
      {isOnline ? (
        <p>
          <span>{isLoading ? "Sending..." : text}</span>
        </p>
      ) : (
        <p>Internet is down</p>
      )}
    </button>
  );
};

export default WebButton;
