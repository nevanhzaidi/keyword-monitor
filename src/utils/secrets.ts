import { Secret } from "./types";
import dotenv from 'dotenv';

dotenv.config()

const validateEnvVar = (value: string | undefined, name: string): string => {
  if (value === undefined)
    throw new Error(
      `\x1b[31m Required environment variable "${name}" is missing or empty.\x1b[0m`
    );
  else return value;
};

export const secrets:Secret={
  USERNAME: validateEnvVar(process.env.USERNAME, 'USERNAME'),
  PASSWORD: validateEnvVar(process.env.PASSWORD, 'PASSWORD'),
  JWT_SECRET: validateEnvVar(process.env.JWT_SECRET, 'JWT_SECRET'),
  PORT: Number(process.env.PORT) || 3000
}
