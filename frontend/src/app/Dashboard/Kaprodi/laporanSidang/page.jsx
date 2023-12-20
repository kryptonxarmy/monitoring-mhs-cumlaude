"use client";

import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Bar } from "react-chartjs-2";
import { useState, useEffect } from "react";
import { MdHome } from "react-icons/md";
import { TbFileCheck } from "react-icons/tb";
import { FaCalendarAlt } from "react-icons/fa";
import { MdInsertChart } from "react-icons/md";
import { FaFileAlt } from "react-icons/fa";
import { PiFileMagnifyingGlassFill } from "react-icons/pi";
import PieChart from "../../../components/Kaprodi/PieChart";
import Navbar from "../../../components/Navbar";

function DashboardKaprodi() {
  const [sidang, setSidang] = useState(false);

  const PopUp = () => {
    return (
      <>
        <div className="h-full w-screen absolute bg-[#00000054] z-50 flex justify-center items-center" data-theme="light">
          <div className="w-[40%] h-[40%] bg-white rounded-xl text-black py-14 flex flex-col gap-6 px-[3em]">
            <h1 className="font-bold text-3xl text-center">Apakah anda yakin menyetujui permintaan tersebut?</h1>
            <div className="flex gap-6 mx-auto justify-center">
              <button onClick={() => setSidang(false)} className="px-6 py-2 rounded-xl border-4 border-[#B01212] bg-[#FF8080] hover:border-[#b01212cc] hover:bg-[#ff8f8f] font-extrabold">
                REJECT
              </button>
              <button onClick={() => setSidang(false)} className="px-4 py-2 rounded-xl border-4 border-[#12B018] bg-[#8AFF80] hover:border-[#12B018] hover:bg-[#a5fa9e] font-extrabold">
                APPROVE
              </button>
            </div>
          </div>
        </div>
      </>
    );
  };

  const rows = [
    { id: 1, nama: "Brice Swyre", nim: "1201234567", date: "2023-01-01", keterangan: "Red", status: "Delivered" },
    { id: 2, nama: "John Doe", nim: "1201234568", date: "2023-01-02", keterangan: "Blue", status: "Approved by" },
    { id: 3, nama: "Jane Doe", nim: "1201234569", date: "2023-01-03", keterangan: "Green", status: "Processing" },
    { id: 4, nama: "Alice Wonderland", nim: "1201234570", date: "2023-01-04", keterangan: "Yellow", status: "Delivered" },
    { id: 5, nama: "Bob Builder", nim: "1201234571", date: "2023-01-05", keterangan: "Purple", status: "Pending" },
  ];

  return (
    <>
      {sidang ? <PopUp /> : null}
      <div className="bg-[#E7ECEF] h-[200vh] flex gap-6" data-theme="light">
        <Navbar />

        {/* SIDEBAR */}
        <div className="w-[23vw] relative z-10 flex flex-col gap-3 border-black py-[7em] h-screen">
          <a href="/Dashboard/Kaprodi/main" className="w-full flex hover:cursor-pointer items-center ps-8 gap-2 bg-[#fff] text-[#001247] py-3 rounded-r-xl">
            <MdHome className="text-xl" />
            <h1 className="font-bold text-lg">Dashboard</h1>
          </a>
          <a href="/Dashboard/Kaprodi/laporan" className="w-full flex hover:cursor-pointer items-center ps-8 gap-2 bg-[#fff] text-[#001247] py-3 rounded-r-xl">
            <MdInsertChart className="text-lg" />
            <h1 className="font-bold text-xl">Laporan</h1>
          </a>
          <a href="/Dashboard/Kaprodi/setSidang" className="w-full flex hover:cursor-pointer items-center ps-8 gap-2 bg-[#fff] text-[#001247] py-3 rounded-r-xl">
            <FaCalendarAlt className="text-xl" />
            <h1 className="font-bold text-lg">Set Jadwal Sidang</h1>
          </a>
          <a href="/Dashboard/Kaprodi/laporanSidang" className="w-full flex hover:cursor-pointer items-center ps-8 gap-2 bg-[#001247] text-white py-3 rounded-r-xl">
            <FaFileAlt className="text-xl" />
            <h1 className="font-bold text-sm">Laporan Jadwal Sidang</h1>
          </a>
        </div>
        {/* ------- SIDEBAR --------- */}

        {/* CENTER */}
        <div className="w-full mr-10 pt-[7em] flex flex-col gap-4">
          {/* ATAS */}
          <div className="flex justify-between bg-white p-3 rounded-xl">
            <div className="flex gap-2 items-center">
              <h1 className="font-bold">Sort by</h1>
              <details className="dropdown">
                <summary className="m-1 btn btn-sm">Default</summary>
                <ul className="p-2 shadow menu dropdown-content z-[1] bg-base-100 rounded-box w-52">
                  <li>
                    <a>Item 1</a>
                  </li>
                  <li>
                    <a>Item 2</a>
                  </li>
                </ul>
              </details>
            </div>
            <div className="flex gap-2 items-center">
              <input type="text" placeholder="Type here" className="input input-sm input-bordered w-full max-w-xs" />
              <button className="btn btn-sm bg-green-400">Cetak Laporan</button>
            </div>
          </div>
          {/* ATAS */}

          {/* TABLE */}
          <div className="overflow-x-auto bg-white rounded-xl" data-theme="light">
            <table className="table table-zebra">
              {/* head */}
              <thead>
                <tr className="text-center text-black font-extrabold">
                  <th>No</th>
                  <th>Nama Mahasiswa</th>
                  <th>NIM</th>
                  <th>Date</th>
                  <th>Keterangan</th>
                  <th>Status</th>
                  <th className="text-center">Action</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((row) => (
                  <tr key={row.id} className="text-center">
                    <th>{row.id}</th>
                    <td>{row.nama}</td>
                    <td>{row.nim}</td>
                    <td>{row.date}</td>
                    <td>{row.keterangan}</td>
                    <td>
                      <div className="bg-[#EBF9F1] text-[#1F9254] px-3 py-1 rounded-xl">{row.status}</div>
                    </td>
                    <td>
                      <TbFileCheck onClick={() => setSidang(true)} className="mx-auto text-[#001247] font-bold text-3xl cursor-pointer" />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {/* TABLE */}
        </div>
        {/* CENTER */}
      </div>
    </>
  );
}

export default DashboardKaprodi;
