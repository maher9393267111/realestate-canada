import mongoose from "mongoose";

const schema = new mongoose.Schema(
  {
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

    image: { type: [String], default: [] },

    author: String,
    category: String,

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
  const books = await this.find({ ...where })
    .limit(limit)
    .skip(skip)
    .sort({ createdAt: 1 })
    // .populate({
    //   path: "category",
    //   select: "name nametr",
    //   model: Category,
    // })
    .exec();

  const pages = Math.ceil((await this.count({ ...where }).exec()) / limit);
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

export default mongoose.models.Visa || mongoose.model("Visa", schema);
