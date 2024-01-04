"use client";

import React from "react";
import { useState, useEffect } from "react";
import { MdHome } from "react-icons/md";
import { FaCalendarAlt } from "react-icons/fa";
import { MdInsertChart } from "react-icons/md";
import { FaFileAlt } from "react-icons/fa";
import { PiFileMagnifyingGlassFill } from "react-icons/pi";
import Navbar from "../../../components/Navbar";
import { useRouter } from "next/navigation";
import axios from "axios";

function DashboardKaprodi() {
  const [dataList, setDataList] = useState([]);

  const router = useRouter();

  // ----------------------------  METHOD BUAT GET DATA ----------------------------
  const getData = async () => {
    console.log("fetching data....");
    try {
      const res = await axios.get("http://localhost:8080/berkasKaprodi");
      // Destructuring response.data untuk mengambil data langsung
      setDataList(res.data);
      console.log(res.data);

      data.forEach((item) => {
        const dateObject = new Date(item.updated_at);
        const formattedDate = formatDate(dateObject);
        console.log(formattedDate);
      });
    } catch (error) {
      console.error("Error fetching data:", error.message);
      console.log(error.message);
      // Handle error, misalnya menampilkan pesan kesalahan kepada pengguna
    }
  };

  // ----------------------------  METHOD BUAT GET DATA ----------------------------

  const formatDate = (date) => {
    const options = { year: "numeric", month: "numeric", day: "numeric" };
    return date.toLocaleDateString("id-ID", options);
  };

  useEffect(() => {
    getData();
  }, []);

  const rows = [
    { id: 1, nama: "Ilham Satria", nim: "1201234567", date: "2023-01-01", keterangan: "Need Your Approval", status: "Need Approval" },
    { id: 2, nama: "Ahmad Syahid Danu Wardana", nim: "1201234568", date: "2023-01-02", keterangan: "Need Your Approval", status: "Need Approval" },
    { id: 3, nama: "Rakha Putra Pebri Yandra", nim: "1201234569", date: "2023-01-03", keterangan: "Second Revision", status: "2nd Revision" },
    { id: 4, nama: "Alice Wonderland", nim: "1201234570", date: "2023-01-04", keterangan: "Revised", status: "Revised" },
    { id: 5, nama: "Bob Builder", nim: "1201234571", date: "2023-01-05", keterangan: "-", status: "Approved" },
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
                <th>Nama Berkas</th>
                <th>Status</th>
                <th className="text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              {dataList.map((data, index) => (
                <tr key={data.id} className="text-center">
                  <th>{index + 1}</th>
                  <td>{data.user_name}</td>
                  <td>{data.nim}</td>
                  <td>{formatDate(new Date(data.updated_at))}</td>
                  <td>{data.nama_berkas}</td>
                  <td>
                    <div
                      className={`px-3 py-1 rounded-xl ${
                        data.status === "Delivered" ? "bg-yellow-300 text-black" : data.status === "Rejected" ? "bg-red-300 text-white" : data.status === "Approved" || "approved" ? "bg-green-300 text-green-900" : ""
                      }`}
                    >
                      {data.status === "Delivered" ? "Need Approval" : data.status}
                    </div>
                  </td>
                  <td>
                    <PiFileMagnifyingGlassFill onClick={() => router.push(`/Dashboard/Kaprodi/laporan/${data.id}/${data.user_name}/${data.nim}`)} className="mx-auto cursor-pointer text-[#001247] text-2xl" />
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
