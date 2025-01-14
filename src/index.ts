import express, { Express, Router } from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';

import routes from './routes.ts'
import apiLogging from './utils/api_logging.ts';

dotenv.config();

const app: Express = express();
const PORT = process.env.PORT;
const dbUrl: string = process.env.DATABASE_URL as string;

app.use(express.json());
app.use(cors());

mongoose.connect(dbUrl)
	.then(() => {
		console.log('[server] Connected to MongoDB');
		app.listen(PORT, () => {
			console.log(`[server] API working on PORT ${PORT} - http://localhost:${PORT}`);
			apiLogging(routes);
		});
	})
	.catch((err) => {
		console.log('Error connecting to MongoDB:', err);
	});

app.use(routes);

