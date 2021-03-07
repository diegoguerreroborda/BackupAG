const express = require('express');
const axios = require('axios');
const Fs = require('fs') ;
const port = 4320;

const app = express()
app.use(cors())

//Va a tener varios files
app.get('/', (req, res) => {
    //Devolver el ultimo archivo
})

app.post('/', (req, res) => {
    //Ir escribiendo archivos cada cierto tiempo
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})