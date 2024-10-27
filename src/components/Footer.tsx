"use client";

// import { useState } from 'react'
// import { MdArrowDropDown, MdArrowRight } from 'react-icons/md'

import { ImLocation } from "react-icons/im";
import { PiPhoneCall } from "react-icons/pi";
// import { Link } from 'react-router-dom'

// const FooterLink = (title: string, to: string) => {
//   return (
//     <Link to={to}>
//       <span>{title}</span>
//     </Link>
//   )
// }

// const FooterDropDown = ({ header, body }: { header: string; body: string }) => {
//   const [show, setShow] = useState(false)
//   return (
//     <div className="flex flex-col gap-2">
//       <div className="flex flex-row gap-4">
//         <button onClick={() => setShow(!show)}>
//           {show ? <MdArrowDropDown /> : <MdArrowRight />}
//         </button>
//         <h3>{header}</h3>
//       </div>
//       {show && (
//         <div className="flex flex-col w-fit">
//           <p className="truncate">{body}</p>
//         </div>
//       )}
//     </div>
//   )
// }

const Footer = () => {
  return (
    <footer className="md:px-20 w-full bg-slate-800 flex flex-row text-white items-center justify-between">
      <h2 className="text-xl md:text-xl font-extrabold font-mono">
        © 2024 All rights reserved by Akyerit Solutions.
      </h2>
      <div className="w-full flex flex-col items-end justify-between py-2 px-4">
        <h2 className="text-xl md:text-xl font-extrabold font-mono">
          About Us
        </h2>
        <div className="flex flex-row items-center justify-start gap-2">
          <span className="text-[18px] font-bold ">
            <ImLocation />
          </span>
          <p className="font-bold text-base">Company Address:</p>
          <p className=" text-base capitalize">{"Actual Company Address"}</p>
        </div>
        <div className="flex flex-row items-center justify-start gap-2">
          <span className="text-[18px] font-bold ">
            <PiPhoneCall />
          </span>
          <p className="font-bold text-base">Contact Info:</p>
          <p className=" text-base capitalize">{"Mobile Number"}</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
