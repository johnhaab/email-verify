const express = require("express");
const emailVerifyCode = require("../../formats/emailVerifyCode");
const { sendMail } = require("../../util/main");
const generateCode = require("../../util/generateCode");
const { PrismaClient } = require("@prisma/client");

require("dotenv").config();

const app = express();
const prisma = new PrismaClient();

app.set("trust proxy", true);

// Endpoint to send a verification code to the user's email
app.post("/send-code", async (req, res) => {
  // Extract email from the request body
  const { email } = req.body;

  // Generate a new verification code and set its expiration time
  const currentTime = new Date();
  const expirationTime = new Date(currentTime.getTime() + 12 * 60 * 60 * 1000);
  const expirationTimestamp = Math.floor(expirationTime.getTime() / 1000);
  const newCode = generateCode();

  // Email options including sender, receiver, subject, code, and HTML content
  const options = {
    from: `Email-Verify <${process.env.SMTP_GMAIL}>`,
    to: email,
    subject: "Here is your code!",
    code: newCode,
    html: emailVerifyCode(newCode),
  };

  try {
    // Create a new code record in the database
    const code = await prisma.code.create({
      data: {
        email: email,
        code: newCode,
        expirationTime: expirationTimestamp,
      },
    });

    // Send the verification email
    sendMail(options, (info) => {
      // Respond with success and message ID
      res.json({ success: true, id: info.messageId, code: newCode });
    });
  } catch (err) {
    if (err.code === "P2002") {
      // Handle unique constraint violation for email
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

// Endpoint to check the entered verification code
app.post("/check-code", async (req, res, next) => {
  const { code, email } = req.body;

  if (!code) {
    // Respond with an error if no code is provided
    res
      .status(404)
      .send({ success: false, message: "No code provided", error: 4 });
  } else if (!email || email.length === 0) {
    // Respond with an error if no email is found
    res.status(404).send({
      success: false,
      message: "No email found, try resending the email.",
    });
  } else {
    try {
      // Retrieve the code record from the database
      const result = await prisma.code.findUnique({
        where: {
          code: parseInt(code),
          email: email,
        },
      });

      if (result.active === false) {
        // Respond with an error if the code has already been used or expired
        res.status(404).send({
          success: false,
          message: "This code has already been used or expired.",
        });
        return;
      }

      if (result.expirationTime === 0) {
        // Respond with an error if the code has already been used or expired
        res.status(404).send({
          success: false,
          message: "This code has already been used or expired.",
        });
        return;
      }

      if (result !== null) {
        // Get the client's IP address from the X-Forwarded-For header
        const ipAddress = req.socket.remoteAddress;

        // Update the code record to mark it as inactive and set expiration time to 0
        await prisma.code.update({
          where: {
            code: parseInt(code),
          },
          data: {
            active: false,
            expirationTime: 0,
            activatedIp: ipAddress,
          },
        });

        // Respond with success and the code record data
        res.json({
          success: true,
          message: "Code activated successfully",
          data: result,
        });
      } else {
        // Respond with an error if an unexpected error occurs
        res.json({
          success: false,
          message: "Unexpected error, please try again",
        });
      }
    } catch (err) {
      // Log and respond with a generic server error
      console.log(err);
      res
        .status(500)
        .json({ success: false, message: "Internal Server Error" });
    }
  }
});

module.exports = app;
