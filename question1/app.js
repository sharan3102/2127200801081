const express = require('express');
const http = require('http');

const app = express();
const port = 8008;

app.get('/numbers', async (req, res) => {
  try {
    const urls = req.query.url;
    if (!urls) {
      return res.status(400).json({ error: 'ERROR USE PC PROPERLY' });
    }
    const urlArray = urls.split('&');
    const responseData = [];
    const requests = urlArray.map(url => httpRequest(url));
    for (const request of requests) {
      try {
        const response = await Promise.race([
          request,
          new Promise((resolve, reject) => {
            setTimeout(() => {
              reject(new Error('Request timeout'));
            }, 500);
          })
        ]);
        const data = JSON.parse(response);
        responseData.push(data);
      } catch (error) {
        console.error(error);
      }
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
