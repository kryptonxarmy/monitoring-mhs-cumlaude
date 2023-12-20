"use client";

import React from "react";
// import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { useState, useEffect } from "react";
import { MdHome } from "react-icons/md";
import { FaCalendarAlt } from "react-icons/fa";
import { MdInsertChart } from "react-icons/md";
import { FaFileAlt } from "react-icons/fa";
import { PiFileMagnifyingGlassFill } from "react-icons/pi";
import { FaArrowLeft } from "react-icons/fa";
import Navbar from "../../../../../components/Navbar";

function DashboardKaprodi({ params }) {
  const mahasiswa = params.mahasiswaId.map((name) => decodeURIComponent(name));
  const [isPopup, setIsPopup] = useState(false);

  const PopUp = () => {
    return (
      <>
        <div className="h-full w-screen absolute bg-[#00000054] z-50 flex justify-center items-center" data-theme="light">
          <div className="py-6 px-[10em] bg-white rounded-xl text-black flex flex-col gap-6">
            {/* <h1 className="font-bold text-3xl text-center">Apakah anda yakin menyetujui permintaan tersebut?</h1> */}
            <img src="/img/Sertifikat.png" alt="telu" className="object-none object-cover" />
            <div className="flex gap-6 mx-auto justify-center">
              <button onClick={() => setIsPopup(false)} className="px-6 py-2 rounded-xl border-4 border-[#B01212] bg-[#FF8080] hover:border-[#b01212cc] hover:bg-[#ff8f8f] font-extrabold">
                REJECT
              </button>
              <button onClick={() => setIsPopup(false)} className="px-4 py-2 rounded-xl border-4 border-[#12B018] bg-[#8AFF80] hover:border-[#12B018] hover:bg-[#a5fa9e] font-extrabold">
                APPROVE
              </button>
            </div>
          </div>
        </div>
      </>
    );
  };

  const rows = [
    { id: 1, berkas: "TAK", keperluan: "Input TAK", date: "2023-01-01", keterangan: "Need Your Approval", status: "Approved" },
    { id: 2, berkas: "EPrT", keperluan: "Input EPrT", date: "2023-01-02", keterangan: "Need Your Approval", status: "Need Approval" },
    { id: 3, berkas: "Bimbingan", keperluan: "Bimbingan", date: "2023-01-03", keterangan: "Second Revision", status: "2nd Revision" },
    { id: 4, berkas: "Jurnal", keperluan: "Upload Jurnal", date: "2023-01-04", keterangan: "Revised", status: "Revised" },
    { id: 5, berkas: "Sertifikat Lomba", keperluan: "Sertifikat Lomba", date: "2023-01-05", keterangan: "-", status: "Approved" },
  ];
  return (
    <>
      {isPopup ? <PopUp /> : null}
      <div className="bg-[#E7ECEF] h-[200vh] flex gap-6" data-theme="light">
        <Navbar />
        {/* SIDEBAR */}
        <div className="w-[23vw] relative z-10 flex flex-col gap-3 border-black py-[7em] h-screen">
          <a href="/Dashboard/Kaprodi/main" className="w-full flex hover:cursor-pointer items-center ps-8 gap-2 bg-[#fff] text-[#001247] py-3 rounded-r-xl">
            <MdHome className="text-xl" />
            <h1 className="font-bold text-lg">Dashboard</h1>
          </a>
          <a href="/Dashboard/Kaprodi/laporanSidang" className="w-full flex hover:cursor-pointer items-center ps-8 gap-2 bg-[#001247] text-white py-3 rounded-r-xl">
            <MdInsertChart className="text-xl" />
            <h1 className="font-bold text-lg">Laporan</h1>
          </a>
          <a href="/Dashboard/Kaprodi/setSidang" className="w-full flex hover:cursor-pointer items-center ps-8 gap-2 bg-[#fff] text-[#001247] py-3 rounded-r-xl">
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
          <div className="flex p-3 rounded-xl gap-6 items-start">
            <a href="/Dashboard/Kaprodi/laporan">
              <FaArrowLeft className="text-4xl" />
            </a>
            <div className="flex flex-col gap-4 w-full">
              <div className="flex gap-14 w-[100%]">
                <h1>Nama</h1>
                <div className="flex justify-start">
                  <h1>: {mahasiswa[1]}</h1>
                </div>
              </div>
              <div className="flex gap-[4.4em] w-[40%]">
                <h1>NIM</h1>
                <div className="flex justify-start w-full">
                  <h1>: {mahasiswa[2]}</h1>
                </div>
              </div>
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
                  <th>Berkas</th>
                  <th>Keperluan</th>
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
                    <td>{row.berkas}</td>
                    <td>{row.keperluan}</td>
                    <td>{row.date}</td>
                    <td>{row.keterangan}</td>
                    <td>
                      <div className="bg-[#EBF9F1] text-[#1F9254] px-3 py-1 rounded-xl">{row.status}</div>
                    </td>
                    <td>
                      <PiFileMagnifyingGlassFill onClick={() => setIsPopup(true)} className="mx-auto cursor-pointer text-[#001247] text-2xl" />
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
