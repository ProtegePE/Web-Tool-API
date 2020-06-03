const Endereco = require('../models/Endereco');
//const { Op } = require('sequelize');

class EnderecoController {

  async store(req, res) {    
    const { id, logradouro, complemento, numero, bairro, cidade, uf, cep  } = await Endereco.create(req.body);
    return res.json({
        id, 
        logradouro, 
        complemento, 
        numero,
        bairro, 
        cidade,
        uf,
        cep
    });
  }
}

module.exports = new EnderecoController();