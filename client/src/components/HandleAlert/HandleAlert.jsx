import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

/**
 * This component uses the toast function from the react-toastify
 * library to display a notification on the screen.
 *
 * @param {string} type - The type of alert to display eg. "error".
 * @param {string} input - The data needed to send an alert with the error message and id.
 */

const HandleAlert = (type, input, codeData) => {
  codeData !== undefined
    ? (localStorage.setItem("lastId", codeData.id),
      localStorage.setItem("lastCode", codeData.code),
      localStorage.setItem("lastActive", codeData.active),
      localStorage.setItem("lastActiveIp", codeData.activatedIp),
      localStorage.setItem("lastCreatedAt", codeData.createdAt),
      localStorage.setItem("lastExpirationTime", codeData.expirationTime))
    : null;

  const toastTypes = {
    error: toast.error,
    success: toast.success,
    info: toast.info,
    warn: toast.warn,
  };

  const toastOptions = {
    position: "top-center",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "colored",
  };

  const toastFunction = toastTypes[type];
  if (toastFunction) {
    toastFunction(input, toastOptions);
  }
};

export default HandleAlert;
