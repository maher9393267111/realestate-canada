import auth from "@/utils/auth";
import type { NextApiRequest, NextApiResponse } from "next";
import Blog from "@/models/visa";
import dbConnect from "@/utils/dbConnect";


const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  await dbConnect();
  const user = req.user;
  if (user?.role !== "admin")
    return res.status(403).json({
      message: "You are not authorized to access this resource",
    });

  switch (req.method) {
    case "DELETE":
      try {
        const { id } = req.query;
        await Blog.findByIdAndDelete(id);
        res.status(201).json({ success: true, message: "Blog deleted" });
      } catch (error) {
        res.status(400).json({ success: false, error });
      }
      break;

    case "PUT":
      try {
        const { id } = req.query;
        const data   = req.body;
        await Blog.updateOne(
          {
            _id: id,
          },
         data
        );
        res.status(201).json({ success: true, message: "Blog updated" });
      } catch (error) {
        res.status(400).json({ success: false, error });
      }
      break;

    case "GET":
      try {
        const { id } = req.query;
        const Blogs = await Blog.find({
          category: id,
        }).sort({
            createdAt: -1,
          });

        // Fetch additional related Blogs
        //   const related = await Blog.find({
        //     category: Blog?.category?._id
        // }).sort({viewCount: 'desc'}).limit(4);

        res.status(201).json(Blogs);
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

export default auth(handler);
