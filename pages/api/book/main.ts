//@ts-nocheck
import type { NextApiRequest, NextApiResponse } from "next";
import Book from "@/models/book";
import dbConnect from "@/utils/dbConnect";
import { query } from "firebase/firestore";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  await dbConnect();

  switch (req.method) {
    case "GET":
      try {
        const {
          page = 1,
          sort = 1,
          country = "",
          city = "",
          limit = 6,
          search = "",
          isfeatured= "",
          rooms,
          baths,
          beds,
          type,
          minPrice,
          maxPrice,
        } = req.query;
        const where = {};

        if (parseInt(rooms) !== 0) {
          //$gte: parseInt(rooms)  , $eq: parseInt(rooms)
          where["details.rooms"] = { $gte: parseInt(rooms) }; //rooms
        }

        if (parseInt(baths) !== 0) {
          where["details.baths"] = { $gte: parseInt(baths) }; // baths
        }

        if (parseInt(beds) !== 0) {
          where["details.beds"] = { $gte: parseInt(beds) }; // baths
        }

        if ([type] && type !== "") {
          where["type"] = type;
        }

        where["price"] = { $gte: parseInt(minPrice), $lte: parseInt(maxPrice) };

        // if (maxPrice) {
        //   where["price"] = {  $lte: parseInt(maxPrice) }
        // }

        if (search && search !== "") {
          where["title"] = { $regex: search, $options: "i" };
        }


        if (isfeatured && isfeatured !== "") {
          where["services.isfeatured"]= isfeatured === 'true' ? true : false;
        }


        // if (category && category !== "") {
        //   where["category"] = category;
        // }

        if (city && city !== "") {
          where["city"] = city;
        }

        if (country && country !== "") {
          where["country"] = country;
        }

        console.log("here", where, req.query);

        const { books, pages } = await Book.paginate({
          page,
          limit,
          sort,
          where,
        });
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
