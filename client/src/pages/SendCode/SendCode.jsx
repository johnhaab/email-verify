// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import checkEmail from "../../util/checkEmail";
import { ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";
import ReactiveButton from "reactive-button";
import HandleAlert from "../../components/HandleAlert";
import WaterMark from "../../components/WaterMark";
import axios from "axios";
import "./send.css";

const SendCode = () => {
  const [email, setEmail] = useState("");
  const [buttonStatus, setButtonStatus] = useState("idle");
  const navigate = useNavigate();

  // Grabbing the correct ip and port for the server.
  const serverPort = import.meta.env.VITE_REACT_APP_SERVER_PORT;
  const ipAddress = import.meta.env.VITE_REACT_APP_IP_ADDRESS;

  const sendEmailCode = async (email) => {
    setButtonStatus("loading");
    // Function to send the code to the users email input.
    if (checkEmail(email) === false) {
      // If the email is not valid, this displays an error message.
      setButtonStatus("error");
      HandleAlert("error", "Please enter a valid email address.");
    } else {
      // If the email is valid, send the code to the users email.
      try {
        axios
          .post(`http://${ipAddress}:${serverPort}/api/send-code`, {
            email: email,
          })
          .then(function (response) {
            setButtonStatus("success");
            if (response.data.success === true) {
              // Setting the email used to localStorage for later use.
              localStorage.setItem("emailUsed", email);
              HandleAlert("success", "Email sent successfully.");
              setTimeout(() => {
                console.log("sendCode - Email sent successfully");
                navigate("/check-code");
              }, 4000);
            }
          })
          .catch(function (err) {
            // Handle error state.
            setButtonStatus("error");
            HandleAlert(
              "error",
              "Uh oh! We ran into an erorr, please try again. - Error: " +
                err.message
            );
          });
      } catch (err) {
        // Handle error state.
        setButtonStatus("error");
        HandleAlert(
          "error",
          "Uh oh! We ran into an erorr, please try again. - Error: " +
            err.message
        );
      }
    }
  };

  return (
    <>
      <div className="flex justify-center items-center h-screen md:flex-row md:gap-10">
        <div className="flex absolute top-8 gap-5 block md:hidden">
          <button
            className="hover:scale-105 fix-btn transition-all text-white rounded-md px-4 py-3 font-semibold"
            onClick={() => {
              navigate("/check-code");
            }}
          >
            already have a code?
          </button>
          {localStorage.getItem("lastId") !== null ? (
            <button
              className="fix-btn hover:scale-105 transition-all text-white rounded-md px-4 py-3 font-semibold"
              onClick={() => {
                navigate("/success");
              }}
            >
              view your last code&apos;s data
            </button>
          ) : null}
        </div>
        <button
          className="hover:scale-105 hidden md:block fix-btn transition-all text-white rounded-md px-4 py-3 font-semibold"
          onClick={() => {
            navigate("/check-code");
          }}
        >
          already have a code?
        </button>
        <div className="flex flex-col">
          <input
            type="email"
            placeholder="example@email.com"
            className="focus:outline-[#01B170] active:scale-105 hover:scale-105 h-[47px] bg-[#f5f5f5] delay-75 transition-all border-gray-400 w-min rounded-md border-2 text-center px-3 py-2.5 font-semibold mb-3"
            onInput={(e) => setEmail(e.target.value)}
          />
          <ReactiveButton
            buttonState={buttonStatus}
            idleText="send code"
            loadingText="sending"
            successText="sent"
            errorText="try again"
            onClick={() => sendEmailCode(email)}
            className="hover:scale-105 fix-btn rounded-md bg-[#01b170] transition-all h-[125%] font-semibold"
          />
        </div>
        {localStorage.getItem("lastId") !== null ? (
          <button
            className="hidden md:block fix-btn hover:scale-105 transition-all text-white rounded-md px-4 py-3 font-semibold"
            onClick={() => {
              navigate("/success");
            }}
          >
            view your last code&apos;s data
          </button>
        ) : null}
        <WaterMark />
      </div>
      <ToastContainer />
    </>
  );
};

export default SendCode;
