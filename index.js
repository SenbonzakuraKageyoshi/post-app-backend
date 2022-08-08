import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import { fileURLToPath } from 'url';
import path from 'path';
import db from './db.js';
import router from './routes/index.js';
import fileUpload from 'express-fileupload';

dotenv.config();

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(cors());
app.use(express.json());
app.use('/static', express.static(path.resolve(__dirname, 'static')));
app.use(fileUpload({}));
app.use('/api', router);

const PORT = 4000 || process.env.PORT;

const start = async () => {
    await db.authenticate();
    await db.sync();
    app.listen(PORT, (err) => err ? console.log(err) : console.log(`Server has started on port: ${PORT}`));
}

start();
