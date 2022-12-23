import dbConnect from "../../lib/dbconnect";
import UserModel from "../../models/user.models";

export default async function signup(req, res) {
  await dbConnect();

  const { method } = req;
  const { email, name, password, age, phoneNumber, address } = req.body;

  if (method == "GET") {
    try {
      let allUser = await UserModel.find();
      res.status(200).send(allUser);
    } catch (e: any) {
      return res.send(e.message);
    }
  } else if (method == "POST") {
    try {
      const user = await UserModel.findOne({ email });

      if (user) {
        return res
          .status(400)
          .send({ msg: "User already resister", task: false });
      }
      let newUser = await UserModel.create({
        name,
        email,
        password,
        age,
        phoneNumber,
        address,
      });
      return res.status(200).send({
        msg: "User resister done",
        task: true,
        user: {
          name: newUser.name,
          email: newUser.email,
          age: newUser.age,
          address: newUser.address,
        },
      });
    } catch (e: any) {
      return res.status(403).send({ msg: e.message, task: false });
    }
  }
}
