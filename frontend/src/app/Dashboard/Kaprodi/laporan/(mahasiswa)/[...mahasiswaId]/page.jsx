"use client";

import React, { useState, useEffect } from "react";
import { MdHome } from "react-icons/md";
import { FaCalendarAlt, FaFileAlt, FaArrowLeft } from "react-icons/fa";
import { MdInsertChart } from "react-icons/md";
import { PiFileMagnifyingGlassFill } from "react-icons/pi";
import Navbar from "../../../../../components/Navbar";
import axios from "axios";

function DashboardKaprodi({ params }) {
  const mahasiswa = params.mahasiswaId.map((name) => decodeURIComponent(name));
  const [isPopup, setIsPopup] = useState(false);
  const [dataList, setDataList] = useState([]);
  const [selectedBerkasId, setSelectedBerkasId] = useState(null);

  const getData = async () => {
    try {
      const res = await axios.get("http://localhost:8081/berkasMhs");
      setDataList(res.data);

      res.data.forEach((item) => {
        const dateObject = new Date(item.updated_at);
        const formattedDate = formatDate(dateObject);
        console.log(formattedDate);
      });
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const formatDate = (date) => {
    const options = { year: "numeric", month: "numeric", day: "numeric" };
    return date.toLocaleDateString("id-ID", options);
  };

  const handleApproval = async (answer) => {
    try {
      if (selectedBerkasId) {
        const response = await axios.put(`http://localhost:8081/berkasMhs/${selectedBerkasId}`, { status: `${answer}` });
        console.log(response.data);
        window.location.reload();
      } else {
        console.error("No selected berkas id.");
      }
    } catch (error) {
      console.error("Error approving request:", error);
    }

    setIsPopup(false);
  };

  useEffect(() => {
    getData();
  }, []);

  const handlePopUp = (id) => {
    setSelectedBerkasId(id);
    setIsPopup(!isPopup);
  };

  const PopUp = () => {
    return (
      <>
        <div className="h-full w-screen absolute bg-[#00000054] z-50 flex justify-center items-center" data-theme="light">
          <div className="py-6 px-[10em] bg-white rounded-xl text-black flex flex-col gap-6">
            <img src="/img/Sertifikat.png" alt="telu" className="object-none object-cover" />
            <div className="flex gap-6 mx-auto justify-center">
              <button onClick={() => handleApproval("Rejected")} className="px-6 py-2 rounded-xl border-4 border-[#B01212] bg-[#FF8080] hover:border-[#b01212cc] hover:bg-[#ff8f8f] font-extrabold">
                REJECT
              </button>

              <button onClick={() => handleApproval("Approved")} className="px-4 py-2 rounded-xl border-4 border-[#12B018] bg-[#8AFF80] hover:border-[#12B018] hover:bg-[#a5fa9e] font-extrabold">
                APPROVE
              </button>
            </div>
          </div>
        </div>
      </>
    );
  };

  return (
    <>
      {isPopup ? <PopUp /> : null}
      <div className="bg-[#E7ECEF] h-[200vh] flex gap-6" data-theme="light">
        <Navbar />
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

        <div className="w-full mr-10 pt-[7em] flex flex-col gap-4">
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

          <div className="overflow-x-auto bg-white rounded-xl" data-theme="light">
            <table className="table table-zebra">
              <thead>
                <tr className="text-center text-black font-extrabold">
                  <th>No</th>
                  <th>Nama Berkas</th>
                  <th>Date</th>
                  <th>Keterangan</th>
                  <th>Status</th>
                  <th className="text-center">Action</th>
                </tr>
              </thead>
              <tbody>
                {dataList
                  .filter((data) => data.nim.toString() === mahasiswa[2].toString())
                  .map((data, index) => (
                    <tr className="text-center" key={data.id}>
                      <th>{index + 1}</th>
                      <td>{data.nama_berkas}</td>
                      <td>{formatDate(new Date(data.updated_at))}</td>
                      <td className="max-w-xs">{data.keterangan}</td>
                      <td>
                        <div
                          className={`px-3 py-1 rounded-xl ${
                            data.status === "Delivered" ? "bg-yellow-300 text-black" : data.status === "Rejected" ? "bg-red-400 text-red-900" : data.status === "Approved" || "approved" ? "bg-green-400 text-green-900" : ""
                          }`}
                        >
                          {data.status === "Delivered" ? "Need Approval" : data.status}
                        </div>
                      </td>
                      <td>
                        <PiFileMagnifyingGlassFill onClick={() => handlePopUp(data.id)} className="mx-auto cursor-pointer text-[#001247] text-2xl" />
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}

export default DashboardKaprodi;
