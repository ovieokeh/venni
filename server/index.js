/* eslint-disable no-console */
import express from 'express';
import path from 'path';
import dotenv from 'dotenv';

dotenv.config();
const router = express.Router();
const app = express();

router.get('*', (_, res) => {
  const route = path.join(__dirname, '..', '..', 'dist', 'index.html');
  res.sendFile(route);
});

const port = process.env.PORT || 7000;

app.use('/', express.static(path.join(__dirname, '..', '..', 'dist')));
app.use('/', router);
app.use('/dist', express.static(path.join(__dirname, '..', '..', 'dist')));

const server = app.listen(port, () => console.log('Venni live on port', server.address().port));

export default app;
