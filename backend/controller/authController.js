import  userModel  from "../model/userModel.js";
import { comparePassword, hashPassword } from "../helper/authHelper.js";
import { attachCookiesToResponse } from "../utils/jwt.js";

export const registerController = async (req, res) => {
  try {
    const { name, roll, email, password, phone, hostel, role,batch,branch,bloodGrp } = req.body;
    //validations
    if (!name) {
      return res.send({ error: "Name is Required" });
    }
    if (!email) {
      return res.send({ message: "Email is Required" });
    }
    if (!roll) {
      return res.send({ message: "Roll No. is Required" });
    }
    if (!password) {
      return res.send({ message: "Password is Required" });
    }
    if (!phone) {
      return res.send({ message: "Phone no is Required" });
    }
    if (!hostel) {
      return res.send({ message: "Hostel is Required" });
    }
    if (!role) {
      return res.send({ message: "role is Required" });
    }
    if (!branch) {
      return res.send({ message: "branch is Required" });
    }
    if (!bloodGrp) {
      return res.send({ message: "bloodGrp is Required" });
    }
    if (!batch) {
      return res.send({ message: "batch is Required" });
    }
    //check user
    const exisitingUser = await userModel.findOne({ email });
    //exisiting user
    if (exisitingUser) {
      return res.status(200).send({
        success: false,
        message: "Already Register please login",
      });
    }
    //register user
    const hashedPassword = await hashPassword(password);
    //save
    const user = await new userModel({
      name,
      roll,
      email,
      phone,
      hostel,
      password: hashedPassword,
      role,
      batch,
      branch,
      bloodGrp,
    }).save();

    res.status(201).send({
      success: true,
      message: "User Registered Successfully",
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in Registeration",
      error,
    });
  }
};


export const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    //validation
    if (!email || !password) {
      return res.status(404).send({
        success: false,
        message: "Invalid email or password",
      });
    }
    //check user
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "Email is not registerd",
      });
    }
    const match = await comparePassword(password, user.password);
    if (!match) {
      return res.status(200).send({
        success: false,
        message: "Invalid Password",
      });
    }
    //token
    const payload = {
      _id: user._id,
      email: user.email,
      name: user.name,
      hostel:user.hostel,
    }
    const token = attachCookiesToResponse({res, user: payload});
    res.status(200).send({
      success: true,
      message: "login successfully",
      user: {
        _id: user._id,
        name: user.name,
        roll: user.roll,
        email: user.email,
        phone: user.phone,
        hostel: user.hostel,
        role: user.role,
        payload,
      }, token
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in login",
      error,
    });
  }
};