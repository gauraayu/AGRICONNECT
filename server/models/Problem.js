const mongoose = require("mongoose");

const replySchema = new mongoose.Schema({
  text:      { type: String, required: true },
  author:    String,
  role:      String,
  upvotes:   { type: Number, default: 0 },
  downvotes: { type: Number, default: 0 },
  repliedAt: { type: Date,   default: Date.now },
});

const problemSchema = new mongoose.Schema(
  {
    title:       { type: String, required: true },
    description: { type: String, required: true },
    category:    String,
    urgency:     String,
    location:    String,
    cropName:    String,

    photo:       [String],   // Array of S3 URLs

    farmerName:  String,
    farmerEmail: String,
    farmerId:    String,
    farmerRole:  String,

    status:      { type: String, default: "open" },
    replies:     [replySchema],

    likes:       { type: Number, default: 0 },
    upvotes:     { type: Number, default: 0 },
    downvotes:   { type: Number, default: 0 },
    views:       { type: Number, default: 0 },

    postedAt:    { type: Date,   default: Date.now },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Problem", problemSchema);