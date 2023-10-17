
import * as dotenv from "dotenv";
dotenv.config();
import { readUserData } from "./database.js";

export const AI_NAME = process.env.BOT_PERSONALITY
  ? `${process.env.BOT_PERSONALITY} Bot`