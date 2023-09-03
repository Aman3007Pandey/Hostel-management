import Mess from "../model/messModel.js";
import userModel from "../model/userModel.js";
import messComplainModel from "../model/messComplainModel.js";

export const addMenu=async(req,res)=>{
   
    const {day,mealTime,food}=req.body;
    
    if(!day || !mealTime || !food)
    {
        return res.status(400).json({success:false,msg:"All fields are Compulsory !"});
    }
    const currentMeal=await Mess.create({day,mealTime,food});
    
    if(!currentMeal)
    {
        return res.status(400).json({success:false,msg:"Something went wrong!"});
    }

    res.status(201).json({
        success:true,
        currentMeal,
    })
}

export const updateMenu=async(req,res)=>{
   
    const {day,mealTime,food}=req.body;
    
    if(!day || !mealTime || !food)
    {
        return res.status(400).json({success:false,msg:"All fields are Compulsory !"});
    }
    
   await Mess.deleteOne({day:day,mealTime:mealTime});
   const currentMeal=await Mess.create({day,mealTime,food});


    res.status(201).json({
        success:true,
        currentMeal,
    })
}

export const getFoodByDay=async(req,res)=>{
  
    const {day}=req.params;
    //console.log(day);

    const food=await Mess.find({day}).sort({mealTime:1});

    res.status(201).json({
        success:true,
        food,
    })

}

export const getPresentMenu=async(req,res)=>{
   
     const {day,mealTime}=req.params;
     const food=await Mess.findOne({day,mealTime});
     
     if(!food)
     {
        return res.status(400).json({
        success:false,
        msg:"Something went wrong!"
    })
     }
     res.status(201).json({
        success:true,
        food,
    })
}

export const getUsers = async(req,res)=>{
    const users=await userModel.find({role:"student"}).sort({isMessComitee:-1});
    if(users){    
        return res.status(201).json({
          success: true,
          users,
        });
    }else{
        return res.status(400).json({
          success: false,
          msg: "Cant fetch Users",
        });
    }
}
export const giveAccess = async(req,res)=>{
    const id = (req.params.id);
     try {
       const updateUser = await userModel.updateOne(
         { _id: id },
         { $set: { isMessComitee: true } }
       );
    //    console.log(updateUser);
       if (!updateUser) {
         return res.status(400).json({ success: false, message: "Data Not Found" });
       }
       return res.status(200).json({ success: true, message: "Status Updated successfully" });
     } catch (error) {
       res.status(500).send({
         success: false,
         message: "Error in updating the Access",
         error,
       });
     }
}
export const removeAccess = async(req,res)=>{
    const id=req.params.id;
     try {
       const updateUser = await userModel.updateOne(
         { _id: id },
         { $set: { isMessComitee: false } }
       );
    //    console.log(updateUser);
       if (!updateUser) {
         return res.status(400).json({ success: false, message: "Data Not Found" });
       }
       return res.status(200).json({ success: true, message: "Status Updated successfully" });
     } catch (error) {
       res.status(500).send({
         success: false,
         message: "Error in updating the Access",
         error,
       });
     }
}


