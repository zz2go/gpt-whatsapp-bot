
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
