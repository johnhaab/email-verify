import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

/**
 * Simple handler for success, still needs some work to get it to where
 * I want it to be. See the kanban board for more information.
 *
 * @param {string} codeData - The data needed to store the info in localStorage.
 * @param {string} input - The input for the toast message.
 */

const HandleSuccessResponse = (codeData, input, navigate) => {
  console.log(codeData)
  localStorage.setItem("lastId", codeData.id);
  localStorage.setItem("lastCode", codeData.code);
  localStorage.setItem("lastActive", codeData.active);
  localStorage.setItem("lastActiveIp", codeData.activatedIp);
  localStorage.setItem("lastCreatedAt", codeData.createdAt);
  localStorage.setItem("lastExpirationTime", codeData.expirationTime);

  const handleToastClose = () => {
    console.log(`Alert closed`);
    navigate('/success');
  };

  return (
    <>
      {toast.success(`${input}`, {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        onClose: () => handleToastClose(),
      })}
    </>
  );
};

export default HandleSuccessResponse;
