"use client";

import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Bar } from "react-chartjs-2";
import { useState, useEffect } from "react";
import { MdHome } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import { FaCalendarAlt } from "react-icons/fa";
import { MdInsertChart } from "react-icons/md";
import { FaFileAlt } from "react-icons/fa";
import { PiFileMagnifyingGlassFill } from "react-icons/pi";
import PieChart from "../../../components/Kaprodi/PieChart";
import Navbar from "../../../components/Navbar";

function DashboardKaprodi() {
  const [currentDate, setCurrentDate] = useState(new Date());

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentDate(new Date());
    }, 1000); // Update setiap detik

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  // Opsi untuk menampilkan tanggal, bulan, dan tahun
  const dateFormatOptions = {
    year: "numeric",
    month: "short", // atau "short" untuk singkatan bulan
    day: "numeric",
  };

  const rows = [
    { id: 1, nama: "Brice Swyre", nim: "1201234567", date: "2023-01-01", periode: 1, status: "Delivered", status: true },
    { id: 2, nama: "John Doe", nim: "1201234568", date: "2023-01-02", periode: 1, status: "Approved by", status: true },
    { id: 3, nama: "Jane Doe", nim: "1201234569", date: "2023-01-03", periode: 1, status: "Processing", status: false },
    { id: 4, nama: "Alice Wonderland", nim: "1201234570", date: "2023-01-04", periode: 2, status: "Delivered", status: true },
    { id: 5, nama: "Bob Builder", nim: "1201234571", date: "2023-01-05", periode: 3, status: "Pending", status: false },
  ];

  return (
    <div className="bg-[#E7ECEF] h-[200vh] flex gap-6" data-theme="light">
      <Navbar />

      {/* SIDEBAR */}
      <div className="w-[23vw] relative z-10 flex flex-col gap-3 border-black py-[7em] h-screen">
        <a href="/Dashboard/Kaprodi/main" className="w-full flex hover:cursor-pointer items-center ps-8 gap-2 bg-[#fff] text-[#001247] py-3 rounded-r-xl">
          <MdHome className="text-xl" />
          <h1 className="font-bold text-lg">Dashboard</h1>
        </a>
        <a href="/Dashboard/Kaprodi/laporanSidang" className="w-full flex hover:cursor-pointer items-center ps-8 gap-2 bg-[#fff] text-[#001247] py-3 rounded-r-xl">
          <MdInsertChart className="text-xl" />
          <h1 className="font-bold text-lg">Laporan</h1>
        </a>
        <a href="/Dashboard/Kaprodi/setSidang" className="w-full flex hover:cursor-pointer items-center ps-8 gap-2 bg-[#001247] text-white py-3 rounded-r-xl">
          <FaCalendarAlt className="text-xl" />
          <h1 className="font-bold text-lg">Set Jadwal Sidang</h1>
        </a>
        <a href="/Dashboard/Kaprodi/laporanSidang" className="w-full flex hover:cursor-pointer items-center ps-8 gap-2 bg-[#fff] text-[#001247] py-3 rounded-r-xl">
          <FaFileAlt className="text-xl" />
          <h1 className="font-bold text-lg">Laporan Jadwal Sidang</h1>
        </a>
      </div>
      {/* ------- SIDEBAR --------- */}

      {/* CENTER */}
      <div className="w-full mr-10 pt-[7em] flex flex-col gap-4">
        {/* ATAS */}
        <div className="flex justify-between gap-4">
          <div className="bg-white rounded-xl h-full w-[50%] p-4">
            <h1 className="font-bold">Not Scheduled Yet</h1>
            <p className="font-semibold">Total : 2</p>
          </div>
          <div className="bg-white rounded-xl h-full w-[50%] p-4">
            <h1 className="font-bold">Scheduled</h1>
            <p className="font-semibold">Periode 1 : 2</p>
            <p className="font-semibold">Periode 2 : 3</p>
            <p className="font-semibold">Periode 3 : -</p>
          </div>
        </div>
        <div className="flex justify-between bg-white p-3 rounded-xl">
          <div className="flex gap-2 items-center"></div>
          <div className="flex gap-2 items-center">
            <input type="text" placeholder="Type here" className="input input-sm input-bordered w-full max-w-xs" />
            <button className="btn btn-sm bg-green-400">Cari</button>
          </div>
        </div>
        {/* ATAS */}

        {/* TABLE */}
        <div className="overflow-x-auto bg-white rounded-xl" data-theme="light">
          <table className="table">
            {/* head */}
            <thead>
              <tr className="text-center text-black font-extrabold">
                <th>No</th>
                <th>Nama Mahasiswa</th>
                <th>NIM</th>
                <th>Date</th>
                <th>Periode</th>
                <th className="text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <tr key={row.id} className={`text-center ${row.status == false ? "bg-red-400" : "bg-white"}`}>
                  <th>{row.id}</th>
                  <td>{row.nama}</td>
                  <td>{row.nim}</td>
                  <td>{row.date}</td>
                  <td>{row.periode}</td>
                  <td>
                    <FaEdit className="mx-auto text-[#001247] text-2xl" />
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
  );
}

export default DashboardKaprodi;
