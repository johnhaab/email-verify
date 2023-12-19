import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

/**
 * Simple handler for errors, still needs some work to get it to where
 * i want it to be. See the kaban board for more information.
 *
 * @param {string} input - The data needed to send an alert with the error message and id.
 */

const HandleErrorResponse = (input) => {
  console.log(input);

  return (
    <>
      {toast.error(`${input}`, {
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

export default HandleErrorResponse;
