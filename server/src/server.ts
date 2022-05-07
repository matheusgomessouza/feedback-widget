import cors from 'cors';
import express from 'express';
import { routes } from './routes';

const app = express();

app.use(express.json());
app.use(routes);
app.use(cors());

app.listen(3333, () => {
	console.log('HTTP server running!');
});