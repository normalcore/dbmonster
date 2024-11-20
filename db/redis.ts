import { createClient } from "redis";
import dotenv from "dotenv";
dotenv.config();

export const redisClient = createClient({
  url: `redis://redis:6379`,
});

redisClient
  .connect()
  .then(() => [console.log("Connected to Redis!")])
  .catch((err) => [console.log("Cannot connect to Redis!: " + err)]);
