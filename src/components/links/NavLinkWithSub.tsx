import { useNavStore } from "../../stores/useNavStore";
import { BiDownArrow, BiRightArrow } from "react-icons/bi";
import { useEffect, useState } from "react";
import { useLocation, Link } from "react-router-dom";

interface NavLinkType {
  label: string;
  icon: any;
  prefix: string;
  submenu: { link: string; icon: any; title: string }[];
}

const NavLinkWithSub = ({ label, icon, prefix, submenu }: NavLinkType) => {
  const location = useLocation();

  const setActive = useNavStore((state) => state.setActive);
  const [toggle, setToggle] = useState(false);

  const activeStyle =
    " flex flex-row justify-between items-center capitalize gap-4 w-full border-primaryHover p-2 font-bold rounded-xl cursor-not-allowed bg-slate-50 text-primary";
  const style =
    " flex flex-row justify-between items-center capitalize gap-4 w-full border-b-2 border-slate-400 p-2 hover:border-primaryHover hover:font-semibold text-white cursor-pointer transition-all duration-300";

  const handleClick = () => {
    setActive(label);
    setToggle(!toggle);
  };

  useEffect(() => {
    if (location.pathname.includes(prefix)) {
      setToggle(true);
    }
  }, []);

  return (
    <div className="w-full">
      <div
        onClick={handleClick}
        className="flex flex-row w-full items-start justify-center"
      >
        <div className="w-full">
          <button
            className={location.pathname.includes(label) ? activeStyle : style}
            onClick={handleClick}
          >
            <p className="flex flex-row w-full items-center justify-start gap-4">
              <span>{icon}</span>
              <span>{label}</span>
            </p>
            <span className="">
              {!toggle ? <BiRightArrow /> : <BiDownArrow />}
            </span>
          </button>
          {toggle && (
            <ul className="flex flex-col items-center justify-start gap-2 text-slate-200 pl-5 bg-black bg-opacity-20">
              {submenu.map((item, index) => (
                <Link
                  to={`${item?.link}`}
                  key={index}
                  className={
                    location.pathname.includes(`${item?.link}`)
                      ? // pathname.includes(`${prefix}/${sport?.id}`)
                        "p-1 w-full flex items-center justify-start gap-3 bg-white text-primary"
                      : "p-1 w-full flex items-center justify-start gap-3 border-b border-primary hover:border-white"
                  }
                >
                  <span>{item?.icon}</span>
                  {item?.title}
                </Link>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default NavLinkWithSub;
