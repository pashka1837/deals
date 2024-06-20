import path from 'path';
import {fileURLToPath} from 'url';
import express from 'express';
import 'dotenv/config';

import api_client from './middleware/api-client.js';
import get_auth from './endpoints/callback/get-auth.js';
import get_index from './endpoints/index/get-index.js';
import post_deal from './endpoints/deals/post-deal.js';
import logger from './middleware/logger.js';
import check_jwt from './middleware/jwt-check.js';
import get_inframe from './endpoints/inframe/get-inframe.js';

const __dirname = fileURLToPath(new URL('.', import.meta.url));

const {PORT} = process.env;

const app = express();

app.use(logger);

app.use(express.json());

app.use(api_client);

app.use('/assets', express.static(path.resolve(__dirname, '../build/assets')));

app.get('/callback', get_auth);

app.get('/', get_index);

app.get('/inframe', check_jwt(), get_inframe);

app.post('/deal', post_deal);

app.listen(PORT, () => {
	console.log(`http://localhost:${PORT}`);
});
