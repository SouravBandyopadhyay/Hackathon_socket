import mongoose, { connect } from "mongoose";
const dbConnect = () => {
  mongoose.set("strictQuery", false);
  return connect(process.env.DB_URL);
};
export default dbConnect;
