"use client"

import React from "react";
import Navbar from "../../../components/Navbar";
import { FaBirthdayCake } from "react-icons/fa";
import { FaPhoneAlt } from "react-icons/fa";
import { IoIosMail } from "react-icons/io";
import { MdAddBox } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import { FaRegTrashAlt } from "react-icons/fa";

function ProfileMahasiswa() {
  const dataList = [
    {
      id: 1,
      nama_berkas: "TAK",
      keperluan: "Input TAK",
      date: "12/09/23",
      keterangan: "berkas diinput berdasa..",
      status: "Delivered",
    },
    {
      id: 1,
      nama_berkas: "EPrT",
      keperluan: "Input EPrT",
      date: "12/09/23",
      keterangan: "berkas diinput berdasa..",
      status: "Delivered",
    },
    {
      id: 1,
      nama_berkas: "Bimbingan",
      keperluan: "Bimbingan",
      date: "12/09/23",
      keterangan: "berkas diinput berdasa..",
      status: "Delivered",
    },
    {
      id: 1,
      nama_berkas: "Jurnal",
      keperluan: "Upload Jurnal",
      date: "12/09/23",
      keterangan: "berkas diinput berdasa..",
      status: "Delivered",
    },
    {
      id: 1,
      nama_berkas: "Sertifikat Lomba",
      keperluan: "Upload Sertifikat",
      date: "12/09/23",
      keterangan: "berkas diinput berdasa..",
      status: "Delivered",
    },
    {
      id: 1,
      nama_berkas: "Target Sidang",
      keperluan: "Input TAK",
      date: "12/09/23",
      keterangan: "berkas diinput berdasa..",
      status: "Delivered",
    },
  ];

  return (
    <>
      <div className="bg-[#E7ECEF] h-fit pb-6 flex gap-6" data-theme="light">
        <Navbar />
        <div className="w-screen h-full flex flex-col px-[5em]">
          <div className="mt-[7em] w-full bg-white mb-[3em] h-fit rounded-xl mb-4">
            <img className="object-cover h-[250px] w-full rounded-t-xl " src="/img/TULT.png" alt="" />
            <div className="flex px-4 justify-between">
              <div className="flex px-4 h-[123px]">
                <img className="object-cover relative bottom-20 mx-3 w-[179px] h-[179px] rounded-full" src="/img/TULT.png" alt="gambar" />

                <div className="flex flex-col my-auto">
                  <h1 className="font-black text-xl">Admin</h1>
                  <p className="text-gray-400">Information System Student</p>
                </div>
              </div>
              <div className="px-4 items-center flex">
                <button className="btn btn-sm px-7 text-[#001247] hover:text-white bg-transparent border-[#001247] hover:bg-[#001247]">Edit Profile</button>
              </div>
            </div>
          </div>

          {/* YANG BAWAH */}
          <div className="flex gap-4">
            <div className="p-3 w-[20%] h-full bg-white rounded-xl">
              <h1 className="font-bold mb-4 text-xl">About</h1>
              <div className="flex flex-col gap-4">
                <div className="flex items-center gap-2">
                  <FaBirthdayCake />
                  <p>Born June 26, 2001</p>
                </div>
                <div className="flex items-center gap-1">
                  <IoIosMail className="text-2xl" />
                  <p className="truncate">whoami@student.telkomuniversity.ac.id</p>
                </div>
                <div className="flex items-center gap-2">
                  <FaPhoneAlt />
                  <p>081359357517</p>
                </div>
              </div>
            </div>
            <div className="p-3 w-[80%] h-full bg-white rounded-xl">
              <div className="overflow-x-auto bg-white rounded-xl" data-theme="light">
                <h1 className="font-extrabold text-xl ml-4 mt-4">Catatan Aktivitas</h1>
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
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {dataList.map((data) => (
                      <tr className="text-center" key={data.id}>
                        <th>{data.id}</th>
                        <td>{data.nama_berkas}</td>
                        <td>{data.keperluan}</td>
                        <td>{data.date}</td>
                        <td>{data.keterangan}</td>
                        <td>
                          <div className="bg-[#EBF9F1] text-[#1F9254] px-3 py-1 rounded-xl">{data.status}</div>
                        </td>
                        <td>
                          <button className="text-[#1F9254] mx-2 hover:cursor-pointer text-xl">
                            <MdAddBox onClick={() => setAddBerkas(true)} />
                          </button>
                          <button className="text-[#624DE3] mx-2 text-xl">
                            <FaEdit />
                          </button>
                          <button className="text-[#A30D11] mx-2 text-xl">
                            <FaRegTrashAlt />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ProfileMahasiswa;
