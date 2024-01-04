"use client";
import axios from "axios";
import { useState } from "react";
import { FaWhatsapp, FaWindowRestore } from "react-icons/fa";

function LoginPage() {
  const [userID, setUserID] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    const res = await axios.post("http://localhost:8080/login", {
      user_id: userID,
      password: password,
    });

    if(res.status === 200){
      if(res.data.role === 'mahasiswa'){
        localStorage.setItem('name', res.data.name)
        localStorage.setItem('nim', res.data.user_id)
        window.location.href = "Dashboard/Mahasiswa/main"
      }else if(res.data.role === 'kaprodi'){
        window.location.href = "Dashboard/Kaprodi/main"
      }
      console.log(res.data.role)
    }
  };

  return (
    <>
      <div className="h-screen w-screen flex bg-[#111827]">
        <div className="h-full w-[80%]">
          <div className="absolute w-[80%] mt-20">
            <h1 className="font-black relative text-white text-5xl z-20 w-[60%] mt-12 ml-12">Sistem Managemen Monitoring Mahasiswa Cumlaude</h1>
            <p className="relative text-white z-20 w-[60%] mt-5 ml-12">
              Selamat Datang di Website Monitoring Mahasiswa Cumlaude Sistem Informasi, dengan website ini, anda dapat memantau perkembangan progres untuk mempersiapkan kelulusan anda dengan predikat cumlaude
            </p>
          </div>
          <div className="w-[72.7%] h-full bg-black absolute opacity-50"></div>
          <img src="/img/TULT.png" alt="telu" className="w-full h-full object-cover" />
        </div>
        <div className="h-full w-[30%] bg-white flex flex-col justify-center items-center">
          <img src="https://s1sisteminformasi.id/wp-content/uploads/2023/09/Logo-Sistem-Informasi-167.png" alt="logo sisfo" />
          <div className="w-full px-8">
            <h1 className="font-extrabold text-lg text-[#274C77] mb-3 text-start mt-7 underline">Login</h1>
          </div>
          <div className="w-full px-8">
            <form className="w-full" onSubmit={handleLogin}>
              <div className="mb-3">
                <label htmlFor="userID" className="block mb-2 text-sm font-medium">
                  NIM/NIP
                </label>
                <input
                  type="string"
                  name="user_id"
                  value={userID}
                  onChange={(e) => setUserID(e.target.value)}
                  id="number"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 shadow-xl "
                  placeholder="120xxxxxx"
                />
              </div>
              <div className="mb-6">
                <label htmlFor="password" className="block mb-2 text-sm font-medium ">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-md rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 shadow-xl "
                  required
                />
              </div>
              <div className="w-[80%] mx-auto gap-4 flex flex-col">
                <button type="submit" className="bg-[#4680FF] text-center text-white py-2 rounded-xl">
                  Log in
                </button>
                <div className="flex flex-col">
                  <hr className="h-px border-t-0 bg-transparent bg-gradient-to-r from-transparent via-neutral-500 to-transparent opacity-25 dark:opacity-100" />
                  <p className="text-black font-bold text-center">Kontak Keluhan</p>
                </div>
                <a
                  // type="submit"
                  href="/dashboardmahasiswa"
                  className="bg-[#28A745] flex gap-2 items-center px-4 justify-center text-center text-white py-2 rounded-xl"
                >
                  <FaWhatsapp className="text-center text-xl" />
                  Helpdesk Prodi
                </a>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default LoginPage;
