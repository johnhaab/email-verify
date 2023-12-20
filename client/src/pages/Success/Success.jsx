/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Success = () => {
  const [data, setData] = useState({
    id: localStorage.getItem("lastId"),
    createdAt: localStorage.getItem("lastCreatedAt"),
    email: localStorage.getItem("emailUsed"),
    expTime: localStorage.getItem("lastExpirationTime"),
    code: localStorage.getItem("lastCode"),
    activatedIp: localStorage.getItem("lastActiveIp"),
  });

  const navigate = useNavigate();

  return (
    <div className="px-20 flex justify-center items-center h-screen flex-col gap-10">
      <button
        className="fix-btn absolute top-8 bg-[#01b170] hover:scale-105 transition-all text-white rounded-md px-4 py-3 font-semibold"
        onClick={() => {
          navigate("/");
        }}
      >
        return to homepage{" "}
      </button>
      {data.id !== null ? (
        <>
          <h1 className="font-bold flex justify-center items-center text-center text-zinc-400">
            Here&apos;s some info about the last code you verified:
          </h1>
          <div className="p-5 rounded-md font-semibold text-center text-zinc-400">
            <p>
              ID: <span className="text-[#01b170] font-bold">{data.id}</span>
            </p>
            <p>
              Date the code was created:{" "}
              <span className="text-[#01b170] font-bold">{data.createdAt}</span>
            </p>
            <p>
              Email linked to the code:{" "}
              <span className="text-[#01b170] font-bold">{data.email}</span>
            </p>
            <p>
              How many seconds until the code expires:{" "}
              <span className="text-[#01b170] font-bold">{data.expTime}</span>
            </p>
            <p>
              The code itself:{" "}
              <span className="text-[#01b170] font-bold">{data.code}</span>
            </p>
            <p>
              The IP Address that activated the code:{" "}
              <span className="text-[#01b170] font-bold">
                {data.activatedIp}
              </span>
            </p>
          </div>
        </>
      ) : (
        <>
          <p>No data found please verify a code.</p>
        </>
      )}
    </div>
  );
};

export default Success;
