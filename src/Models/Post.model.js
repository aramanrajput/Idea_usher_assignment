const { Schema, model } = require("mongoose");

const tagSchema = new Schema(
  {
    name: { type: String, reqired: true },
  },
  { _id: false }
);

const postSchema = new Schema(
  {
    title: { type: String, required: true },
    image: { type: String, required: true },
    description: { type: String, required: true },
    author: { type: String, required: true },
    createdAt: { type: Date, required: true },
    updatedAt: { type: Date, required: false },
    tags: [tagSchema],
  },
  { timestamps: true }
);

module.exports = model("Post", postSchema);
