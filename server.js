const express = require('express');
const app = express();
const port = 3000;
app.use(express.json());



/* O Array foi criado para guardar as informações do time, nesse caso o vetor*/
let jogador = [
    { id: 1, name: "Fabinho" , numero: 11 , perna_boa: "Direita"},
    { id: 2, name: "Jeferson" , numero: 21 , perna_boa: "Esquerda"}, 
    { id: 3, name: "Marcelinho" ,  numero: 32 ,  perna_boa: "Direita"},
    { id: 4, name: "Ximbinha" , numero: 24 ,  perna_boa: "Direita"},
    { id: 5, name: "Gilson" ,  numero: 38 , perna_boa: "Esquerda"},  
];



/* Criação de uma função para aplicar o método HATEOAS no objeto jogador */
function hateoasJogador(jogador) {
    return {
        links: [
            { rel:"self", method: "GET", href: `/jogador/${jogador.id}` },
            { rel:"create", method: "POST", href: `/jogador/` },
            { rel:"update", method: "PUT", href: `/jogador/${jogador.id}` },
            { rel:"delete", method: "DELETE", href: `/jogador/${jogador.id}` },
        ]
    }
}



/* Array para guardar as informações dos clubes */
let clube = [
    { id: 1, time: "Ibis" , presidente: "Ozir Ramos Junior" , estadio: "Estádio Municipal Ademir Cunha"},
    { id: 2, time: "Ponte preta" , presidente: "Marco Antônio" , estadio: "Estádio Moisés Lucarelli"},
    { id: 3, time: "Arsenal" , presidente: "Stan Kroenke" , estadio: "Emirates Stadium"},
    { id: 4, time: "Foraleza" ,  presidente: "José Rolim" , estadio: "Arena Castelão"},
    { id: 5, time: "Maranhão Atlético clube" , presidente: "Carlos Eduardo" , estadio: "Estádio Governador São Castelo"},
];



/* Criação de uma função para aplicar o método HATEOAS no objeto clube */
function hateoasClube(clube) {
    return {
        links: [
            { rel:"self", method: "GET", href: `/clube/${clube.id}` },
            { rel:"create", method: "POST", href: `/clube/` },
            { rel:"update", method: "PUT", href: `/clube/${clube.id}` },
            { rel:"delete", method: "DELETE", href: `/clube/${clube.id}` },
        ]
    }
}



/* Aplicação de GET específico por ID do jogador */
app.get("/jogador/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const posicao = jogador.findIndex(jogador => jogador.id === id);

    if (posicao !== -1) {
        const jogadorEncontrado = jogador[posicao];
        res.status(200).json({
            jogador: jogadorEncontrado,
            _links: hateoasJogador(jogadorEncontrado).links
        });
    } else {
        res.status(404).json({ erro: "O jogador não foi encontrado." });
    }
});



/* Aplicação do GET geral, revelando o array inteiro de jogadores */
app.get("/jogador", (req, res) => {
    const jogadoresComLinks = jogador.map(j => ({
        ...j,
        _links: hateoasJogador(j).links
    }));
    res.json(jogadoresComLinks);
});



/* Aplicação do PUT para atualizar jogador */
app.put("/jogador/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const posicao = jogador.findIndex(jogador => jogador.id === id);

    if (posicao !== -1) {
        jogador[posicao] = { ...jogador[posicao], ...req.body, id };
        res.status(200).json({
            jogador: jogador[posicao],
            _links: hateoasJogador(jogador[posicao]).links
        });
    } else {
        res.status(404).json({ erro: "O jogador não foi encontrado..." });
    }
});



/* Aplicação do DELETE para remover jogador */
app.delete("/jogador/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const posicao = jogador.findIndex(jogador => jogador.id === id);

    if (posicao !== -1) {
        jogador.splice(posicao, 1);
        res.status(200).json({ mensagem: "O jogador foi deletado com sucesso!" });
    } else {
        res.status(404).json({ erro: "Jogador não encontrado." });
    }
});



/* Aplicação do POST para adicionar novo jogador */
app.post("/jogador", (req, res) => {
    const novoJogador = { id: jogador.length + 1, ...req.body };
    jogador.push(novoJogador);
    res.status(201).json({
        mensagem: "O jogador foi adicionado!",
        jogador: novoJogador,
        _links: hateoasJogador(novoJogador).links
    });
});



/* Aplicação do GET geral, revelando o array inteiro de clubes */
app.get("/clube", (req, res) => {
    const clubesComLinks = clube.map(c => ({
        ...c,
        _links: hateoasClube(c).links
    }));
    res.json(clubesComLinks);
});



/* Aplicação de GET específico por ID do clube */
app.get("/clube/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const posicao = clube.findIndex(clube => clube.id === id);

    if (posicao !== -1) {
        const clubeEncontrado = clube[posicao];
        res.status(200).json({
            clube: clubeEncontrado,
            _links: hateoasClube(clubeEncontrado).links
        });
    } else {
        res.status(404).json({ erro: "O clube não foi encontrado" });
    }
});



/* Aplicação do PUT para atualizar clube */
app.put("/clube/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const posicao = clube.findIndex(clube => clube.id === id);

    if (posicao !== -1) {
        clube[posicao] = { ...clube[posicao], ...req.body, id };
        res.status(200).json({
            clube: clube[posicao],
            _links: hateoasClube(clube[posicao]).links
        });
    } else {
        res.status(404).json({ erro: "O clube não foi encontrado..." });
    }
});



/* Aplicação do DELETE para remover clube */
app.delete("/clube/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const posicao = clube.findIndex(clube => clube.id === id);

    if (posicao !== -1) {
        clube.splice(posicao, 1);
        res.status(200).json({ mensagem: "O clube foi deletado com sucesso!" });
    } else {
        res.status(404).json({ erro: "O clube não foi encontrado." });
    }
});



/* Aplicação do POST para adicionar novo clube */
app.post("/clube", (req, res) => {
    const novoClube = { id: clube.length + 1, ...req.body };
    clube.push(novoClube);
    res.status(201).json({
        mensagem: "O clube foi adicionado!",
        clube: novoClube,
        _links: hateoasClube(novoClube).links
    });
});


app.listen(port, () => {
    console.log(`O time foi escalado em http://localhost:${port}`);
});