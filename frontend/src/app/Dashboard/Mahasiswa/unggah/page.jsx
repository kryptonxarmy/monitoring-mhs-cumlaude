"use client";
import React, { useEffect, useState } from "react";
// import app from "../../../app";
import { MdHome } from "react-icons/md";
import { LuFileInput } from "react-icons/lu";
import { MdAddBox } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import { FaRegTrashAlt } from "react-icons/fa";
import Navbar from "../../../components/Navbar";
import axios from "axios";

function InputFileMahasiswa() {
  const [addBerkas, setAddBerkas] = useState(false);
  const [keterangan, setKeterangan] = useState("");
  const [keperluan, setKeperluan] = useState("");
  const [berkas, setBerkas] = useState(null);
  const [dataList, setDataList] = useState([]);
  const [namaBerkas, setNamaBerkas] = useState("");

  const loadImage = (e) => {
    e.preventDefault();
    const image = e.target.files[0];
    setBerkas(image);
    // setPreview(URL.createObjectURL(image)); ---> Inget inget ini buat nanti di Kaprodi waktu show file
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("clicked");
    const formData = new FormData();
    formData.append("file", berkas);
    formData.append("nama_berkas", namaBerkas);
    formData.append("keperluan", keperluan);
    formData.append("keterangan", keterangan);
  
    try {
      await axios.post("http://localhost:8080/berkasMhs", formData, {
        headers: {
          "Content-type": "multipart/form-data",
        },
      });
      console.log(formData);
      alert("File Berhasil Diupload !");
      window.location.href = "/Dashboard/Mahasiswa/inputfile"
    } catch (error) {
      console.error("Error uploading file:", error.message);
    }
  };

  return (
    <>
      <div className="bg-[#E7ECEF] h-[200vh] flex gap-6" data-theme="light">
        <Navbar />

        {/* SIDEBAR */}
        <div className="w-[23vw] relative z-10 flex flex-col gap-3 border-black py-[7em] h-screen">
          <a href="/Dashboard/Mahasiswa/main" className="w-full flex hover:cursor-pointer justify-center items-center gap-2 bg-[#fff] text-black py-3 rounded-r-xl">
            <MdHome className="text-xl" />
            <h1 className="font-bold text-xl">Dashboard</h1>
          </a>
          <a href="dashboardmahasiswa/inputfile" className="w-full flex hover:cursor-pointer justify-center items-center gap-2 bg-[#001247] text-white py-2 rounded-r-xl">
            <LuFileInput className="text-xl" />
            <h1 className="font-bold text-xl">Input File</h1>
          </a>
        </div>
        {/* ------- SIDEBAR --------- */}

        {/* TABLE */}
        <div className="pt-[7em] w-[70%] flex justify-center">
          <div className="flex justify-center items-center absolute z-50">
            <div className="w-[60vw] px-4 py-6 bg-white rounded-xl">
              <h1 className="font-extrabold text-xl">UNGGAH BUKTI</h1>
              <div className="w-full h-[3px] bg-gray-600"></div>
              <div className="flex gap-3 items-center mt-8">
                <form className="flex flex-col gap-3 w-full">
                  <div className="flex gap-3 items-center">
                    <h1 className="font-bold">Nama Berkas</h1>
                    <select value={namaBerkas} onChange={(e) => setNamaBerkas(e.target.value)} name="nama_berkas" className="file-input file-input-bordered w-full h-[2em]">
                      <option value="TAK">TAK</option>
                      <option value="EPrT">EPrT</option>
                      <option value="Jurnal">Jurnal</option>
                      <option value="Bimbingan">Bimbingan</option>
                      <option value="Sertifikat Lomba">Sertifikat Lomba</option>
                    </select>
                  </div>
                  <div className="flex gap-9 items-center">
                    <h1 className="font-bold">Keperluan</h1>
                    <input type="text" value={keperluan} onChange={(e) => setKeperluan(e.target.value)} name="nama_berkas" className="file-input file-input-bordered w-full h-[2em]" />
                  </div>
                  <div className="flex gap-6 items-center">
                    <h1 className="font-bold">Keterangan</h1>
                    <input type="text" value={keterangan} onChange={(e) => setKeterangan(e.target.value)} name="keterangan" className="file-input file-input-bordered w-full h-[2em]" />
                  </div>
                  <div className="flex gap-14 items-center">
                    <h1 className="font-bold">Berkas</h1>
                    <input type="file" onChange={loadImage} name="file" className="file-input file-input-bordered w-full h-[2em]" />
                  </div>
                </form>
              </div>
              <p className="text-gray-400 text-sm text-center mt-4">File extension must .jpg .jpeg, or .png and is less than 2 MB</p>
              <center>
                <button onClick={handleSubmit} className="btn px-6 mt-5 hover:bg-blue-400 bg-[#286CA9] text-white">
                  SUBMIT
                </button>
              </center>
            </div>
          </div>
          );
        </div>
        {/* CENTER */}
      </div>
    </>
  );
}

export default InputFileMahasiswa;
