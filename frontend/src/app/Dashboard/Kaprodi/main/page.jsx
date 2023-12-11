"use client";

import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Bar } from "react-chartjs-2";
import { useState, useEffect } from "react";
import { MdHome } from "react-icons/md";
import { LuFileInput } from "react-icons/lu";
import { FaCalendarAlt } from "react-icons/fa";
import { MdInsertChart } from "react-icons/md";
import { FaFileAlt } from "react-icons/fa";
import Timeline from "../../../components/Kaprodi/Timeline";
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

  ChartJS.register(ArcElement, Tooltip, Legend);

  return (
    <div className="bg-[#E7ECEF] h-[200vh] flex gap-6" data-theme="light">
      <Navbar />

      {/* SIDEBAR */}
      <div className="w-[23vw] relative z-10 flex flex-col gap-3 border-black py-[7em] h-screen">
        <a href="/Dashboard/Kaprodi/main" className="w-full flex hover:cursor-pointer items-center ps-8 gap-2 bg-[#001247] text-white py-3 rounded-r-xl">
          <MdHome className="text-xl" />
          <h1 className="font-bold text-lg">Dashboard</h1>
        </a>
        <a href="/Dashboard/Kaprodi/laporan" className="w-full flex hover:cursor-pointer items-center ps-8 gap-2 bg-[#fff] text-[#001247] py-3 rounded-r-xl">
          <MdInsertChart className="text-lg" />
          <h1 className="font-bold text-xl">Laporan</h1>
        </a>
        <a href="/Dashboard/Kaprodi/setSidang" className="w-full flex hover:cursor-pointer items-center ps-8 gap-2 bg-[#fff] text-[#001247] py-3 rounded-r-xl">
          <FaCalendarAlt className="text-lg" />
          <h1 className="font-bold text-xl">Set Jadwal Sidang</h1>
        </a>
        <a href="/Dashboard/Kaprodi/laporanSidang" className="w-full flex hover:cursor-pointer items-center ps-8 gap-2 bg-[#fff] text-[#001247] py-3 rounded-r-xl">
          <FaFileAlt className="text-xl" />
          <h1 className="font-bold text-lg">Laporan Jadwal Sidang</h1>
        </a>
      </div>
      {/* ------- SIDEBAR --------- */}

      {/* CENTER */}
      <div className="w-[54vw] pt-[7em] flex flex-col gap-4">
        <div className="flex w-full justify-between">
          <div className="h-10 flex items-center">
            <h1 className="font-bold text-xl text-black">Welcome! Taufik Nur Adi</h1>
          </div>
          <div className="flex bg-white rounded-lg gap-2 h-10 items-center p-3">
            <FaCalendarAlt />
            <h1 className="font-bold text-xl text-black">{currentDate.toLocaleDateString("id-ID", dateFormatOptions)}</h1>
          </div>
        </div>
        {/* TIMELINE */}
        <div className="bg-white w-full rounded-xl p-4">
          <h1 className="text-xl font-bold mb-6">Timeline</h1>
          <Timeline />
        </div>
        {/* TIMELINE */}

        {/* KESELURUHAN */}
        <div className="bg-white rounded-xl px-4 py-4 h-[27em]">
          <h1 className="font-bold text-xl">Presentase Keseluruhan Mahasiswa Cumlaude</h1>
          <div className="w-[60%] h-full mx-auto">
            <PieChart m={40} bm={60} />
          </div>
        </div>
        {/* KESELURUHAN */}
      </div>
      {/* CENTER */}

      {/* RIGHTSIDE */}
      <div className="w-[23vw] mt-[7em] mr-4 rounded-xl flex flex-col gap-4">
        <div className="bg-white rounded-xl px-4 py-4 h-[15em]">
          <h1 className="font-bold text-xl">Bimbingan</h1>
          <PieChart m={40} bm={60} />
        </div>
        <div className="bg-white rounded-xl px-4 py-4 h-[15em]">
          <h1 className="font-bold text-xl">TAK</h1>
          <PieChart m={79} bm={21} />
        </div>
        <div className="bg-white rounded-xl px-4 py-4 h-[15em]">
          <h1 className="font-bold text-xl">EPrT</h1>
          <PieChart m={45} bm={55} />
        </div>
        <div className="bg-white rounded-xl px-4 py-4 h-[15em]">
          <h1 className="font-bold text-xl">IPK</h1>
          <PieChart m={79} bm={21} />
        </div>
      </div>
      {/* RIGHTSIDE */}
    </div>
  );
}

export default DashboardKaprodi;
