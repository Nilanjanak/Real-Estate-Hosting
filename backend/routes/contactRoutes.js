const express = require("express");
const nodemailer = require("nodemailer");

const router = express.Router();

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "nilanjan.ak143@gmail.com", // Fixed email for sending emails
    pass: "obuk znxt rvaj euvs", // App password for authentication
  },
});

// Route to handle contact form submission
router.post("/submit", async (req, res) => {
  const { name, email, phone, message } = req.body;

  try {
    // Mail options with variable sender email and fixed recipient email
    const mailOptions = {
      from: email, // Dynamic sender email
      to: "nilanjan.ak143@gmail.com", // Fixed recipient email
      subject: "Query",
      html: `
        <h2>Mail - ${email}</h2>
        <h3>Name - ${name}</h3>
        <h3>Contact No. - ${phone}</h3>
        <p>${message}</p>
      `,
    };

    // Send email
    await transporter.sendMail(mailOptions);

    // Respond with success message
    res
      .status(201)
      .json({ message: "Your message has been submitted successfully." });
  } catch (err) {
    console.error("Error sending email:", err);
    res.status(500).json({ message: "Error sending email" });
  }
});

module.exports = router;
