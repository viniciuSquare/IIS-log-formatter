const express = require('express');
const server = express();

const { header } = require('./src/logFormatter')
const { logs, avarageByMethod } = require('./src/main')

//set static path
server.use(express.static('src'));

//using template engine
const nunjucks = require("nunjucks")
nunjucks.configure("view", {
    express: server,
    noCache: true
})

let i= 0
server.get('/', (req, res) => {
    res.render('index.html', { logs, header, i } )
})

//turn it on this port
const port = 3000
server.listen(port, console.log(`Yeaahp, ${port}` ))


