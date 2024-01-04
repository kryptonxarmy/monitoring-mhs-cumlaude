"use client";
import React, { useEffect, useRef, useState } from "react";
import { MdHome } from "react-icons/md";
import { LuFileInput } from "react-icons/lu";
import { FaEdit, FaRegTrashAlt } from "react-icons/fa";
import Navbar from "../../../components/Navbar";
import axios from "axios";

function InputFileMahasiswa() {
  const addBerkasRef = useRef(false);
  const [keterangan, setKeterangan] = useState("");
  const [keperluan, setKeperluan] = useState("");
  const [berkas, setBerkas] = useState(null);
  const [dataList, setDataList] = useState([]);
  const [namaBerkas, setNamaBerkas] = useState("");
  

const nim = localStorage.getItem("nim");

// ----------------------------  METHOD BUAT GET DATA ----------------------------
const getData = async () => {
  try {
    const res = await axios.get('http://localhost:8080/berkasMhs');
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

  // ----------------------------  METHOD BUAT GET DATA ----------------------------

  // ----------------------------  METHOD BUAT DELETE DATA ----------------------------

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/berkasMhs/${id}`);
      alert("File Berhasil Dihapus!");
      // Refresh data after deletion
      getData();
    } catch (error) {
      console.log(error);
    }
  };
  // ----------------------------  METHOD BUAT DELETE DATA END ----------------------------

  const loadImage = (e) => {
    e.preventDefault();
    const image = e.target.files[0];
    setBerkas(image);
  };

  const formatDate = (date) => {
    const options = { year: "numeric", month: "numeric", day: "numeric" };
    return date.toLocaleDateString("id-ID", options);
  };

  useEffect(() => {
    getData();
  }, []);

  // const PopUpInputBerkas = () => {
  //   return (
  //     <div className="bg-[#00000065] w-full h-screen flex justify-center items-center absolute z-50">
  //       <div className="w-[60vw] px-4 py-6 bg-white rounded-xl">
  //         <h1 className="font-extrabold text-xl">UNGGAH BUKTI</h1>
  //         <div className="w-full h-[3px] bg-gray-600"></div>
  //         <div className="flex gap-3 items-center mt-8">
  //           <form className="flex flex-col gap-3 w-full">
  //             <div className="flex gap-3 items-center">
  //               <h1 className="font-bold">Nama Berkas</h1>
  //               <select
  //                 value={namaBerkas}
  //                 onChange={(e) => setNamaBerkas(e.target.value)}
  //                 name="nama_berkas"
  //                 className="file-input file-input-bordered w-full h-[2em]"
  //               >
  //                 <option value="TAK">TAK</option>
  //                 <option value="EPrT">EPrT</option>
  //                 <option value="Jurnal">Jurnal</option>
  //                 <option value="Bimbingan">Bimbingan</option>
  //                 <option value="Sertifikat Lomba">Sertifikat Lomba</option>
  //               </select>
  //             </div>
  //             <div className="flex gap-9 items-center">
  //               <h1 className="font-bold">Keperluan</h1>
  //               <input
  //                 type="text"
  //                 value={keperluan}
  //                 onChange={(e) => setKeperluan(e.target.value)}
  //                 name="nama_berkas"
  //                 className="file-input file-input-bordered w-full h-[2em]"
  //               />
  //             </div>
  //             <div className="flex gap-6 items-center">
  //               <h1 className="font-bold">Keterangan</h1>
  //               <input
  //                 type="text"
  //                 value={keterangan}
  //                 onChange={(e) => setKeterangan(e.target.value)}
  //                 name="keterangan"
  //                 className="file-input file-input-bordered w-full h-[2em]"
  //               />
  //             </div>
  //             <div className="flex gap-14 items-center">
  //               <h1 className="font-bold">Berkas</h1>
  //               <input
  //                 type="file"
  //                 onChange={loadImage}
  //                 name="file"
  //                 className="file-input file-input-bordered w-full h-[2em]"
  //               />
  //             </div>
  //           </form>
  //         </div>
  //         <p className="text-gray-400 text-sm text-center mt-4">
  //           File extension must be .jpg, .jpeg, or .png and is less than 2 MB
  //         </p>
  //         <center>
  //           <button
  //             onClick={handleSubmit}
  //             className="btn btn-sm mt-5 hover:bg-blue-400 bg-[#286CA9] text-white"
  //           >
  //             SUBMIT
  //           </button>
  //         </center>
  //       </div>
  //     </div>
  //   );
  // };

  return (
    <>
      <div className="bg-[#E7ECEF] h-[200vh] flex gap-6" data-theme="light">
        <Navbar />
        {/* {addBerkasRef.current && <PopUpInputBerkas />} */}

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

        <div className="pt-[7em] w-[70%]">
          <div className="w-full flex justify-end mb-4">
            <a className="btn bg-green-400 hover:bg-green-500" href="/Dashboard/Mahasiswa/unggah">
              Tambah Berkas
            </a>
          </div>
          <div className="overflow-x-auto bg-white rounded-xl" data-theme="light">
            <h1 className="font-extrabold text-xl ml-4 mt-4">Catatan Aktivitas</h1>
            <table className="table table-zebra">
              <thead>
                <tr className="text-center text-black font-extrabold">
                  <th>No</th>
                  <th>Berkas</th>
                  {/* <th>Keperluan</th> */}
                  <th>Date</th>
                  <th>Keterangan</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {dataList
                .filter((data) => data.nim.toString() === nim.toString())
                .map((data, index) => (
                  <tr className="text-center" key={data.id}>
                    <th>{index + 1}</th>
                    <td>{data.nama_berkas}</td>
                    <td>{formatDate(new Date(data.updated_at))}</td>
                    <td className="max-w-xs">{data.keterangan}</td>
                    <td>
                      <div className="bg-[#EBF9F1] text-[#1F9254] px-3 py-1 rounded-xl">{data.status}</div>
                    </td>
                    <td>
                      {/* <button className="text-[#624DE3] mx-2 text-xl">
                        <FaEdit />
                      </button> */}
                      <button onClick={() => handleDelete(data.id)} className="text-[#A30D11] mx-2 text-xl">
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
    </>
  );
}

export default InputFileMahasiswa;
