require('dotenv').config({ path: '../.env' });

const PORT = process.env.PORT || 6012;
const HOST = 'localhost';

const express = require('express');

const app = express();

const shrinkRay = require('shrink-ray-current');

app.use(shrinkRay());

const path = require('path');

const cors = require('cors');

app.use(express.static(path.join(__dirname, '..', 'public')));
app.use(cors());

const createProxyMiddleware = require('http-proxy-middleware');

app.use('/course', (req, res) => {
  res.sendFile('index.html', { root: 'public' });
});

app.use('/course/item', createProxyMiddleware({
  target: process.env.COURSECONTENT_URL,
  changeOrigin: true,
}));

// eslint-disable-next-line no-console
app.listen(PORT, HOST, () => { console.log(`Starting Proxy at ${HOST}:${PORT}`); });
