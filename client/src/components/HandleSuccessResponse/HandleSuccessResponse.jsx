// Function to handle success responses, storing the result
// in localStorage for later use.

const HandleSuccessResponse = (codeData) => {
  localStorage.setItem("lastId", codeData.id);
  localStorage.setItem("lastCode", codeData.code);
  localStorage.setItem("lastActive", codeData.active);
  localStorage.setItem("lastActiveIp", codeData.activatedIp);
  localStorage.setItem("lastCreatedAt", codeData.createdAt);
  localStorage.setItem("lastExpirationTime", codeData.expirationTime);
};

export default HandleSuccessResponse;
