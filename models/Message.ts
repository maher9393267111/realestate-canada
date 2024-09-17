import mongoose from "mongoose";

const MessageSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },
        email: {
            type: String,
            required: true
        },
        phone: {
            type: String,
            required: true
        },
        message: {
            type: String,
            required: true
        },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        readed: {
            type: Boolean,
            default: false
        },
    },
    { timestamps: true }
);

MessageSchema.virtual("id").get(function () {
    return this._id;
  });
  
  MessageSchema.statics.paginate = async function ({
    limit = 9,
    page = 1,
    sort = -1,
    where = {},
  }) {
    const skip = limit * (page - 1);
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
  
    const pages = Math.ceil((await this.count({ ...where }).exec()) / limit);
    const total = await this.count({}).exec();
    return {
      books,
      pages,
      total,
    };
  };
  
  MessageSchema.set("toJSON", {
    virtuals: true,
  });

export default mongoose.models.Message ||
    mongoose.model("Message", MessageSchema);