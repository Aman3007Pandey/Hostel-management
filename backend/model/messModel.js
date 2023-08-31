import mongoose from "mongoose";

const messSchema = new mongoose.Schema(
  {
    day:{type:String,required:true}, 
    mealTime:{type:Number,required:true} ,
    food:[{type:String}],
  },
  { timestamps: true }
);

messSchema.index({day:1,mealTime:1},{unique:true});

export default mongoose.model("mess", messSchema);