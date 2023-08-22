import Room from '../model/roomModel.js';
import User from "../model/userModel.js";
export const newRoom=async(req,res)=>{
    
    const {roomNo,hostel}=req.body;
    const room=await Room.create({roomNo,hostel,roomUser:[]})
    
    res.status(201).json({
    success: true,
    room,
  });
}

export const  getAllRoom=async(req,res)=>{
    
    const hostel=res.locals.hostel;
    const rooms=await Room.find({hostel});
    console.log(hostel);
    if(!rooms)
    {
        return res.status(404).json({success:false,message:"Hostel Not Availaible"});
    }

    res.status(201).json({
    success: true,
    rooms,
    });
   
}

export const  getAllRoomForUser=async(req,res)=>{
    
    const {userId}=req.params;
    const user=await User.findById(userId);
    const hostel=user.hostel;
    
    const rooms=await Room.find({hostel});
    
    console.log(hostel);
    if(!rooms)
    {
        return res.status(404).json({success:false,message:"Hostel Not Availaible"});
    }

    res.status(201).json({
    success: true,
    rooms,
    });
   
}

export const getRoom=async(req,res)=>{
    
    const {id}=req.params;
    const room=await Room.findById(id);
    
    if(!room)
    {
        return res.status(404).json({success:false,message:"Room Not Found"})
    }

    res.status(201).json({
    success: true,
    room,
    });
   
}