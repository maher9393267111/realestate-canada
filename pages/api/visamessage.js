import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  port: 465,
  host: "smtp.gmail.com",

  secure: true, // use SSL
  auth: {
    user: "itesa.getViral@gmail.com",
    pass: "rtspkviskcrhorey",
  },
});

async function sendEmail({ name, email, phone, message,country,language,visa }) {
  console.log("SEND????????", name, email, phone, message);
  const defaultYear = new Date().getFullYear();
  const emailOptions = {
    form: email,
    to: ["basma94ghanem@gmail.com"],
    subject: `Contact Message from ${email}`,
    html: `<body style="background: #f3f4f6; padding:0 5px;">
    <div style="max-width: 600px; margin: 0 auto; padding: 20px 0; font-family:Trebuchet MS;">
    <div style="text-align: center; margin-bottom: 20px;">
     <h1 style="color: #000; text-transform: uppercase; font-size: 30px;">You have new contact message from your website</h1>
    </div>
    <div style="padding: 10px; border-radius:5px; background:#fff; -webkit-box-shadow: 0px 0px 3px 1px rgba(0,0,0,0.3); -moz-box-shadow: 0px 0px 3px 1px rgba(0,0,0,0.3); box-shadow: 0px 0px 3px 1px rgba(0,0,0,0.3);">
        <h2 style="text-align: center; text-transform: uppercase; color: teal;">New message</h2>
        <p style="font-size:1rem;"><strong> Name: </strong> ${name}</p>
        <p style="font-size:1rem;"><strong> Email: </strong> ${email}</p>
        <p style="font-size:1rem;"><strong> Phone: </strong> ${phone}</p>
        
        <p style="font-size:1rem;"><strong>Message: </strong> ${message}</p>
        <p style="font-size:1rem;"><strong>Visa type: </strong> ${visa}</p>
        <p style="font-size:1rem;"><strong>Country: </strong> ${country}</p>
        <p style="font-size:1rem;"><strong>Language: </strong> ${language}</p>


     

    
    
    </div>
    </div>
    
    <footer style="text-align: center; padding: 5px 0; color: #000; font-size: 1rem;">
    <h2>Properties Canada Visa Form</h2>
    <p>© ${defaultYear} All rights reserved</p>
    </footer>
    </body>`,
  };

  return transporter.sendMail(emailOptions);
}

export default async function handler(req, res) {
  if (req.method === "POST") {
    console.log("DATA-,", req.body);
    const emailRes = await sendEmail(req.body);
    if (emailRes.messageId) {
      return res.status(200).json({ message: `Email sent successfuly` });
    }

    return res.status(400).json({ message: "Error sending email" });
  }

  return res
    .status(400)
    .json({ message: `Incorrect method: ${req.method}. Did you mean POST?` });
}
