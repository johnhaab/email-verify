// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import checkEmail from "../../util/checkEmail";
import { useNavigate } from "react-router-dom";
import ReactiveButton from "reactive-button";
import HandleErrorResponse from "../../components/HandleErrorResponse";
import Swal from "sweetalert2";
import axios from "axios";
import "./send.css";

const SendCode = () => {
  const [email, setEmail] = useState("");
  const [buttonStatus, setButtonStatus] = useState("idle");
  const navigate = useNavigate();

  // Grabbing the correct port for the server.
  const backendPort = import.meta.env.VITE_REACT_APP_BACKEND_PORT;

  const sendEmailCode = async (email) => {
    setButtonStatus("loading");
    // Function to send the code to the users email input.

    if (checkEmail(email) === false) {
      setButtonStatus("error");
      // If the email is not valid, this displays an error message.

      Swal.fire({
        position: "center",
        icon: "error",
        title: "Please enter a valid email address",
        showConfirmButton: true,
        timer: 3000,
        timerProgressBar: true,
      });
      return;
    } else {
      // If the email is valid, send the code to the users email.

      try {
        axios
          .post(`http://localhost:${backendPort}/api/send-code`, {
            email: email,
          })
          .then(function (response) {
            setButtonStatus("success");

            if (response.data.success === true) {
              // Setting the email used to localStorage for later use.

              localStorage.setItem("emailUsed", email);
              return navigate("/check-code");
            }
          })
          .catch(function (err) {
            // Handle error state.

            setButtonStatus("error");
            HandleErrorResponse(err.response.data);
          });
      } catch (err) {
        // Handle error state.

        setButtonStatus("error");
        HandleErrorResponse(err.response.data);
      }
    }
  };

  return (
    <>
      <div className="flex flex-col justify-center items-center h-screen">
        <button
          className="fix-btn absolute top-5 bg-[#0284C7] hover:scale-105 transition-all text-white rounded-md px-4 py-3 font-semibold"
          onClick={() => {
            navigate("/check-code");
          }}
        >
          already have a code?
        </button>
        <input
          type="email"
          placeholder="enter your email"
          className="border-gray-400 w-min rounded-md border-2 text-center px-3 py-2.5 font-semibold mb-3"
          onInput={(e) => setEmail(e.target.value)}
        />
        <ReactiveButton
          buttonState={buttonStatus}
          idleText="send code"
          loadingText="sending"
          successText="sent"
          errorText="try again"
          onClick={() => sendEmailCode(email)}
          className="rounded-md bg-sky-600 hover:scale-105 transition-all"
          style={{
            borderRadius: "5px",
            "font-weight": "semibold",
          }}
        />
        <button
          className="fix-btn absolute bottom-8 hover:scale-105 transition-all bg-[#0284C7] text-white rounded-md px-4 py-3 font-semibold"
          onClick={() => {
            navigate("/success");
          }}
        >
          view your last code&apos;s data
        </button>
      </div>
    </>
  );
};

export default SendCode;
