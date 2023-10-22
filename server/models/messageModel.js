const mongoose = require("mongoose");

// Defining a Mongoose schema for the 'Message' model.
const MessageSchema = mongoose.Schema(
  {
    message: {
      text: { type: String, required: true },
    },
    users: Array,
    sender: {
      type: mongoose.Schema.Types.ObjectId,//A field to store the sender's user ID.
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,//Automatically adds 'createdAt' and 'updatedAt' timestamps to each document.
  }
);

module.exports = mongoose.model("Messages", MessageSchema);
