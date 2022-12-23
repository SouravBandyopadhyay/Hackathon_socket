import { Schema, model, models } from "mongoose";

const userSchema = new Schema({
  name: { type: "string", required: true },
  email: { type: "string", required: true, unique: true },
  password: { type: "string", required: true },
  age: { type: "string", min: 19 },
  phoneNumber: { type: "string" },
  address: { type: "string" },
});

const UserModel = models.user || model("user", userSchema);

export default UserModel;
