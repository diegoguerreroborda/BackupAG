const express = require('express');
const axios = require('axios');
const Fs = require('fs');
const cors = require('cors');
const port = 4320;
const bodyParser = require('body-parser');

const app = express()
app.use(cors())
app.use(bodyParser.json())

var count = 0;

var lastFile = [];


//Guarda un archivo.json cada que lo llamen
function addFile(dataC) {
    count = count +1 
    let now= new Date();
    var path = './backup'+count+'_'+now+'.json';
    var json = JSON.stringify(dataC);
    Fs.writeFileSync(path, json);
}   

//Por medio de un bash hace una petición al servidor de la lista de estudiantes cada cierto tiempo
app.post('/students_backup', (req, res) => {
    //Petición del MainServer
    console.log(req.body.students)
    addFile(req.body.students)
    lastFile = req.body.students
    res.sendStatus(200)
})

//Devuelve el ultimo archivo cuando se crea una nueva instancia
app.get('/backup_info', (req, res) => {
    //res.json(lastFile)
    res.send(lastFile)
})

app.get('/hola', (req, res) => {
    //res.json(lastFile)
    res.send("hola")
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})