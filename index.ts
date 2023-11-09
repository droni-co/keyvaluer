import express, { Express } from 'express';
import dotenv from 'dotenv';
const path = require('path');
import KeyVaultController from './src/controller/KeyVaultController';

dotenv.config();

const app: Express = express();
const port = 3000;

app.use('/', express.static(path.join(__dirname, 'public')))
app.use('/assets', express.static(path.join(__dirname, 'src/assets')))

app.get('/kv/:keyvault', KeyVaultController.index);
app.get('/kv/:keyvault/secret/:secret', KeyVaultController.show);


app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});