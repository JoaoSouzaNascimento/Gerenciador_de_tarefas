function checkNome (req, res, next) {
    const nome = req.body.nome;

    if(!nome)
        return res.status(400).send({ message: "Por favor envie o nome da responsavel"});

    if(!/^[A-Za-z]+$/.test(nome))
        return res.status(400).send({ message: "O nome deve conter apenas letras"});

    if(nome.length < 3)
        return res.status(400).send({ message: "O nome deve ter pelo menos 3 letras"});

    return next()
}

function haveNome (req, res, next) {
    const nome = req.body.nome;

    if(!nome)
        return next()

    if(!/^[A-Za-z]+$/.test(nome))
        return res.status(400).send({ message: "O nome deve conter apenas letras"});

    if(nome.length < 3)
        return res.status(400).send({ message: "O nome deve ter pelo menos 3 letras"});

    return next()
}

function checkData (req, res, next) {
    const data_nascimento = req.body.data_nascimento;

    if(!data_nascimento)
        return res.status(400).send({ message: "Por favor envie a data de nascimento do responsavel"});

    const data = new Date(data_nascimento);
    
    if(isNaN(data.getTime())) 
        return res.status(400).send({ message: "Por favor envie uma data válida"});

    const ano = data.getFullYear();
    
    if(ano > 2014)
        return res.status(400).send({ message: "O ano de nascimento deve ser até 2014"});

    return next();
}

function haveData (req, res, next) {
    const data_nascimento = req.body.data_nascimento;

    if(!data_nascimento)
        return next()

    const data = new Date(data_nascimento);
    
    if(isNaN(data.getTime()))
        return res.status(400).send({ message: "Por favor envie uma data válida"});

    const ano = data.getFullYear();
    
    if(ano > 2014)
        return res.status(400).send({ message: "O ano de nascimento deve ser até 2014"});

    return next();
}

module.exports = {checkNome, haveNome, checkData, haveData}