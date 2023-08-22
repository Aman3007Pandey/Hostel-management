import { isTokenValid } from "./jwt.js";

const mw = async (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    res.locals._id = undefined;
    res.locals.email = undefined;
    res.locals.name = undefined;
    res.locals.hostel=undefined;
    // console.log(undefined,undefined,undefined,undefined);
    next();
  } else {
    const payload = isTokenValid({ token });
    const user = {
      _id: payload._id,
      email: payload.email,
      name: payload.name,
      hostel:payload.hostel,
    };
    // console.log(user);
    res.locals._id = user._id;
    res.locals.email = user.email;
    res.locals.name = user.name;
    res.locals.hostel=user.hostel;
    next();
  }
};

export default mw;