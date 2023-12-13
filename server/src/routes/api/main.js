const express = require("express");
const emailVerifyCode = require("../../formats/emailVerifyCode");
const { sendMail } = require("../../util/main");
const generateCode = require("../../util/generateCode");
const { PrismaClient } = require("@prisma/client");

require("dotenv").config();

const app = express();
const prisma = new PrismaClient();

app.post("/send-code", async (req, res) => {
  const { email } = req.body;

  const currentTime = new Date();
  const expirationTime = new Date(currentTime.getTime() + 12 * 60 * 60 * 1000);
  const expirationTimestamp = Math.floor(expirationTime.getTime() / 1000);

  const newCode = generateCode();

  console.log(newCode);

  const options = {
    from: "VERIFY CODE <jvhnbiz@gmail.com>", // sender address
    to: email, // receiver email
    subject: "Here is your code!", // Subject line
    code: newCode,
    html: emailVerifyCode(newCode),
  };

  try {
    const code = await prisma.code.create({
      data: {
        email: email,
        code: newCode,
        expirationTime: expirationTimestamp,
      },
    });
    sendMail(options, (info) => {
      console.log("Email sent successfully");
      console.log("MESSAGE ID: ", info.messageId);

      res.json({ success: true, id: info.messageId, code: newCode });
    });
  } catch (err) {
    if (err.code === "P2002") {
      // The .code property can be accessed in a type-safe manner
      console.log(
        "There is a unique constraint violation, a new user cannot be created with this email"
      );
      res.json({
        success: false,
        error:
          "There is a unique constraint violation, a new user cannot be created with this email",
      });
    } else {
      // Handle other errors or rethrow them
      throw err;
    }
  }
});

module.exports = app;
