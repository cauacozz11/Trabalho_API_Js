const express = require('express');
const app = express();
const port = 3000;

/* O Array foii criado para guardar as inforrmações do time, nesse caso o vetor*/
let time = [
    { id: 1, jogador: "Fabin", numero: 11 },
    { id: 2, jogador: "Jeferson", numero: 9},
    { id: 3, jogador: "Marcelin", numero: 1},
    { id: 4, jogador: "Ximbinha", numero: 21},
]
 
/* Aqui uma função de busca é utilizada para mostrar todos os itens que estão dentro do Array, para o "usuário" poder visualizar*/
app.get ("/time", (req, res) => {
    res.json(time)
})

app.put ("/time:id", (req,res) => {
    const id  = parseInt(res.params.id);
    const posicao = time.findIndex(time => time.id===id);
})