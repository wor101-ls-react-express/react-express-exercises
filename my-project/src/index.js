import 'dotenv/config';
import cors from 'cors'
import express, { application } from 'express';

const app = express();

app.use(cors());

app.get('/', (req, res) => {
  res.send('Hello World!');
})

app.get('/will', (req, res) => {
  res.send('Hello Will!');
})

app.listen(process.env.PORT, () => 
  console.log('Example app listening on port 3000!'),
);

console.log('Hello Project. Im still running!n');
console.log(process.env.MY_SECRET);