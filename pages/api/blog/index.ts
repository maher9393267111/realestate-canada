import auth from "@/utils/auth";
import type { NextApiRequest, NextApiResponse } from "next";
import Blog from "@/models/blog";
import Order from "@/models/order";
import dbConnect from "@/utils/dbConnect";
import { features } from "process";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  await dbConnect();
  const user = req.user;




  if (user?.role !== "admin" && user?.name !== 'staff') {
    return res.status(403).json({
        message: "You are not authorized to access this resource",
    });
}

  switch (req.method) {
    case "POST":
      try {
   const data = req.body
   console.log("DAYA" , data)
        const newBlog = await Blog.create(
          data
        );
        res.status(201).json(newBlog._id);
      } catch (error) {
        res.status(400).json({ success: false, error });
      }
      break;
    default:
      res.status(405).json({ success: false, message: "Method not allowed" });
      break;
  }
};

export default auth(handler);
