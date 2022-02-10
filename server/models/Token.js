const { Schema, model } = require("mongoose");

const schema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, required: true, ref: "User" },
    accessToken: { type: String },
    refreshToken: { type: String },
    expiresIn: { type: Number }
  },
  { timestamps: true }
);

module.exports = model("Token", schema);
