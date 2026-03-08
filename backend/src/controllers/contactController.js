const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
});

exports.sendContactMail = async (req, res) => {
  try {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const mailOptions = {
      from: `"${name}" <${process.env.MAIL_USER}>`,
      to: process.env.RECEIVER_MAIL,
      replyTo: email,
      subject: `New Contact Message from ${name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #0D9488;">New Contact Form Message</h2>
          <hr style="border-color: #E5E7EB;" />
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Message:</strong></p>
          <p style="background: #F9FAFB; padding: 15px; border-radius: 8px;">${message}</p>
          <hr style="border-color: #E5E7EB;" />
          <p style="color: #6B7280; font-size: 12px;">Sent from DentalCare Contact Form</p>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);
    res.json({ message: "Message sent successfully!" });
  } catch (error) {
    console.error("Mail error:", error);
    res
      .status(500)
      .json({ message: "Failed to send message. Please try again later." });
  }
};
