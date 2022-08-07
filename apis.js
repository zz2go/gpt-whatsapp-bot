
import * as dotenv from "dotenv";
dotenv.config();
import { Configuration, OpenAIApi } from "openai";
import { writeUserData } from "./database.js";
import { getHistory, AI_NAME } from "./utils.js";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_KEY,
});

const openai = new OpenAIApi(configuration);

export const getGPTresponse = async (sender_text, sender_id) => {
  const conversation_history = await getHistory(sender_id, sender_text).catch(
    (error) => {