const { urlencoded } = require("express");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const marketSchema = new Schema (
  {
    name: String,
    address: String,
    dates: String,
    hours: String,
    wares: String,
  },
  { timestamps: true }
);

const Market = mongoose.model("Market", marketSchema);
module.exports = Market;