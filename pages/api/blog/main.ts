//@ts-nocheck
import type { NextApiRequest, NextApiResponse } from "next";
import Blog from "@/models/blog";
import dbConnect from "@/utils/dbConnect";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  await dbConnect();

  switch (req.method) {
    case "GET":
      try {
        const {
          page = 1,
          sort = 1,

          limit = 6,
          search = "",
          country = "",
        } = req.query;
        const where = {};

        // if (search && search !== "") {
        //   where["title"] = { $regex: search, $options: "i" };
        // }


        if (search && search !== "") {
          where["$or"] = [
            { title: { $regex: search, $options: "i" } },
            { titlefr: { $regex: search, $options: "i" } }
          ];
        }


        if (country && country !== "") {
          where["category"] = { $regex: country, $options: "i" };
          // where["category"] = country;
        }


        console.log("WHEREE BLOGS" , where)



        const { books, pages } = await Blog.paginate({
          page,
          limit,
          sort,
          where,
        });

        console.log("where", where, req.query);

        res.status(200).json({ books, pages });
      } catch (error) {
        console.error(error?.message);
        res.status(400).json({ success: false, error });
      }
      break;
    default:
      res.status(405).json({ success: false, message: "Method not allowed" });
      break;
  }
};

export default handler;
