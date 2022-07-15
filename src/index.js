const http = require('http');
const url = require('url');
const axios = require('axios');

const port = process.env.PORT || 3000;

http.createServer(async function (req, res) {
    const queryObject = url.parse(req.url, true).query;
    let name = process.env.DEFAULT_NAME ?? 'Anonymous';
    if (queryObject.name) {
      name = queryObject.name;
    }

    const depUrl = process.env.SERVICE_B_URL
    if (depUrl) {
      try {
        const output = await axios({
          url: depUrl,
        });
        console.log('Dependent output:', output.data);
      } catch (err) {
        console.error(err);
      }
    }

    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.end(`Hello ${name}\n`);
}).listen(port, "0.0.0.0", () => {
  console.log(`Server running at http://0.0.0.0:${port}/`);
});
