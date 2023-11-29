import express from 'express';
import cors from 'cors';
import 'dotenv/config.js';
import db from "./config/db.js"


import routes from './routes/index.js';

import { verifyAccessToken, verifyRefreshToken } from "./middlewares/index.js"


const app = express();
app.use(cors());
app.use(express.json())

app.get('/', (req, res) => {
    res.send('Hello World');
});
app.use('/user', routes.userRouter);
app.use('/task', verifyAccessToken, verifyRefreshToken, routes.taskRoutes);

app.listen(process.env.PORT, async () => {
    await db.authenticate();
    await db.sync();
    console.log(`Server is running on port ${process.env.PORT}`);
});