const express = require('express');

const postRoutes = require('./postRoutes.js')

const server = express();


server.use(express.json());
server.use('/api/posts', postRoutes);
console.log(process.env.NODE_ENV)
module.exports = server;