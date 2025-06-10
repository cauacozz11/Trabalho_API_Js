const express = require('express');
const app = express();
const port = 3000;
app.use(express.json());

/* O Array foi criado para guardar as informações do time, nesse caso o vetor*/
let jogador = [
    { id: 1, name: "Fabin" , numero: 11 , perna_boa: "Direita"},
    { id: 2, name: "Jeferson" , numero: 21 , perna_boa: "Esquerda"}, 
    { id: 3, name: "Marcelin" ,  numero: 32 ,  perna_boa: "Direita"},
    { id: 4, name: "Ximbinha" , numero: 24 ,  perna_boa: "Direita"},
    { id: 5, name: "Gilson" ,  numero: 38 , perna_boa: "Esquerda"},  
];
 
/* Aqui uma função de busca é utilizada para mostrar todos os itens que estão dentro do Array, para o "usuário" poder visualizar*/
app.get ("/jogador/id:", (req, res) => {
    if (posicao !== -1)
    res.status(200).json(jogador[posicao]);
})

app.get ("/jogador"), (req, res) => {
    res.json(jogador)
}

app.put ("/jogador:id", (req,res) => {
    const id  = parseInt(res.params.id);
    const posicao = jogador.findIndex(jogador => jogador.id===id);

    if (posicao !== -1) {
        nome[posicao] = {id, ...req,body}
        res.status(200).json([posicao]);
    }

    else {
        res.status(404).json({ erro: "O Jogador não foi encontrado..."});
    }
})


let clube = [
    { id: 1, time: "Ibis" , presidente: "Ozir Ramos Junior" , estadio: "Estádio Municipal Ademir Cunha"},
    { id: 2, time: "Ponte preta" , presidente: "Marco Antônio" , estadio: "Estádio Moisés Lucarelli"},
    { id: 3, time: "Arsenal" , presidente: "Stan Kroenke" , estadio: "Emirates Stadium"},
    { id: 4, time: "Foraleza" ,  presidente: "José Rolim" , estadio: "Arena Castelão"},
    { id: 5, time: "Maranhão Atlético clube" , presidente: "Carlos Eduardo" , estadio: "Estádio Governador São Castelo"},
];

app.get ("/clube/id:", (req, res) => {
    if (posicao !== -1)
    res.status(200).json(clube[posicao]);
})

app.put ("/clube:id", (req,res) => {
    const id  = parseInt(res.params.id);
    const posicao = clube.findIndex(clube => clube.id===id);

    if (posicao !== -1) {
        numero[posicao] = {id, ...req,body}
        res.status(200).json([posicao]);
    }

    else {
        res.status(404).json({ erro: "O clube não foi encontrado..."});
    }
})


app.listen(port, () => {

    console.log(`O time foi escalado em http://localhost${port}`);

})