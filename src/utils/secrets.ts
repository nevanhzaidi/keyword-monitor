import { Secret } from "./types";
import dotenv from 'dotenv';

dotenv.config();


export const secrets:Secret={
  USERNAME: process.env.USERNAME || "",
  PASSWORD: process.env.PASSWORD || "",
  JWT_SECRET: process.env.JWT_SECRET || "",
  PORT: Number(process.env.PORT) || 3000
}
