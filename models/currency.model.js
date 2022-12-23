import { Schema, model, models } from "mongoose";

const currencySchema = new Schema({
  name: { type: "string", required: true },
  email: { type: "string", required: true, unique: true },
  currencyDetails: [
    {
      name: { type: String,required: true },
      count: { type: Number,default:1},
      totalAmount: {type: Number,required: true},
    },
  ],
});

const CurrencyModel = models.currency || model("currency", currencySchema);

export default CurrencyModel;