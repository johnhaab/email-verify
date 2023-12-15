// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ReactiveButton from "reactive-button";
import HandleErrorResponse from "../../components/HandleErrorResponse";
import Swal from "sweetalert2";
import axios from "axios";
import "./enter.css";

const EnterCode = () => {
  const [code, setCode] = useState("");
  const [buttonStatus, setButtonStatus] = useState("idle");
  const navigate = useNavigate();

  // Grabbing the correct port for the server.
  const backendPort = import.meta.env.VITE_REACT_APP_BACKEND_PORT;

  const email = localStorage.getItem("emailUsed");

  const verifyCode = async () => {
    setButtonStatus("loading");
    // Function to verify the code provided by the user.

    if (code.length !== 6) {
      setButtonStatus("error");
      // Display error message if the code is not 6 digits.
      // Using Swal package to speed up dev process with alerts.

      Swal.fire({
        position: "center",
        icon: "error",
        title: "Please enter a valid 6-digit code",
        showConfirmButton: true,
        timer: 3000,
        timerProgressBar: true,
      });
      return;
    }

    try {
      // Check the code against the database, searching with the code provided,
      // and with the email saved in localStorage.

      const response = await axios.post(
        `http://localhost:${backendPort}/api/check-code`,
        {
          email,
          code,
        }
      );

      console.log(response);

      if (response.data.success === false) {
        // Display error message if the server response indicates failure
        // Using Swal package to speed up dev process with alerts.

        Swal.fire({
          position: "center",
          icon: "error",
          title: `Whoops! Something went wrong, ${response.data.message} Error code: ${response.error}`,
          showConfirmButton: true,
          timer: 3000,
          timerProgressBar: true,
        });
      } else if (response.data.success === true) {
        HandleErrorResponse(response.data.data);
        navigate("/success");
      }
    } catch (err) {
      setButtonStatus("error");
      HandleErrorResponse(err.response.data);
    }
  };

  return (
    <>
      <div className="flex flex-col justify-center items-center h-screen">
        <button
          className="fix-btn-again transition-all hover:scale-105 absolute top-0 mt-4 bg-[#A6BD87] px-4 py-3 font-semibold text-white rounded-md"
          onClick={() => {
            navigate("/");
          }}
        >
          return to homepage
        </button>
        <div className="flex flex-col justify-center items-center">
          <input
            type="number"
            placeholder="enter your code"
            className="hover:scale-105 transition-all active:scale-105 placeholder:text-zinc-400 border-zinc-400 w-full rounded-md border-2 text-center px-3 py-2.5 font-semibold mb-4"
            onInput={(e) => setCode(e.target.value)}
          />
          <div className="flex justify-between w-full">
            <ReactiveButton
              buttonState={buttonStatus}
              idleText="submit"
              loadingText="checking"
              successText="success"
              errorText="try again"
              onClick={() => verifyCode()}
              style={{
                borderRadius: "5px",
                "font-weight": "semibold",
                "background-color": "rgba(77, 124, 15, 0.5)",
              }}
            />
            <button className="text-[#A6BD87] font-semibold hover:scale-105 transition-all">
              resend
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default EnterCode;
