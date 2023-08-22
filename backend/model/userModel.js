import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    roll: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    hostel: {
      type: String,
      required: true,
      enum: ['BH1', 'BH2', 'GH1']
    },
    role: {
      type: String,
      enum: ['student', 'admin', 'superAdmin'],
      default: 'student',
      required: true,
    },
    roomNo:{
      type:String,
      default:"",
    },
    branch:{
      type:String,
    },
    batch:{
      type:String,
    },
    bloodGrp:{
      type:String,
      enum:['A+','A-','O+','AB+','AB-']
    }
  },
  { timestamps: true }
);
export default mongoose.model("users", userSchema);
