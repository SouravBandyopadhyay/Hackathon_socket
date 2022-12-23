// import dbConnect from "../../lib/dbconnect";
import CurrencyModel from "../../models/currency.model";

export default async function currency(req, res) {
  await dbConnect();

  const { method } = req;
  const { email, data, name } = req.body;

  if (method === "GET") {
    try {
      let currency = await CurrencyModel.find({ email });

      return res.send(currency);
    } catch (e) {
      return res.send(e.message);
    }
  } else if (method === "POST") {
    const { cName, price } = data;
    try {
      let currency = await CurrencyModel.findOne({ email });
      if (!currency) {
        let obj = {
          name,
          email,
          currencyDetails: [{ name: cName, totalAmount: price }],
        };
        let newCurrency = await CurrencyModel.create(obj);
        return res.send(newCurrency);
      } else {
        let flag = false;
        const check = currency.currencyDetails.filter((ele) => {
          if (ele.name === cName) {
            ele.count++;
            flag = true;
            ele.totalAmount += price;
          }
          return ele;
        });
        if (flag === false) {
          check.push({ name: cName, totalAmount: price });
          let updated = await CurrencyModel.updateOne(
            { email },
            { $set: { currencyDetails: check } },
            { new: true }
          );
          return res.send(updated);
        } else {
          let updated = await CurrencyModel.updateOne(
            { email },
            { $set: { currencyDetails: check } },
            { new: true }
          );
          return res.send(updated);
        }
      }
    } catch (error) {}
  }
}
