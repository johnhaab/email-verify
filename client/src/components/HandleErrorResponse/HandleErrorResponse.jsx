import Swal from "sweetalert2";

const HandleErrorResponse = (errorData) => {
  // Function to handle error responses.

  Swal.fire({
    position: "center",
    icon: "error",
    title: `Whoops! Something went wrong, ${errorData.message} Error code: ${errorData.error}`,
    showConfirmButton: true,
    timer: 3000,
    timerProgressBar: true,
  });
};

export default HandleErrorResponse;
