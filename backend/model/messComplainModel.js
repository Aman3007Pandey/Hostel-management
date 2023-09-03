import mongoose, { Schema } from "mongoose";

const messComplainSchema = new mongoose.Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      required: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    hostel: {
      type: String,
      required: true,
      enum: ["BH1", "BH2", "GH1"],
    },
    email: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    desc: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    date: {
      type: String,
      required: true,
    },
    assigned: {
      type: String,
      required: true,
      enum: ["messComitee","admin", "student", "superAdmin"],
      default: "messComitee",
    },
  },
  { timestamps: true }
);
export default mongoose.model("mess-complains", messComplainSchema);
