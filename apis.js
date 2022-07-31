
import * as dotenv from "dotenv";
dotenv.config();
import { Configuration, OpenAIApi } from "openai";
import { writeUserData } from "./database.js";
import { getHistory, AI_NAME } from "./utils.js";
