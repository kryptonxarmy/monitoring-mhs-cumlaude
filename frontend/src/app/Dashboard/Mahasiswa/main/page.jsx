"use client";
import React from "react";
import { useState, useEffect } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { MdHome } from "react-icons/md";
import { LuFileInput } from "react-icons/lu";
import { FaCalendarAlt } from "react-icons/fa";
import { IoMdNotifications } from "react-icons/io";
import Navbar from "../../../components/Navbar";
import Timeline from "../../../components/Mahasiswa/Timeline";
import Doughnut from "../../../components/Mahasiswa/Doughnut";
import axios from "axios";

function DashboardMahasiswa(props) {
  const name = localStorage.getItem("name");
  const [currentDate, setCurrentDate] = useState(new Date());
  const [approvalStatus, setApprovalStatus] = useState({});
  const [doughnutData, setDoughnutData] = useState({
    m: 0, // Nilai awal
    bm: 0, // Nilai awal
  });

  ChartJS.register(ArcElement, Tooltip, Legend);

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

  const getApprovalStatus = async () => {
    try {
      const nim = localStorage.getItem("nim");
      const response = await axios.get(`http://localhost:8081/getApprovalStatus?nim=${nim}`);
      setApprovalStatus(response.data);
      console.log(response.data);

      const takStatus = response.data.TAK === "Approved";
      const eprtStatus = response.data.EPrT === "Approved";
      const jurnalStatus = response.data.Jurnal === "Approved";

      // Menentukan nilai m dan bm berdasarkan status TAK, EPrT, dan Jurnal
      let mValue, bmValue;

      // Jika semua tiga komponen sudah approved
      if (takStatus && eprtStatus && jurnalStatus) {
        mValue = 90;
        bmValue = 10;
      }
      // Jika dua komponen sudah approved
      else if ((takStatus && eprtStatus) || (takStatus && jurnalStatus) || (jurnalStatus && eprtStatus)) {
        mValue = 60;
        bmValue = 40;
      }
      // Jika minimal satu komponen sudah approved
      else if (takStatus || eprtStatus || jurnalStatus) {
        mValue = 30;
        bmValue = 70;
      }
      // Jika semua komponen belum approved
      else {
        mValue = 0;
        bmValue = 100;
      }

      // Menetapkan nilai m dan bm ke state
      setDoughnutData({ m: mValue, bm: bmValue });
    } catch (error) {
      console.error("Error getting approval status:", error);
      console.log(approvalStatus);
    }
  };

  useEffect(() => {
    getApprovalStatus();
  }, []);

  return (
    <div className="bg-[#E7ECEF] h-[200vh] flex gap-6" data-theme="light">
      <Navbar />
      {/* SIDEBAR */}
      <div className="w-[23vw] relative z-10 flex flex-col gap-3 border-black py-[7em] h-screen">
        <a href="dashboardmahasiswa" className="w-full flex hover:cursor-pointer justify-center items-center gap-2 bg-[#001247] text-white py-3 rounded-r-xl">
          <MdHome className="text-xl" />
          <h1 className="font-bold text-xl">Dashboard</h1>
        </a>
        <a href="/Dashboard/Mahasiswa/inputfile" className="w-full flex hover:cursor-pointer justify-center items-center gap-2 bg-[#ffff] text-black py-2 rounded-r-xl">
          <LuFileInput className="text-xl" />
          <h1 className="font-bold text-xl">Input File</h1>
        </a>
      </div>
      {/* ------- SIDEBAR --------- */}

      {/* CENTER */}
      <div className="w-[70%] pt-[7em] flex flex-col gap-4">
        <div className="flex w-full justify-between">
          <div className="h-10">
            <h1 className="font-bold text-black">Hi! {name}</h1>
            <p className="text-lg text-black">Welcome Back!</p>
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

        {/* Presentase */}
        <div className="w-full mr-4 rounded-xl flex justify-between gap-4">
          <div className="bg-white rounded-xl w-full px-4 py-4 h-[33em]">
            <h1 className="font-bold text-xl">Presentase untuk Cumlaude</h1>
            <div>
              <Doughnut m={doughnutData.m} bm={doughnutData.bm} />
            </div>
            <div className=" relative z-40 form-control flex flex-col -mt-[8em]">
              <label className="label cursor-pointer gap-4 flex justify-start">
                <input type="checkbox" checked={approvalStatus.TAK === "Approved"} className="checkbox checkbox-success" />
                <span className="label-text">TAK</span>
              </label>
              <label className="label cursor-pointer gap-4 flex justify-start">
                <input type="checkbox" checked={approvalStatus.EPrT === "Approved"} className="checkbox checkbox-success" />
                <span className="label-text">EPrT</span>
              </label>
              <label className="label cursor-pointer gap-4 flex justify-start">
                <input type="checkbox" checked={approvalStatus.Jurnal === "Approved"} className="checkbox checkbox-success" />
                <span className="label-text">Jurnal/Lomba</span>
              </label>
              {/* <label className="label cursor-pointer gap-4 flex justify-start">
                <input type="checkbox" checked className="checkbox checkbox-success" />
                <span className="label-text">Pendaftaran Sidang</span>
              </label>
              <label className="label cursor-pointer gap-4 flex justify-start">
                <input type="checkbox" className="checkbox checkbox-success" />
                <span className="label-text">Sidang</span>
              </label> */}
            </div>
          </div>
          <div className="bg-white rounded-xl w-full px-4 py-4 h-[33em]">
            <h1 className="font-bold text-xl">Jumlah Bimbingan</h1>
            <div>
              {/* <h1 className="absolute left-[40em] top-[35em] font-bold text-4xl">75%</h1> */}
              <Doughnut m={79} bm={21} />
            </div>
            <div className=" relative form-control flex flex-col -mt-[8em]">
              <label className="label cursor-pointer gap-4 flex justify-start">
                <input type="checkbox" checked className="checkbox checkbox-success" />
                <span className="label-text">Bimbingan 1 (Dosen Pembimbing 1)</span>
              </label>
              <label className="label cursor-pointer gap-4 flex justify-start">
                <input type="checkbox" checked className="checkbox checkbox-success" />
                <span className="label-text">Bimbingan 2 (Dosen Pembimbing 1)</span>
              </label>
              <label className="label cursor-pointer gap-4 flex justify-start">
                <input type="checkbox" className="checkbox checkbox-success" />
                <span className="label-text">Bimbingan 3 (Dosen Pembimbing 1)</span>
              </label>
              <label className="label cursor-pointer gap-4 flex justify-start">
                <input type="checkbox" className="checkbox checkbox-success" />
                <span className="label-text">Bimbingan 3 (Dosen Pembimbing 1)</span>
              </label>
              <label className="label cursor-pointer gap-4 flex justify-start">
                <input type="checkbox" className="checkbox checkbox-success" />
                <span className="label-text">Bimbingan 3 (Dosen Pembimbing 1)</span>
              </label>
            </div>
          </div>
        </div>
        {/* presentase */}
      </div>
      {/* CENTER */}
    </div>
  );
}

export default DashboardMahasiswa;
