const express = require('express');
const server = express();
const cors = require('cors')

// const {  } = require('./src/logFormatter')
const { logData } = require('./main')
// const { logs, header, operationsByClient } = logData

// console.log(logs)
//set static path
server.use(express.static('src'));
server.use(cors());

server.get('/', (req, res) => {
    // res.render('index.html', { logs, header, operationsByClient } )
    res.status('200').send({ logData })
})

//turn it on this port
const port = 5550
server.listen(port, console.log(`Yeaahp, ${port}` ))


