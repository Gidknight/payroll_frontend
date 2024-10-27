import { useNavStore } from "../../stores/useNavStore";
import {
  //  Link,
  useNavigate,
  useLocation,
} from "react-router-dom";

interface NavLinkType {
  label: string;
  href: string;
  icon: any;
  // hasSubmenu?: boolean
}

const NavLink = ({ label, href, icon }: NavLinkType) => {
  const navigate = useNavigate();
  const location = useLocation();

  const active = useNavStore((state) => state.active);
  const setActive = useNavStore((state) => state.setActive);

  const activeStyle =
    " flex flex-row justify-start items-center capitalize gap-4 w-full border-primaryHover p-2 font-bold rounded-xl cursor-not-allowed bg-slate-50 text-primary";
  const style =
    " flex flex-row justify-start items-center capitalize gap-4 w-full border-b-2 border-slate-400 p-2 hover:border-primaryHover hover:font-semibold text-white cursor-pointer transition-all duration-300";

  const handleClick = () => {
    setActive(label);
    navigate(href, { replace: true });
  };

  return (
    <div className="w-full">
      {/* <Link to={href} className={location.pathname == active ? activeStyle : style}> */}
      <button
        onClick={handleClick}
        className={location.pathname == active ? activeStyle : style}
      >
        <span
        //   className={pathname.includes(label) ? "text-white" : "text-slate-300"}
        >
          {icon}
        </span>
        <span
        //   className={pathname.includes(label) ? activeStyle : style}
        //   onClick={handleClick}
        >
          {label}
        </span>
      </button>
      {/* </Link> */}
    </div>
  );
};

export default NavLink;
