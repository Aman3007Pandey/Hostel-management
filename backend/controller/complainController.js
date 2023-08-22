import userModel from "../model/userModel.js";
import complainModel from "../model/complainModel.js";

export const addComplainController = async (req, res) => {
  try {
    // console.log(req.body);
    const { location, title, desc, phone } = req.body;
    //validations
    if (!location) {
      return res.send({ error: "Location is Required" });
    }
    if (!title) {
      return res.send({ message: "Title is Required" });
    }
    if (!desc) {
      return res.send({ message: "Desc is Required" });
    }
    if (!phone) {
      return res.send({ message: "Phone is Required" });
    }
    const {_id} = res.locals;
    // console.log(_id);
    const userData = await userModel.findById(_id);
    var x = new Date();
    var date = x.toLocaleString([], {
        hour12: true,
    });
    // console.log(userData);
    //save
    const complain = await new complainModel({
        userId: userData._id,
        name: userData.name,
        email: userData.email,
        hostel: userData.hostel,
        location,
        title,
        desc,
        phone,
        date: date
    }).save();

    res.status(201).send({
      success: true,
      message: "Added Complain Successfully",
      complain,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in adding the Complain",
      error,
    });
  }
};

export const getSingleUserComplain = async(req,res)=>{
    try {
        const { _id } = res.locals;
        const complainList = await complainModel.find({userId: _id});
       if(complainList){
        return res.status(200).json(complainList);
       }else{
        return res.status(400).json({message: "error in parsing"});
       }
        
    } catch (error) {
      console.log(error);
      res.status(500).send({
        success: false,
        message: "Error in fetching the Complain",
        error,
      });
    }
}

export const getAllComplains = async(req,res)=>{
  try {
    let data = await complainModel.find({});
    if (!data) {
      return res
        .status(200)
        .send({ success: false, message: "No Complains Found" });
    }
    //console.log('data',deletedData );
    return res
      .status(200)
      .json(data);
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in fetching the Complain",
      error,
    });
  }
}

export const deleteComplain = async(req,res) =>{
  const id=req.params.id;
  try {
    let deletedData = await complainModel.findByIdAndDelete(id);
    if (!deletedData) {
      return res
        .status(200)
        .send({ success: false, message: "Complain Not Found" });
    }
    //console.log('data',deletedData );
    return res
      .status(200)
      .send({ success: true, message: "Deleted successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in deleting the Complain",
      error,
    });
  }
}

export const userdata = async (req, res) => {
  try {
    const { _id } = res.locals;
    const user = await userModel.findById(_id);
    console.log(user);
    return res.json(user);
  } catch (err) {
    return res.json(err);
  }
};