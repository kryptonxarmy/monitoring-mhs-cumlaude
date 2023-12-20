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

  const [sidang,setSidang] = useState(false)

  const PopUp = () => {
    return (
      <>
        <div className="h-[100vh] w-screen absolute bg-[#00000054] z-50 flex justify-center items-center" data-theme="light">
          <div className="w-[60%] h-[70%] bg-white rounded-xl text-black py-14 px-[5em]">
            <h1 className="font-bold text-xl text-center mb-6">SET JADWAL SIDANG MAHASISWA</h1>
            <div className="flex flex-col gap-4 mb-8">
              <div className="flex justify-between w-fullitems-center">
                <p className="text-xl font-bold">Nama</p>
                <div className="w-full  max-w-lg">
                  <input type="text" placeholder="" value="Ilham Satria" className="input input-sm input-bordered w-full" disabled />
                </div>
              </div>
              <div className="flex justify-between w-fullitems-center">
                <p className="text-xl font-bold">NIM</p>
                <div className="w-full  max-w-lg">
                  <input type="text" placeholder="Type here" value="1202213054" className="input input-sm input-bordered w-full" disabled />
                </div>
              </div>
              <div className="flex justify-between w-fullitems-center">
                <p className="text-xl font-bold">Periode</p>
                <div className="w-full  max-w-lg">
                  <input type="text" placeholder="Type here" value="2" className="input input-sm input-bordered w-full" disabled/>
                </div>
              </div>
              <div className="flex justify-between w-fullitems-center">
                <p className="text-xl font-bold">Date</p>
                <div className="w-full  max-w-lg">
                  <input type="date" placeholder="Type here" className="input input-sm font-bold input-bordered w-full" />
                </div>
              </div>
              <div className="flex justify-between w-fullitems-center">
                <p className="text-xl font-bold">Judul TA</p>
                <div className="w-full  max-w-lg">
                  <input type="text" placeholder="Type here" value="Analisis Pengaruh AI dalam Kehidupan Nyata" className="input input-sm input-bordered w-full" disabled/>
                </div>
              </div>
            </div>
            <div className="flex gap-6 mx-auto justify-center">
              <button onClick={() => setSidang(false)} className="px-6 py-2 rounded-xl border-4 border-[#B01212] bg-[#FF8080] hover:border-[#b01212cc] hover:bg-[#ff8f8f] font-extrabold">CANCEL</button>
              <button onClick={() => setSidang(false)} className="px-4 py-2 rounded-xl border-4 border-[#12B018] bg-[#8AFF80] hover:border-[#12B018] hover:bg-[#a5fa9e] font-extrabold">SET PERIOD</button>
            </div>
          </div>
        </div>
      </>
    );
  };

  const rows = [
    { id: 1, nama: "Brice Swyre", nim: "1201234567", date: "2023-01-01", periode: 1, status: "Delivered", status: true },
    { id: 2, nama: "John Doe", nim: "1201234568", date: "2023-01-02", periode: 1, status: "Approved by", status: false },
    { id: 3, nama: "Jane Doe", nim: "1201234569", date: "2023-01-03", periode: 1, status: "Processing", status: false },
    { id: 4, nama: "Alice Wonderland", nim: "1201234570", date: "2023-01-04", periode: 2, status: "Delivered", status: true },
    { id: 5, nama: "Bob Builder", nim: "1201234571", date: "2023-01-05", periode: 3, status: "Pending", status: false },
    { id: 6, nama: "Bob Builder", nim: "1201234571", date: "2023-01-05", periode: 3, status: "Pending", status: true },
    { id: 7, nama: "Bob Builder", nim: "1201234571", date: "2023-01-05", periode: 3, status: "Pending", status: true },
  ];

  return (
    <>
      { sidang ?  <PopUp /> : null }
      <div className="bg-[#E7ECEF] h-full flex gap-6 pb-6" data-theme="light">
        <Navbar />
        {/* SIDEBAR */}
        <div className="w-[23vw] relative z-10 flex flex-col mb-[6em] gap-3 border-black py-[7em] h-screen">
          <a href="/Dashboard/Kaprodi/main" className="w-full flex hover:cursor-pointer items-center ps-8 gap-2 bg-[#fff] text-[#001247] py-3 rounded-r-xl">
            <MdHome className="text-xl" />
            <h1 className="font-bold text-lg">Dashboard</h1>
          </a>
          <a href="/Dashboard/Kaprodi/laporan" className="w-full flex hover:cursor-pointer items-center ps-8 gap-2 bg-[#fff] text-[#001247] py-3 rounded-r-xl">
            <MdInsertChart className="text-xl" />
            <h1 className="font-bold text-lg">Laporan</h1>
          </a>
          <a href="/Dashboard/Kaprodi/setSidang" className="w-full flex hover:cursor-pointer items-center ps-8 gap-2 bg-[#001247] text-white py-3 rounded-r-xl">
            <FaCalendarAlt className="text-xl" />
            <h1 className="font-bold text-lg">Set Jadwal Sidang</h1>
          </a>
          <a href="/Dashboard/Kaprodi/laporanSidang" className="w-full flex hover:cursor-pointer items-center ps-8 gap-2 bg-[#fff] text-[#001247] py-3 rounded-r-xl">
            <FaFileAlt className="text-xl" />
            <h1 className="font-bold text-md">Laporan Jadwal Sidang</h1>
          </a>
        </div>
        {/* ------- SIDEBAR --------- */}

        {/* CENTER */}
        <div className="w-full mr-10 pt-[7em] flex flex-col gap-4">
          {/* ATAS */}
          <div className="flex justify-between gap-4">
            <div className="bg-white rounded-xl h-full w-[30%] p-4">
              <h1 className="font-bold text-8xl text-center text-[#FF7777]">3</h1>
              <p className="font-bold text-center text-xl">Not Scheduled Yet</p>
            </div>
            <div className="bg-white  rounded-xl h-full w-[70%] px-4 py-2">
              <h1 className="font-bold text-center text-2xl mb-2">Scheculed</h1>
              <div className="flex gap-4 justify-evenly">
                <div>
                  <h1 className="font-bold text-6xl text-center text-[#77FF8D]">14</h1>
                  <p className="font-bold text-center text-xl">Periode 1</p>
                </div>
                <div>
                  <h1 className="font-bold text-6xl text-center text-[#77FF8D]">10</h1>
                  <p className="font-bold text-center text-xl">Periode 2</p>
                </div>
                <div>
                  <h1 className="font-bold text-6xl text-center text-[#77FF8D]">-</h1>
                  <p className="font-bold text-center text-xl">Periode 3</p>
                </div>
              </div>
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
                      <FaEdit onClick={() => setSidang(true)} className="mx-auto cursor-pointer text-[#001247] text-2xl" />
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
