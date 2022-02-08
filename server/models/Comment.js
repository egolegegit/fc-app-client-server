const { Schema, model } = require("mongoose");

const schema = new Schema(
  {
    content: { type: String, required: true },
    //comment page
    pageId: { type: Schema.Types.ObjectId, required: true, ref: "User" },
    //id user comment
    userId: { type: Schema.Types.ObjectId, required: true, ref: "User" }
  },
  { timestamps: { createdAt: "created_at" } }
);

module.exports = model("Comment", schema);
