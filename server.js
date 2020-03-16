const express = require('express');
const { resolve } = require('path');

const app = express();

app.use(
  express.static(resolve(__dirname, 'dist'), {
    maxAge: 31536000,
    etag: true,
    lastModified: true,
    setHeaders: (res, path) => {
      if (path.endsWith('.html')) {
        res.setHeader('Cache-Control', 'no-cache');
      }
    },
  }),
);

app.listen(3000, () => {
  console.log('Server is listening on port 3000');
});
