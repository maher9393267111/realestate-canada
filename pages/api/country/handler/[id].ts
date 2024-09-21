
import auth from "@/utils/auth";
import type { NextApiRequest, NextApiResponse } from "next";
import Country from "@/models/country";
import dbConnect from "@/utils/dbConnect";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  await dbConnect();
  const user = req.user;

  if (user?.role !== "admin") {
    return res.status(403).json({
      message: "You are not authorized to access this resource",
    });
  }

  const { id } = req.query;

  switch (req.method) {
    // case "GET":
    //   try {
    //     const { id } = req.query;
    //     let blog = await Country.findOne({
    //       _id: id,
    //     });

    //     // const Blogwithrelated = {...Blog , related}
    //     console.log("RELATED AS:ALS", blog);

    //     res.status(200).json({ book:blog });
    //   } catch (error) {
    //     console.log(error);
    //     res.status(400).json({ success: false, error });
    //   }

    case "DELETE":
      try {
        await Country.findByIdAndDelete(id);
        return res.status(200).json({ success: true });
      } catch (error) {
        return res.status(400).json({ success: false, error });
      }

    case "PUT":
      try {
        const { title, titlefr, cover ,  story,
          storyfr } = req.body;

console.log("REQ" , req.body)

        await Country.updateOne({ _id: id },req.body);
        return res.status(200).json({ success: true, message: "Country updated!" });
      } catch (error) {
        return res.status(400).json({ success: false, error });
      }

    default:
      return res.status(405).json({ success: false, message: "Method not allowed" });
  }
};

export default auth(handler);



// import auth from "@/utils/auth";
// import type { NextApiRequest, NextApiResponse } from "next";
// import Country from "@/models/country";
// import Book from "@/models/book";
// import dbConnect from "@/utils/dbConnect";

// const handler = async (req: NextApiRequest, res: NextApiResponse) => {
//   await dbConnect();
//   const user = req.user;
//   if (user?.role !== "admin")
//     return res.status(403).json({
//       message: "You are not authorized to access this resource",
//     });

//   switch (req.method) {

//     case "GET":
//       try {
//         const { id } = req.query;
//         const country = await Country.findById(id);
//         if (!country) {
//           return res.status(404).json({ success: false, message: "Country not found" });
//         }
//         res.status(200).json({ success: true, data: country });
//       } catch (error) {
//         res.status(400).json({ success: false, error });
//       }



//     case "DELETE":
//       try {
//         const { id } = req.query;
//         await Country.findByIdAndDelete(id);
        
//         res.status(200).json({ success: true });
//       } catch (error) {
//         res.status(400).json({ success: false, error });
//       }
//       break;
//     case "PUT":
//       try {
//         const { id } = req.query;
//         const { title , titlefr , cover} = req.body;
//         await Country.updateOne({ _id: id }, { title , titlefr ,cover });
//         res.status(200).json({ success: true, message: "Country updated !" });
//       } catch (error) {
//         res.status(400).json({ success: false, error });
//       }
//       break;
//     default:
//       res.status(405).json({ success: false, message: "Method not allowed" });
//       break;
//   }
// };

// export default auth(handler);
