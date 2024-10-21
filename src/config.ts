import dotenv from 'dotenv';

const env = process.env.NODE_ENV;

dotenv.config({ path: new URL(`../.env.${env}`, import.meta.url) });

const PROTOCOL = process.env.PROTOCOL;
const PORT = process.env.PORT;
const HOST = process.env.HOST;
const API_URL = `${PROTOCOL}://${HOST}:${PORT}`;

const path = `../db/${process.env.USERS_STORE_NAME}`;
const USER_STORE_PATH = new URL(path, import.meta.url);

export { API_URL, HOST, PORT, PROTOCOL, USER_STORE_PATH };
