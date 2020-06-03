const Pessoa = require('../models/Pessoa');
//const { Op } = require('sequelize');

class PessoaController {

  async store(req, res) {    
    const { id, nome, cpf, rg, telefone, cns } = await Pessoa.create(req.body);
    return res.json({
        id, 
        nome, 
        cpf, 
        rg, 
        telefone, 
        cns
    });
  }
}

module.exports = new PessoaController();