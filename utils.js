
import * as dotenv from "dotenv";
dotenv.config();
import { readUserData } from "./database.js";

export const AI_NAME = process.env.BOT_PERSONALITY
  ? `${process.env.BOT_PERSONALITY} Bot`
  : "AI";

//Updates the conversation history and generates a response using GPT-3
export const getHistory = async (sender_id, sender_text) => {
  let conversation_history = "";

  if (process.env.FIREBASE_DB_URL) {
    // Get the conversation history from the database
    let fireHistory = await readUserData(sender_id);
    if (!fireHistory) {
      fireHistory = {};