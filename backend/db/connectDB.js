import { set, connect } from 'mongoose';
set('strictQuery',true);
const connectDB = (url) => {
  return connect(url);
};

export default connectDB;