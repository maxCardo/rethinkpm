const mongoose = require("mongoose");

const leaseLeadSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  fullName: String,
  email: [
    {
      address: String,
      isPrimary: Boolean,
    },
  ],
  phoneNumbers: [
    {
      number: String,
      isPrimary: Boolean,
      okToText: Boolean,
    },
  ],
  notes: [
    {
      type: {
        type: String,
      },
      content: {
        type: String,
      },
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
      date: {
        type: Date,
        default: Date.now,
      },
    },
  ],
  status: {
    type: String,
    enum: ["new", "lost"],
    default: "new",
  },
  reasonForLoss: String,
  leadOwner: {
    type: String,
    default: "System",
  },
  leadSource: String,
  leadTemperature: {
    type: String,
    enum: ["hot", "warm", "cold", ""],
    default: "",
  },
  createDate: {
    type: Date,
    default: new Date(),
  },
  updateDate: {
    type: Date,
    default: new Date(),
  },
  leadDate: {
    type: Date,
    default: new Date(),
  },
  isEnabled: {
    type: Boolean,
    default: true,
  },
  lastContact: Date,
  nextAction: Date,
  listingAddress: String,
  listing: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Listing",
    },
  ],
});

module.exports = mongoose.model("LeaseLead", leaseLeadSchema);
