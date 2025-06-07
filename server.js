const express = require('express');
const app = express();
const port = 3000;

let time = [
    { id: 1, jogador: "Fabin", numero: 11 },
    { id: 2, jogador: "Jeferson", numero: 9},
    { id: 3, jogador: "Marcelin", numero: 1},
    { id: 4, jogador: "Ximbinha", numero: 21},
]

app.get ("/time", (req, res)=> {
    res.json(time)
})