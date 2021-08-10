require('dotenv').config({ path: '../.env' });

const PORT = process.env.PORT || 6012;
// const HOST = process.env.HOST || 'localhost';
const HOST = 'localhost';

const express = require('express');

const app = express();

const shrinkRay = require('shrink-ray-current');

app.use(shrinkRay());

const path = require('path');

const cors = require('cors');

app.use(express.static(path.join(__dirname, '..', 'public')));
app.use(cors());

// const axios = require('axios');
const createProxyMiddleware = require('http-proxy-middleware');

app.use('/course', (req, res) => {
  res.sendFile('index.html', { root: 'public' });
});

// app.all('/course/item', async (req, res) => {
//   await axios({
//     method: req.method,
//     url: process.env.COURSECONTENT_URL + req.originalUrl,
//     data: req.body,
//   })
//     .then((results) => {
//       res.status(200).json(results.data);
//     })
//     .catch((err) => {
//       res.status(400).send(err);
//     });
// });

app.use('/course/item', createProxyMiddleware({
  target: process.env.COURSECONTENT_URL,
  changeOrigin: true,
}));

// eslint-disable-next-line no-console
app.listen(PORT, HOST, () => { console.log(`Starting Proxy at ${HOST}:${PORT}`); });
