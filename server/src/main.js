require('dotenv').config();

const express = require('express');
const cookieParser = require('cookie-parser');

const app = express();

const PORT = process.env.PORT || 5000;

app.use(express.static('public'));
app.use(express.json());
app.use(cookieParser());

app.use('/api/auth', require('./routes/auth'));
app.use('/api', require('./routes/db'));
app.use('/api/tableau', require('./routes/tableau'));

app.use('*', (_req, res) => {
  res.sendFile('index.html', { root: 'public' });
});

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
