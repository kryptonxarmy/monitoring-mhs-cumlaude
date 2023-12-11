"use client"
import React, { useState, useEffect } from "react";
// import app from "../../../app";
import { MdHome } from "react-icons/md";
import { LuFileInput } from "react-icons/lu";
import { MdAddBox } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import { FaRegTrashAlt } from "react-icons/fa";
import Navbar from "../../../components/Navbar";

function InputFileMahasiswa() {
    const [addBerkas, setAddBerkas] = useState(false);
    const [progress, setProgress] = useState(0);

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

    // const appName =
    //     window.document.getElementsByTagName("title")[0]?.innerText ||
    //     "Input File";

    const progressBar = (targetValue) => {
        let currentProgress = progress;

        const interval = setInterval(() => {
            if (currentProgress < targetValue) {
                currentProgress += 1;
                setProgress(currentProgress);
            } else {
                clearInterval(interval);
                setAddBerkas(false);

                // Wait for 1 second before reloading
                setTimeout(() => {
                    setProgress(0); // Reset progress to 0
                    window.location.reload();
                }, 500);
            }
        }, 10);
    };

    const PopUpInputBerkas = () => {
        return (
            <div className=" bg-[#00000065] w-full h-screen flex justify-center items-center absolute z-50">
                <div className=" px-4 py-6 bg-white rounded-xl">
                    <h1 className="font-extrabold text-xl">UNGGAH BUKTI</h1>
                    <div className="w-full h-[3px] bg-gray-600"></div>
                    <div className="flex gap-3 items-center mt-8">
                        <h1 className="text-xl font-bold">Berkas</h1>
                        <form action="">
                            <input
                                type="file"
                                className="file-input file-input-bordered w-full max-w-xs h-[2em]"
                            />
                        </form>
                    </div>
                    <p className="text-gray-400 text-sm text-center mt-4">
                        File extension must .jpg .jpeg, or .png and is less than
                        2 MB
                    </p>
                    <progress
                        className="progress w-full h-3 mt-3"
                        value={progress}
                        max="100"
                    ></progress>
                    <center>
                        <button
                            onClick={() => progressBar(100)}
                            className="btn btn-sm mt-5 hover:bg-blue-400 bg-[#286CA9] text-white"
                        >
                            SUBMIT
                        </button>
                    </center>
                </div>
            </div>
        );
    };

    return (
        <>
            <div
                className="bg-[#E7ECEF] h-[200vh] flex gap-6"
                data-theme="light"
            >
                <Navbar />
                {addBerkas ? <PopUpInputBerkas /> : null}

                {/* SIDEBAR */}
                <div className="w-[23vw] relative z-10 flex flex-col gap-3 border-black py-[7em] h-screen">
                    <a
                        href="/Dashboard/Mahasiswa/main"
                        className="w-full flex hover:cursor-pointer justify-center items-center gap-2 bg-[#fff] text-black py-3 rounded-r-xl"
                    >
                        <MdHome className="text-xl" />
                        <h1 className="font-bold text-xl">Dashboard</h1>
                    </a>
                    <a
                        href="dashboardmahasiswa/inputfile"
                        className="w-full flex hover:cursor-pointer justify-center items-center gap-2 bg-[#001247] text-white py-2 rounded-r-xl"
                    >
                        <LuFileInput className="text-xl" />
                        <h1 className="font-bold text-xl">Input File</h1>
                    </a>
                </div>
                {/* ------- SIDEBAR --------- */}

                {/* TABLE */}
                <div className="pt-[7em] w-[70%]">
                    <div
                        className="overflow-x-auto bg-white rounded-xl"
                        data-theme="light"
                    >
                        <h1 className="font-extrabold text-xl ml-4 mt-4">
                            Catatan Aktivitas
                        </h1>
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
                                            <div className="bg-[#EBF9F1] text-[#1F9254] px-3 py-1 rounded-xl">
                                                {data.status}
                                            </div>
                                        </td>
                                        <td>
                                            <button className="text-[#1F9254] mx-2 hover:cursor-pointer text-xl">
                                                <MdAddBox
                                                    onClick={() =>
                                                        setAddBerkas(true)
                                                    }
                                                />
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
                    {/* TABLE */}
                </div>
                {/* CENTER */}
            </div>
        </>
    );
}

export default InputFileMahasiswa;
