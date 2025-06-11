const { Schema, model } = require("mongoose");

const reviewSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, "Este campo es obligatorio"],
    },
    text: {
      type: String,
      required: [true, "Este campo es obligatorio"],
      minlength: 15,
    },
    score: {
      type: Number,
      required: [true, "Este campo es obligatorio"],
      enum: ["1", "2", "3", "4", "5"],
    },
    creator: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    ad: {
      type: Schema.Types.ObjectId,
      ref: "Ad",
    },
  },
  {
    // this second object adds extra properties: `createdAt` and `updatedAt`
    timestamps: true,
  }
);

const Review = model("Reviem", reviewSchema);
module.exports = Review;
