import mongoose from "mongoose";
const userSchema = new mongoose.Schema({
  googleId: { type: String, unique: true, sparse: true }, // <-- sparse true
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String }, // for email/password login
  picture: {type: String, default:""},
  phone: {type: String, default:""},
  addresses: [
    {
      label: { type: String, default: "Home" },
      address: String,
    },
  ],
}, { timestamps: true });

export const User = mongoose.model("User", userSchema);
