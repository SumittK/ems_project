const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,

  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASSWORD,
  },

  tls: {
    rejectUnauthorized: false,
  },
});

const sendEmail = async ({
  receiverEmail,
  mailContent = `Thank you for registering with EMS API`,
}) => {
  try {
    const info = await transporter.sendMail({
      from: "sumit.ted@gmail.com",
      to: `${receiverEmail}`,
      subject: "Welcome to My App",
      html: `
    <div style="font-family: Arial; padding: 20px;">
      <h2>Welcome to My App 🚀</h2>
      <p>Hello User,</p>
      
      <p>${mailContent}</p>

      <button 
        style="
          background-color:#007bff;
          color:white;
          border:none;
          padding:10px 20px;
          border-radius:5px;
        ">
        Get Started
      </button>

      <p style="margin-top:20px;">
        Regards,<br/>
        My App Team
      </p>
    </div>
  `,
    });
    console.log(info);
  } catch (err) {
    console.log(err);
  }
};

module.exports = sendEmail;
