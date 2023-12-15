/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

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

  useEffect(() => {
    if (data.id === null) {
      // Show the alert if there's no data

      Swal.fire({
        title: "We found no data?",
        text: "You might want to try and verify a code to see some data here!",
        icon: "question",
        confirmButtonText: `
        <a href="/" >Back to homepage</a>
        `,
      });
    }
  });

  return (
    <div className="px-20 flex justify-center items-center h-screen flex-col gap-10">
      {data.id !== null ? (
        <>
          <h1 className="font-bold">Output:</h1>
          <div className=" bg-black bg-opacity-20 p-5 rounded-md font-semibold">
            <p>
              ID: <span className="text-lime-600 font-bold">{data.id}</span>
            </p>
            <p>
              Date the code was created:{" "}
              <span className="text-lime-600 font-bold">{data.createdAt}</span>
            </p>
            <p>
              Email linked to the code:{" "}
              <span className="text-lime-600 font-bold">{data.email}</span>
            </p>
            <p>
              How many seconds until the code expires:{" "}
              <span className="text-lime-600 font-bold">{data.expTime}</span>
            </p>
            <p>
              The code itself:{" "}
              <span className="text-lime-600 font-bold">{data.code}</span>
            </p>
            <p>
              The IP Address that activated the code:{" "}
              <span className="text-lime-600 font-bold">
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

      <button
        className="absolute top-0 mt-4 underline text-lime-600 font-semibold"
        onClick={() => {
          navigate("/");
        }}
      >
        return to homepage{" "}
      </button>
    </div>
  );
};

export default Success;
