const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const generateCode = async () => {
  const minNumber = 100000;
  const maxNumber = 999999;

  const randomNumber = Math.floor(
    Math.random() * (maxNumber - minNumber) + minNumber
  );

  return randomNumber;
};

module.exports = generateCode;
