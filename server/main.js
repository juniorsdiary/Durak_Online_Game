const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();

const PORT = 1302;

app.use(express.static('./public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

app.get('/', (req, res) => {
  res.send('hello');
});

app.get('/about', (req, res) => {
  res.json({ endpoint: '/about' });
});

app.get('/posts', (req, res) => {
  res.json({ endpoint: '/posts' });
});

app.listen(PORT, () => {
  console.log('Server started on port:' + PORT);
});
