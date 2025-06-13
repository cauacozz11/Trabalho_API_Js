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
 


/* O Array foi criado para guardar as informações do clube*/
let clube = [
    { id: 1, time: "Ibis" , presidente: "Ozir Ramos Junior" , estadio: "Estádio Municipal Ademir Cunha"},
    { id: 2, time: "Ponte preta" , presidente: "Marco Antônio" , estadio: "Estádio Moisés Lucarelli"},
    { id: 3, time: "Arsenal" , presidente: "Stan Kroenke" , estadio: "Emirates Stadium"},
    { id: 4, time: "Foraleza" ,  presidente: "José Rolim" , estadio: "Arena Castelão"},
    { id: 5, time: "Maranhão Atlético clube" , presidente: "Carlos Eduardo" , estadio: "Estádio Governador São Castelo"},
];



/* Aplicação de GET específico por ID do objeto*/
app.get ("/jogador/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const posicao = jogador.findIndex(jogador => jogador.id === id);

    if (posicao !== -1) {
    res.status(200).json(jogador[posicao]);
    }
    else {
        res.status(404).json({ erro: "O jogador não foi encontrado."});
    }
});



/* Aplicação do GET geral, revelano o array inteiro */
app.get ("/jogador", (req, res) => {
    res.json(jogador);
});



/* Aplicação do PUT, onde o usuário pode atualizar alguma informação do array */
app.put("/jogador/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const posicao = jogador.findIndex(jogador => jogador.id === id);

  if (posicao !== -1) {
    jogador[posicao] = { ...jogador[posicao], ...req.body, id };

    res.status(200).json({...jogador[posicao]});
  } else {
    res.status(404).json({ erro: "O Jogador não foi encontrado..." });
  }
});



/* Aplicação do DELETE, onde o usuário pode deletar qualque objeto que estiver dentro do array */
app.delete ("/jogador/:id" , (req,res) => {
    const id = parseInt(req.params.id);
    const posicao = jogador.findIndex(jogador => jogador.id === id);

    if (posicao !== -1) {
        jogador.splice(posicao,1);
        res.status(200).json({ mensagem: "O jogador foi deletado com sucesso!"});
    }
    else {
        res.status(404).json({ erro: "Jogador não encontrado."});
    }
})


app.post("/jogador" , (req,res) => {
    const novoJogador = { id: jogador.lenght + 1, ...req.body};
     jogador.push(novoJogador);
     res.status(200).json(novoJogador,{ mensagem:"O jogador foi adicionado!"});
})

/* Aplicação de GET específico por ID do objeto*/
app.get ("/clube", (req, res) => {                                  
    res.json(clube);
});



/* Aplicação do GET geral, revelano o array inteiro */
app.get ("/clube/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const posicao = clube.findIndex(clube => clube.id === id);

    if (posicao !== -1) {
        res.status(200).json(clube[posicao]);
    }
    else {
        res.status(404).json({ erro: "O clube não foi encontrado"});
    }
})



/* Aplicação do PUT, onde o usuário pode atualizar alguma informação do array */
app.put ("/clube/:id", (req,res) => {
    const id  = parseInt(req.params.id);
    const posicao = clube.findIndex(clube => clube.id == id);

    if (posicao !== -1) {
        clube[posicao] = {...clube[posicao], ...req.body, id}

        res.status(200).json(clube[posicao]);
    }

    else {
        res.status(404).json({ erro: "O clube não foi encontrado..."});
    }
});



/* Aplicação do DELETE, onde o usuário pode deletar qualque objeto que estiver dentro do array */
app.delete("/clube/:id" , (req, res) => {
    const id = parseInt(req.params.id);
    const posicao = clube.findIndex(clube => clube.id === id);

    if (posicao !== -1) {
        res.status(200).json({ mensagem: "O clube foi deletado com sucesso!"});
    }
    else {
        res.status(404).json({ erro: "O clube não foi encontrado"})
    }
})


app.post("clube" , (req,res) => {
    const novoClube = {id: clube.length + 1, ...req.body};
    clube.push(novoClube);
    res.status(200).json({ mensagem:"O clube foi adicionado!"});

})



app.listen(port, () => {

    console.log(`O time foi escalado em http://localhost:${port}`);

});