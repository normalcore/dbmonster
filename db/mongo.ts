import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

mongoose
  .connect(
    `mongodb://${process.env.MONGO_INITDB_ROOT_USERNAME}:${process.env.MONGO_INITDB_ROOT_PASSWORD}@mongo:27017`
  )
  .then(() => {
    console.log("Connected to MongoDB!");
  })
  .catch((err) => {
    console.log("Cannot connect to MongoDB!: " + err);
  });

const person = new mongoose.Schema({
  name: String,
  age: Number,
  vip: Boolean,
});

export const Person = mongoose.model("Person", person);
