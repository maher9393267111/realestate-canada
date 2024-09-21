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
      // trim: true,
    },

    storyfr: {
      type: String,
      required: true,
      // trim: true,
      // default: "",
    },

    cover: {
      type: String,
      required: true,

      default: "",
    },
  },
  {
    timestamps: true,
  }
);

schema.virtual("id").get(function () {
  return this._id;
});

schema.set("toJSON", {
  virtuals: true,
});

export default mongoose.models.Country || mongoose.model("Country", schema);
