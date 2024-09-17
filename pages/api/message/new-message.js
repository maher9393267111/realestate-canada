

import Message from "@/models/Message";

import auth from "@/utils/auth";

import dbConnect from "@/utils/dbConnect";

async function handler(req, res) {
  await dbConnect();

  const user = req.user;
  console.log('user' , user)
  if (!user)
    return res.status(403).json({
      message: "You are not authorized to access this resource",
    });

  switch (req.method) {
    case "POST":
      try {
const data ={user:user?._id ,...req.body}



        const message = await Message.create(data);

        res.status(200).json({
          success: true,
          message,
        });
      } catch (error) {
        res.status(500).json({
          success: false,
          message: error.message,
        });
      }
      break;
    default:
      res.status(405).json({
        success: false,
        message: "Method not allowed.",
      });
      break;
  }
}

export default auth(handler);
