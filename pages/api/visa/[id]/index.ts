import type { NextApiRequest, NextApiResponse } from "next";
import Blog from "@/models/visa";
import dbConnect from "@/utils/dbConnect";


const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  await dbConnect();

  switch (req.method) {
    case "GET":
      try {
        const { id } = req.query;
        let blog = await Blog.findOne({
          _id: id,
        });

        // const Blogwithrelated = {...Blog , related}
        console.log("RELATED", blog);

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
