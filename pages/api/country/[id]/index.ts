import type { NextApiRequest, NextApiResponse } from "next";
import Blog from "@/models/country";
import dbConnect from "@/utils/dbConnect";
import mongoose from 'mongoose';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  await dbConnect();

  switch (req.method) {
    case "GET":
      try {
        const { id } = req.query;
        console.log("IDDDDD" , req?.query?.id)

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ success: false, message: "Invalid ID format" });
          }



        let blog = await Blog.findOne({
          _id: id,
        });

        // const Blogwithrelated = {...Blog , related}
        console.log("RELATED AS:ALS", blog);

        res.status(200).json({ book:blog });
      } catch (error) {
        console.log(error);
        res.status(400).json({ success: false, error });
      }
      break;

    default:
      res.status(405).json({ success: false, message: "Method not allowed" });
      break;
  }
};

export default handler;
