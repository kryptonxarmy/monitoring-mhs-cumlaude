import React from "react";
import { RiArrowDropDownLine } from "react-icons/ri";
import { IoIosLogOut } from "react-icons/io";

function Navbar(props) {
  return (
    <>
      <div className="bg-[#001247] fixed z-30 w-screen h-[65px] py-5 flex text-white justify-between px-[3em]">
        <div className="flex">
          <a href="/Dashboard/Mahasiswa/main">
            <img src="https://s1sisteminformasi.id/wp-content/uploads/2023/09/Logo-Sistem-Informasi-167.png" alt="logo sisfo" className="object-cover h-[120%]" />
          </a>
          <div className="flex gap-4 ml-4">
            <h1>11:13 PM</h1>
            <h1>30 Oktober 2023</h1>
          </div>
        </div>
        <div className="flex gap-4">
          <RiArrowDropDownLine className="text-2xl" />
          <h1 className="font-semibold">{props == "mahasiswa" ? "AHMAD SYAHID DANU WARDANA" : "TAUFIK NUR ADI"}</h1>
          <a href="/Dashboard/Mahasiswa/profile">
            <img src="https://miro.medium.com/v2/resize:fit:845/1*Y4Hje9Txi_eDoBzq_HAiRQ.jpeg" alt="pp" className="rounded-full h-7 bg-cover w-7" />
          </a>
          <IoIosLogOut className="text-2xl font-extrabold" />
        </div>
      </div>
    </>
  );
}

export default Navbar;
