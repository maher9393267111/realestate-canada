import type { NextApiRequest, NextApiResponse } from "next";
import Book from "@/models/book";
import dbConnect from "@/utils/dbConnect";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "GET") {
    return res.status(405).json({ success: false, message: "Method not allowed" });
  }

  try {
    await dbConnect();

    const {
      page = "1",
      sort = "1",
      country = "",
      city = "",
      limit = "6",
      search = "",
      isfeatured = "",
      rooms = "0",
      baths = "0",
      beds = "0",
      type = "",
      minPrice = "0",
      maxPrice = "1000000000", // Set a high default max price
      condition = "",
      resale = "",
      lockoff = ""
    } = req.query;

    const where: Record<string, any> = {};

    const addNumericFilter = (field: string, value: string, operator = "$gte") => {
      const numValue = parseInt(value);
      if (numValue !== 0) {
        where[field] = { [operator]: numValue };
      }
    };

    const addBooleanFilter = (field: string, value: string) => {
      if (value !== "") {
        where[field] = value === 'true';
      }
    };

    addNumericFilter("details.rooms", rooms as string);
    addNumericFilter("details.baths", baths as string);
    addNumericFilter("details.beds", beds as string);
    addNumericFilter("price", minPrice as string, "$gte");
    addNumericFilter("price", maxPrice as string, "$lte");

    if (type) where["type"] = type;
    if (search) where["title"] = { $regex: search, $options: "i" };
    if (city) where["city"] = city;
    if (country) where["country"] = country;
    if (condition) where["condition"] = condition;

    addBooleanFilter("services.isfeatured", isfeatured as string);
    addBooleanFilter("services.resale", resale as string);
    addBooleanFilter("services.lockoff", lockoff as string);

    const { books, pages } = await Book.paginate({
      page: parseInt(page as string),
      limit: parseInt(limit as string),
      sort: parseInt(sort as string),
      where,
    });

    res.status(200).json({ books, pages });
  } catch (error) {
    console.error(error);
    res.status(400).json({ success: false, error: (error as Error).message });
  }
};

export default handler;

// //@ts-nocheck
// import type { NextApiRequest, NextApiResponse } from "next";
// import Book from "@/models/book";
// import dbConnect from "@/utils/dbConnect";
// import { query } from "firebase/firestore";

// const handler = async (req: NextApiRequest, res: NextApiResponse) => {
//   await dbConnect();

//   switch (req.method) {
//     case "GET":
//       try {
//         const {
//           page = 1,
//           sort = 1,
//           country = "",
//           city = "",
//           limit = 6,
//           search = "",
//           isfeatured= "",
//           rooms,
//           baths,
//           beds,
//           type,
//           minPrice,
//           maxPrice,
//           condition,
//           resale,
//           lockoff
//         } = req.query;
//         const where = {};

//         if (parseInt(rooms) !== 0) {
//           //$gte: parseInt(rooms)  , $eq: parseInt(rooms)
//           where["details.rooms"] = { $gte: parseInt(rooms) }; //rooms
//         }

//         if (parseInt(baths) !== 0) {
//           where["details.baths"] = { $gte: parseInt(baths) }; // baths
//         }

//         if (parseInt(beds) !== 0) {
//           where["details.beds"] = { $gte: parseInt(beds) }; // baths
//         }

//         if ([type] && type !== "") {
//           where["type"] = type;
//         }

//         where["price"] = { $gte: parseInt(minPrice), $lte: parseInt(maxPrice) };

//         // if (maxPrice) {
//         //   where["price"] = {  $lte: parseInt(maxPrice) }
//         // }

//         if (search && search !== "") {
//           where["title"] = { $regex: search, $options: "i" };
//         }


//         if (isfeatured && isfeatured !== "") {
//           where["services.isfeatured"]= isfeatured === 'true' ? true : false;
//         }


//         if (resale && resale !== "") {
//           where["services.resale"]= resale === 'true' ? true : false;
//         }

//         if (lockoff && lockoff !== "") {
//           where["services.lockoff"]= lockoff === 'true' ? true : false;
//         }



//         // if (category && category !== "") {
//         //   where["category"] = category;
//         // }

//         if (city && city !== "") {
//           where["city"] = city;
//         }

//         if (country && country !== "") {
//           where["country"] = country;
//         }

//         if (condition && condition !== "") {
//           where["condition"] = condition;
//         }

//         console.log("here", where, req.query);

//         const { books, pages } = await Book.paginate({
//           page,
//           limit,
//           sort,
//           where,
//         });
//         res.status(200).json({ books, pages });
//       } catch (error) {
//         console.error(error?.message);
//         res.status(400).json({ success: false, error });
//       }
//       break;
//     default:
//       res.status(405).json({ success: false, message: "Method not allowed" });
//       break;
//   }
// };

// export default handler;
