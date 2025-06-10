const express = require('express');
const app = express();
const port = 3000;
app.use(express.json());

/* O Array foi criado para guardar as informações do time, nesse caso o vetor*/
let jogador = [
    { id: 1, jogador: "Fabin"},
    { id: 2, jogador: "Jeferson"},
    { id: 3, jogador: "Marcelin"},
    { id: 4, jogador: "Ximbinha"},
    { id: 5, jogador: "Marquin"},
    { id: 6, jogador: "Gilson"},  
]
 
/* Aqui uma função de busca é utilizada para mostrar todos os itens que estão dentro do Array, para o "usuário" poder visualizar*/
app.get ("/jogador/id:", (req, res) => {
    if (posicao !== -1)
    res.status(200).json(jogador[posicao]);
})

app.put ("/jogador:id", (req,res) => {
    const id  = parseInt(res.params.id);
    const posicao = jogador.findIndex(jogador => jogador.id===id);

    if (posicao !== -1) {
        jogador[posicao] = {id, ...req,body}
        res.status(200).json([posicao]);
    }

    else {
        res.status(404).json({ erro: "O Jogador não foi encontrado..."});
    }
})


let numero = [
    { id: 1, num: 11 },
    { id: 2, num: 9},
    { id: 3, num: 1},
    { id: 4, num: 12},
    { id: 5, num: 21 },
    { id: 6, num: 30},
]