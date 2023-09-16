const express = require('express');
const multer = require('multer');

const app = express();
const port = 3000;

// 1) Permite a exibição de arquivos estáticos.
app.use(express.static('public'));

// Configuração do Multer para upload de arquivos.

const path = require('path');
const storage = multer.diskStorage({
    destination: 'public/uploads/',
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));  // Adiciona uma timestamp ao nome do arquivo para evitar sobreposições
    }
});
const upload = multer({ storage: storage });

// 2) Permite a realização de upload de arquivo enviado através do comando POST.
app.post('/upload', upload.single('file'), (req, res) => {
    if (!req.file) {
        return res.status(400).send('Nenhum arquivo enviado');
    }
    const imageUrl = '/uploads/' + req.file.filename;
    res.send(imageUrl);
});


// 3) Processa dados de um formulário enviados via comando GET.
app.post('/login', (req, res) => {
    const dados = req.query;
    if(dados.email === "teste@email.com" && dados.password === "123")
        return res.sendStatus(200);
    return res.sendStatus(400);
});

// 4) Suporta uma aplicação AJAX que fornece dados em JSON.
app.get('/dados', (req, res) => {
    const data = {
        mensagem: "Voce clicou em um botão que fez uma requisição ao back e foi carregada usando AJAX!"
    };
    res.json(data);
});

app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});
