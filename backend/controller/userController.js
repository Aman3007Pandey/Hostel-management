import Room from '../model/roomModel.js';
import User from '../model/userModel.js';

export const getUser=async(req,res)=>{
    
    const {id}=req.params;
    const user=await User.findById(id);

    return res.status(200).json({
        success:true,
        user,
    })
}
export const userRoomAllotment=async(req,res)=>{
    
    const{roomId}=req.params;
    const {userId}=req.body;
    
    console.log(userId);
    
    if(!userId)
    {
        return res.status(500).json({success:false,message:"Please Login"});
    }
     
    let room=await Room.findById(roomId);
    let user=await User.findById(userId);


    if(user && user.roomNo)
    {
        return res.status(400).json({success:false,message:"Room Already alloted !"})
    }

    if(!room || !user)
    {
        return res.status(500).json({success:false,message:"Please Login"});
    }
    
    let newRoomUser=[];
    for (let i = 0; i <room.roomUser.length;i++) {
       newRoomUser.push(room.roomUser[i]);
    }
    newRoomUser.push({name:user.name,userId:userId});

    room=await Room.findByIdAndUpdate(roomId,{
    roomUser:newRoomUser},{new:true,runValidators:true,useFindAndModify:false});
    
    user=await User.findByIdAndUpdate(userId,{roomNo:room.roomNo},{new:true,runValidators:true,useFindAndModify:false})

    return res.status(200).json({
        success:true,
        room,
        user,
    })
}