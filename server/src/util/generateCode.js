// This function generates a random 6 didit code, eventually
// i want to make it check the code against the DB to make sure
// it isnt taken to deal with the problem in the server instead
// of the client.

const generateCode = () => {
  const minNumber = 100000;
  const maxNumber = 999999;

  const randomNumber = Math.floor(
    Math.random() * (maxNumber - minNumber) + minNumber
  );

  return randomNumber;
};

module.exports = generateCode;
