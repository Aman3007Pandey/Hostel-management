import mongoose from 'mongoose';
const roomSchema=new mongoose.Schema({
  roomNo:{
    type:String,
    required:true,
    unique:false,
  },
  roomUser:[{
    name:{type:String},
    userId:{
        type:mongoose.Schema.ObjectId,
        ref:"users"
    },
  }],
  hostel:{
    type:String,
    required:true,
    unique:false,
  }
    
});

roomSchema.index({roomNo:1,hostel:1},{unique:true});

export default mongoose.model("Room", roomSchema);