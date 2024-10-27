"use client";

import { BiLoaderCircle } from "react-icons/bi";

interface ButtonType {
  title: string;
  isLoading: boolean;
  isLock?: boolean;
  cusFunc: () => void;
}

const SecondaryButton = ({
  title = "secondary",
  isLoading,
  isLock,
  cusFunc,
}: ButtonType) => {
  // const [isLock, setIsLock] = useState(true);

  return (
    <button
      disabled={isLoading || isLock}
      onClick={cusFunc}
      className={`flex items-center justify-center w-full text-[14px] text-primary font-semibold py-2 px-4 rounded-2xl capitalize
              ${
                isLock
                  ? "bg-gray-200 cursor-not-allowed text-white"
                  : "border  border-primary cursor-pointer hover:shadow-lg transition-all duration-200"
              } `}
    >
      {isLoading ? (
        <BiLoaderCircle className="animate-spin" color="#ffffff" size={25} />
      ) : (
        title
      )}
    </button>
  );
};

export default SecondaryButton;
