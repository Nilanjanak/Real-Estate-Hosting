// const express = require("express");
// const Enquiry = require("../models/Enquiry");

// const router = express.Router();

// // Route to handle Enquiry form submission
// router.post("/submit", async (req, res) => {
//   const { name, email, phone, message, product, quantity } = req.body;

//   try {
//     // Create a new Enquiry entry
//     const newEnquiry = new Enquiry({ name, email, phone, message, product, quantity });

//     // Save it to the database
//     await newEnquiry.save();

//     // Send a success response
//     res
//       .status(201)
//       .json({ message: "Your enquiry has been registered successfully, we'll contact you shortly." });
//   } catch (err) {
//     console.error("Error saving Enquiry:", err);
//     res
//       .status(500)
//       .json({
//         message:
//           "There was an error submitting your message. Please try again later.",
//       });
//   }
// });

// module.exports = router;


const express = require("express");
const nodemailer = require("nodemailer");

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
  const { name, email, phone, address, product, quantity } = req.body;

  try {
    // Mail options with variable sender email and fixed recipient email
    const mailOptions = {
      from: email, // Dynamic sender email
      to: "allenareworksheet@gmail.com", // Fixed recipient email
      subject: "Enquiry",
      html: `
        <h2>Mail - ${email}</h2>
        <h3>Name - ${name}</h3>
        <h3>Contact No. - ${phone}</h3>
        <h3>Product name - ${product}</h3>
        <h3>Quantity - ${quantity}</h3>
        <p>Address - ${address}</p>
      `,
    };
    
    const mailOption = {
      from: "allenareworksheet@gmail.com", // Dynamic sender email
      to: email, // Fixed recipient email
      subject: "Enquiry",
      html: `
        <h1>Thank You for Contacting Us. We'll be refering back to you soon with all the details.</h1>
      `,
    };

    // Send email and update in databse
    await Promise.all([
        transporter.sendMail(mailOptions),
        transporter.sendMail(mailOption),
        newContact.save()
    ]);

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

