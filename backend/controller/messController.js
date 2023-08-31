import Mess from "../model/messModel.js";

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