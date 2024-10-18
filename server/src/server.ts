import dotenv from 'dotenv';
import express from 'express';
import { fileURLToPath } from 'node:url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config();
import path from 'path';

// Import the routes
import routes from './routes/index.js';

const app = express();
app.use(express.static(path.join(__dirname, '../../client/dist')));

const PORT = process.env.PORT || 3001;

// TODO: Serve static files of entire client dist folder
app.use(express.static('../../client/dist'));

// TODO: Implement middleware for parsing JSON and urlencoded form data
app.use(express.json());

// TODO: Implement middleware to connect the routes
app.use(routes);

// Start the server on the port
app.listen(PORT, () => console.log(`Listening on PORT: ${PORT}`));