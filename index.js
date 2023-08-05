
import * as dotenv from "dotenv";
dotenv.config();
import qrcode from "qrcode-terminal";
import pkg from "whatsapp-web.js";
const { Client, MessageMedia, LocalAuth } = pkg;

import { getGPTresponse, getDalleResponse } from "./apis.js";

const client = new Client({
  authStrategy: new LocalAuth(),
  puppeteer: {
    headless: true,
    args: [
      "--no-sandbox",
      "--disable-setuid-sandbox",
      "--unhandled-rejections=strict",
    ],
  },
});

client.on("qr", (qr) => {
  qrcode.generate(qr, { small: true });
});

client.on("authenticated", (session) => console.log(`Authenticated`));

client.on("ready", () =>
  console.log("Chat GPT Bot - Created by @imasimali 🚀")
);

client.on("message_create", (message) => commands(message));

client.initialize();

const commands = async (message) => {
  const botCommands = {
    davinci3: "/bot",
    dalle: "/img",
  };

  const sender = message.from.includes(process.env.BOT_NUMBER)
    ? message.to
    : message.from;

  const command = message.body.substring(0, message.body.indexOf(" "));
  const prompt = message.body.substring(message.body.indexOf(" "));
  const sender_id = sender.split("@")[0];
  const contact = await message.getContact();