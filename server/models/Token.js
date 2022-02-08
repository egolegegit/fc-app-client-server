const { Schema, model } = require("mongoose");

const schema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, required: true, ref: "User" },
    accessToken: { type: String },
    refreshToken: { type: String },
    exporesIn: { type: Number }
  },
  { timestamps: true }
);

module.exports = model("Token", schema);
