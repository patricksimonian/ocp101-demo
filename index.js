const express = require('express');
const PORT = process.env.PORT || 3000;
const app = express();


app.get('/', (req, res) => {
  res.send('OK');
});

app.get('/meaning-of-life', (req, res) => {
  res.send(42);
});

app.listen(PORT, () => {
  console.log(`Server is listening ${PORT}`);
});