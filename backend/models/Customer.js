// backend/models/Customer.js
import mongoose from "mongoose";

const customerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email:{
    type: String,
    default: ""
  },
  phone: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    default: "",
  },
  due:{
    type: Number
  },
  products: [
    {
        check_no: {type: String},
        productName: { type: String, required: true },
        quantity: { type: Number, default: 1 },
        price: { type: Number, required: true },
        purchasedAt: { type: Date, default: Date.now },
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("Customer", customerSchema);
