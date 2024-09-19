import mongoose from "mongoose";
import User from "./user";
import Category from "./category";

const schema = new mongoose.Schema(
  {
    propertyId: {
      type: String,
      required: [true, "Please Enter Property ID"],
    },

    title: {
      type: String,
      required: true,
      trim: true,
    },

    titlefr: {
      type: String,
      required: true,
      trim: true,
      default: "",
    },

    story: {
      type: String,
      required: true,
      trim: true,
      default: "",
    },

    storyfr: {
      type: String,
      required: true,
      trim: true,
      default: "",
    },

    country: {
      type: String,
      required: true,
      default: 0,
      min: 0,
    },

    city: {
      type: String,
      required: true,
    },

    area: {
      type: String,
      // required: true,
    },

    type: {
      type: String,
      required: true,
    },

    category: {
      type: String,
      required: false,
      default: "",
    },

    constructionYear: {
      type: String,
    },

    condition: {
      type: String,
    },

    reference: {
      type: Number,
    },
    price: {
      type: Number,
      required: true,
      default: 0,
      min: 0,
    },

    rating: {
      type: Number,
      required: false,
      default: 0,
      min: 0,
    },

    cover: String,
    image: { type: [String], default: [] },
    sizes: { type: [String], default: [] },
    featuresPlus: { type: [], default: [] },
    author: String,

    details: {
      areaSqM: {
        type: Number,
        default: 0,
      },
      beds: {
        type: Number,
        required: true,
      },
      baths: {
        type: Number,
        required: true,
        default: 0,
      },

      rooms: {
        type: Number,
        required: true,
        default: 0,
      },

      parkings: {
        type: Number,
        required: true,
        default: 0,
      },
    },

    features: {
      ac: { type: Boolean, default: false },
      balcony: { type: Boolean, default: false },
      tv: { type: Boolean, default: false },
      internet: { type: Boolean, default: false },
      pet: { type: Boolean, default: false },
      bathtub: { type: Boolean, default: false },
    },
    services: {
      isfeatured:{ type: Boolean, default: false },
      resale :{ type: Boolean, default: false },
      lockoff :{ type: Boolean, default: false },

      security: { type: Boolean, default: false },
      cctv: { type: Boolean, default: false },
      elevator: { type: Boolean, default: false },
      pool: { type: Boolean, default: false },
      gym: { type: Boolean, default: false },
      parking: { type: Boolean, default: false },
      garden: { type: Boolean, default: false },
      Furnished: { type: Boolean, default: false },
      airBn: { type: Boolean, default: false },
      balcon: { type: Boolean, default: false },
      golf: { type: Boolean, default: false },
      malls: { type: Boolean, default: false },
      roomservice: { type: Boolean, default: false },
      gezepo: { type: Boolean, default: false },
      animalsallow: { type: Boolean, default: false },
      aircondition: { type: Boolean, default: false },
      beachaccess: { type: Boolean, default: false },
      cock: { type: Boolean, default: false },
      electric: { type: Boolean, default: false },
    },

    coordinate: {
      lat: { type: String },
      lng: { type: String },
    },

    address: {
      type: String,
      required: true,
    },

    // addBy: {
    //   type: mongoose.SchemaTypes.ObjectId,
    //   ref: "User",
    // },
  },
  {
    timestamps: true,
  }
);

schema.virtual("id").get(function () {
  return this._id;
});

schema.statics.paginate = async function ({
  limit = 9,
  page = 1,
  sort = -1,
  where = {},
}) {




  const skip = limit * (page - 1);
  // const books = await this.find({ ...where })
  const books = await this.find({ ...where })
    .limit(limit)
    .skip(skip)
    .sort({ createdAt: sort })
    // .populate({
    //   path: "category",
    //   select: "name nametr",
    //   model: Category,
    // })
    .exec();

  // const pages = Math.ceil((await this.count({ ...where }).exec()) / limit);
  const pages = Math.ceil((await this.countDocuments({ ...where}).exec()) / limit);
  const total = await this.count({}).exec();
  return {
    books,
    pages,
    total,
  };
};

schema.set("toJSON", {
  virtuals: true,
});

export default mongoose.models.Book || mongoose.model("Book", schema);
