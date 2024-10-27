"use client";

import { BiDetail, BiLoaderCircle } from "react-icons/bi";
import { Link, useLocation } from "react-router-dom";

interface ButtonType {
  title: string;
  isLoading: boolean;
  isLock?: boolean;
  icon: any;
  to: string;
}

const InpageLink = ({
  title = "link",
  isLoading,
  isLock,
  icon = <BiDetail />,
  to,
}: ButtonType) => {
  // const [isLock, setIsLock] = useState(true);
  const location = useLocation();
  console.log({ pathname: location.pathname, to });
  // console.log(to);

  return (
    <Link
      to={to}
      className={`flex items-center justify-center w-full text-[14px] font-semibold py-2 px-4 rounded-md capitalize
              ${
                isLock
                  ? "bg-gray-200 cursor-not-allowed text-white"
                  : "border  border-primary cursor-pointer hover:shadow-lg transition-all duration-200"
              }
              
              ${
                to === location.pathname
                  ? "text-white bg-primary"
                  : "text-primary bg-transparent"
              }
              `}
    >
      {isLoading ? (
        <BiLoaderCircle className="animate-spin" color="#ffffff" size={25} />
      ) : (
        <div className="flex flex-row items-center justify-center gap-2">
          {icon}
          <p>{title}</p>
        </div>
      )}
    </Link>
  );
};

export default InpageLink;
