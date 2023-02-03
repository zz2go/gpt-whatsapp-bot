import * as dotenv from "dotenv";
dotenv.config();
import { initializeApp } from "firebase/app";
import {
  getDatabase,
  ref,
  set,
  get,
  child,
  push,
  query,
  limitToLast,
  serverTimestamp,
} from "firebase/database";

const firebase_app =
  proce