import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    profileImageUrl: { type: String, default: null },
    bio: { type: String, default: "" },
    role: { type: String, enum: ["admin", "member"], default: "member" },
  },
  { timestamps: true }
);

// 👈 FIX: Changed CommonJS export to ES Module default export
const User = mongoose.model("User", UserSchema);

export default User;