const express = require('express');
const axios = require('axios');
const Fs = require('fs');
const cors = require('cors');
const port = 4320;

const app = express()
app.use(cors())

var lastFile = [];
var obj = {
    table: []
};
/*
obj.table.push({surname: "Buitrago",lastname: "Juna",phone: "gfw232"});
*/

var datajson = {students:[
    {
        "_id": "6045bb99b13fd68776113370",
        "surname": "Micro",
        "lastname": "gomez",
        "phone": "15963",
        "__v": 0
    },
    {
        "_id": "604656b6a6b067688f235699",
        "surname": "Anita",
        "lastname": "conganita",
        "phone": "25852",
        "__v": 0
    }
  ]}

//Guarda un archivo.json cada que lo llamen
function addFile() {
    console.log("Fileee")
    count = count +1 
    var path = './backup'+count+'.json';
    var json = JSON.stringify(obj);
    fs.writeFileSync(path, json , err=> {
        if (err)   res.status(500).send({error: "No se pudo guardar"});
        else    res.status(200).send({message : "Json guardado"+path});
    });
}

//Por medio de un bash hace una petición al servidor de la lista de estudiantes cada cierto tiempo
app.get('/students_backup', async(req, res) => {
    //Petición al MainServer
    await axios.get(`http://localhost:${3000}/students_backup`)
    .then(async function (response) {
        //Hace una petición GET al servidor
        console.log(response.data)
        obj.table = response.data;
        await addFile();
        lastFile = obj.table;
        res.sendStatus(200);
    }).catch(function (error) {
        res.sendStatus(404);
    });
})

//Devuelve el ultimo archivo cuando se crea una nueva instancia
app.get('/backup_info', (req, res) => {
    //res.json(lastFile)
    res.send(datajson)
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})