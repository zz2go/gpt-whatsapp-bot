
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
      console.error(error);
    }
  );

  const options = {
    model: "text-davinci-003", // GPT model to use
    prompt: conversation_history, // Text submitted by the user
    temperature: 1, // Variation level of generated responses, 1 is the maximum
    max_tokens: 200, // Number of tokens (words) to be returned by the bot, 4000 is the maximum
  };

  try {
    const response = await openai.createCompletion(options);
    let botResponse = "";
    response.data.choices.forEach(({ text }) => {
      botResponse += text;
    });
    // Trim the Friendly-AI name from the response
    botResponse = botResponse.replace(AI_NAME + ":", "");