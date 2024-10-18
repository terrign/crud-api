import dotenv from 'dotenv';

dotenv.config();

const PROTOCOL = process.env.PROTOCOL;
const PORT = process.env.PORT;
const HOST = process.env.HOST;
const API_URL = `${PROTOCOL}://${HOST}:${PORT}`;

export { API_URL, HOST, PORT, PROTOCOL };
