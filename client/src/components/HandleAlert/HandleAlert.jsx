import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

/**
 * This component uses the toast function from the react-toastify
 * library to display a notification on the screen.
 *
 * @param {string} type - The type of alert to display eg. "error".
 * @param {string} input - The data needed to send an alert with the error message and id.
 */

const HandleAlert = (type, input) => {
  return (
    <>
      {toast[type](`${input}`, {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      })}
    </>
  );
};

export default HandleAlert;
