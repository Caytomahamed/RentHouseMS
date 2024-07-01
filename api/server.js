require('dotenv').config();

const server = require('./app.js');

const port = process.env.PORT || 9000;

server.listen(port, () => `server run on **${port}***`);
