const express = require("express");
const nodemailer = require("nodemailer");
const Contact = require("../models/Contact");

const router = express.Router();

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "allenareworksheet@gmail.com", // Fixed email for sending emails
    pass: "mnsd txog yexj nnma", // App password for authentication
  },
});

// Route to handle contact form submission
router.post("/submit", async (req, res) => {
  const { name, email, phone, message } = req.body;
  const newContact = new Contact({ name, email, phone, message });

  try {
    
    // Mail options with variable sender email and fixed recipient email
    const mailOptions = {
      from: email, // Dynamic sender email
      to: "allenareworksheet@gmail.com", // Fixed recipient email
      subject: "Query",
      html: `
        <h2>Mail - ${email}</h2>
        <h3>Name - ${name}</h3>
        <h3>Contact No. - ${phone}</h3>
        <p>${message}</p>
      `,
    };

    const mailOption = {
      from: "allenareworksheet@gmail.com", // Dynamic sender email
      to: email, // Fixed recipient email
      subject: "Contact Us",
      html: `
        <h2>Thank You for Contacting Us. We'll be refering back to you.</h2>
      `,
    };

    // Send email and update in databse
    await Promise.all([
        transporter.sendMail(mailOptions),
        transporter.sendMail(mailOption),
        newContact.save()
    ]);

    // await transporter.sendMail(mailOptions);
    // await newContact.save();

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
