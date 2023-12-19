/* eslint-disable no-unused-vars */
// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ReactiveButton from "reactive-button";
import HandleErrorResponse from "../../components/HandleErrorResponse";
import HandleSuccessResponse from "../../components/HandleSuccessResponse";
import ComingSoon from "../../components/ComingSoon";
import WaterMark from "../../components/WaterMark";
import axios from "axios";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./enter.css";

const EnterCode = () => {
  const [code, setCode] = useState("");
  const [buttonStatus, setButtonStatus] = useState("idle");

  const navigate = useNavigate();

  // Grabbing the correct ip and port for the server.
  const serverPort = import.meta.env.VITE_REACT_APP_SERVER_PORT;
  const ipAddress = import.meta.env.VITE_REACT_APP_IP_ADDRESS;

  const email = localStorage.getItem("emailUsed");

  const verifyCode = async () => {
    setButtonStatus("loading");
    // Function to verify the code provided by the user.
    if (code.length !== 6) {
      setButtonStatus("error");
      // Display error message if the code is not 6 digits.
      // Using Swal package to speed up dev process with alerts.

      // HandleErrorResponse();
      alert("code needs to be exactly 6 digits");
      return;
    }
    try {
      // Check the code against the database, searching with the code provided,
      // and with the email saved in localStorage.
      const response = await axios.post(
        `http://${ipAddress}:${serverPort}/api/check-code`,
        {
          email,
          code,
        }
      );
      if (response.data.success === false) {
        // Display error message if the server response indicates failure
        setButtonStatus("idle");

        // HandleErrorResponse();
        alert("error fetching data from server");
      } else if (response.data.success === true) {
        setButtonStatus("success");
        HandleSuccessResponse(
          response.data.data,
          "Code verified successfully!",
          navigate
        );
      }
    } catch (err) {
      setButtonStatus("error");
      HandleErrorResponse(err);
    }
  };

  return (
    <>
      <div className="md:flex-row flex flex-col justify-center items-center h-screen">
        <button
          className="md:relative hover:scale-105 md:-mt-[65px] fix-btn transition-all absolute top-8 bg-[#01B170] px-4 py-[11px] font-semibold text-white rounded-md"
          onClick={() => {
            navigate("/");
          }}
        >
          back to homepage
        </button>
        <div className="md:justify-between md:flex-row flex flex-col w-fit justify-between items-start">
          <input
            type="number"
            placeholder="enter code"
            className="hover:scale-105 h-[47px] focus:outline-[#01B170] md:mx-5 bg-[#f5f5f5] mx-0 delay-75 transition-all active:scale-105 placeholder:text-zinc-400 border-zinc-400 w-full rounded-md border-2 text-center px-3 py-2.5 font-semibold"
            onInput={(e) => setCode(e.target.value)}
          />
          <div className="flex justify-between items-center w-full mt-3">
            <ReactiveButton
              buttonState={buttonStatus}
              idleText="verify"
              loadingText="loading"
              successText="success"
              errorText="try again"
              onClick={() => verifyCode()}
              className="hover:scale-105 md:hover:-translate-y-3 md:-mt-3 fix-btn h-[140%] text-base bg-[#01B170] transition-all font-semibold rounded-md"
            />
            <button
              className="hover:scale-105 md:hidden hover:text-[#01B170] mt-2 block text-zinc-400 rounded-md font-semibold transition-all"
              onClick={() => ComingSoon("resend button", "#01B170")}
            >
              resend
            </button>
          </div>
        </div>
        <WaterMark />
      </div>
      <ToastContainer />
    </>
  );
};

export default EnterCode;
