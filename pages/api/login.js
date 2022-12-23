import dbConnect from "../../lib/dbconnect";
import UserModel from "../../models/user.models";

export default async function login(req, res) {
  await dbConnect();

  const { method } = req;
  const { email, name, password } = req.body;

  if (method == "GET") {
    try {
      let allUser = await UserModel.find();
      res.status(200).send(allUser);
    } catch (e) {
      return res.send(e.message);
    }
  } else if (method == "POST") {
    try {
      const user = await UserModel.findOne({ email });

      if (user) {
        if (user.password === password) {
          return res.status(200).send({
            msg: "User successfully logged in",
            task: true,
            UserDetail: { name, email },
          });
        }
        return res.status(403).send({ msg: "Password incorrect", task: false });
      }
      res.status(401).send({ msg: "User not found", task: false });
    } catch (e) {
      return res.status(403).send({ msg: e.message, task: false });
    }
  }
}
