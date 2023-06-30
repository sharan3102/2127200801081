const express = require('express');
const http = require('http');

const app = express();
const port = 8008;

app.get('/numbers', async (req, res) => {
  try {
    const urls = req.query.url;
    // if (!urls) {
    //   return res.status(400).json({ error: 'ERROR USE PC PROPERLY' });
    // }

    const urlArray = urls.split('&');
    const responseData = [];

    for (const url of urlArray) {
      const response = await httpRequest(url);
      const data = JSON.parse(response);
      responseData.push(data);
    }

    res.json(responseData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

function httpRequest(url) {
  return new Promise((resolve, reject) => {
    const req = http.get(url, (res) => {
      let data = '';

      res.on('data', (chunk) => {
        data += chunk;
      });

      res.on('end', () => {
        resolve(data);
      });
    });

    req.on('error', (error) => {
      reject(error);
    });
  });
}

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
