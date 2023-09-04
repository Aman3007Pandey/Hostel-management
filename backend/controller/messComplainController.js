//complains
import userModel from "../model/userModel.js";
import messComplainModel from "../model/messComplainModel.js";

export const addMessComplain = async (req, res) => {
  try {
    // console.log(req.body);
    const { hostel, title, desc, phone } = req.body;
    //validations
    if (!hostel) {
      return res.send({ error: "Hostel is Required" });
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
    const { _id } = res.locals;
    // console.log(_id);
    const userData = await userModel.findById(_id);
    var x = new Date();
    var date = x.toLocaleString([], {
      hour12: true,
    });
    // console.log(userData);
    //save
    const complain = await new messComplainModel({
      userId: userData._id,
      name: userData.name,
      email: userData.email,
      hostel,
      title,
      desc,
      phone,
      date: date,
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

export const getSingleUserMessComplain = async (req, res) => {
  try {
    const { _id } = res.locals;
    const complainList = await messComplainModel
      .find({ userId: _id })
      .sort({ assigned: -1 });
    if (complainList) {
      return res.status(200).json(complainList);
    } else {
      return res.status(400).json({ message: "error in parsing" });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error in fetching the Complain",
      error,
    });
  }
  // console.log("Hello");
  // res.status(200).json({msg: "hello"});
};

export const getAllMessComplains = async (req, res) => {
  try {
    let data = await messComplainModel.find({}).sort({ assigned: 1 });
    if (!data) {
      return res
        .status(200)
        .send({ success: false, message: "No Complains Found" });
    }
    //console.log('data',deletedData );
    return res.status(200).json(data);
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in fetching the Complain",
      error,
    });
  }
};

export const deleteMessComplain = async (req, res) => {
  const id = req.params.id;
  try {
    let deletedData = await messComplainModel.findByIdAndDelete(id);
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
};

export const updateMessComplain = async (req, res) => {
  const id = req.params.id;
  try {
    // let deletedData = await complainModel.findById(id);
    let updatedData = await messComplainModel.updateOne(
      { _id: id },
      { $set: { assigned: "student" } }
    );
    if (!updatedData) {
      return res
        .status(400)
        .send({ success: false, message: "Data Not Found" });
    }
    //console.log('data',updatedData );
    return res
      .status(200)
      .send({ success: true, message: "Status Updated successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in updating the status of Complain",
      error,
    });
  }
};

export const assignToAdmin = async (req, res) => {
  const id = req.params.id;
  try {
    // let deletedData = await complainModel.findById(id);
    let updatedData = await messComplainModel.updateOne(
      { _id: id },
      { $set: { assigned: "admin" } }
    );
    if (!updatedData) {
      return res
        .status(200)
        .send({ success: false, message: "Data Not Found" });
    }
    //console.log('data',updatedData );
    return res
      .status(200)
      .send({ success: true, message: "Status Updated successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in updating the status of Complain",
      error,
    });
  }
};
