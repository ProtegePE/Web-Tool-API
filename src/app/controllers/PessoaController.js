const Pessoa = require('../models/Pessoa');
const Endereco = require('../models/Endereco');
const { Op } = require('sequelize');

class PessoaController {

  async index(req, res) {
    const { page = 1 } = req.query;
    
    const pessoa = await Pessoa.findAll({
        attributes: [ 'id', 'nome', 'cpf', 'rg', 'telefone', 'cns' ],
        include: { 
          model: Endereco,
          attributes: [ 'id', 'logradouro', 'complemento', 'numero', 
                        'bairro', 'cidade', 'uf', 'cep' ],
          association: 'enderecos',
          limit: 20,
          offset: (page - 1) * 20,
        }
    });

    if(!pessoa) {
      return res.status(404).json({ message: 'Pessoa not found' });
    }

    return res.json(pessoa);
  }

  async show(req, res) {
    const pessoaId = req.headers.pessoa_id;
    
    const pessoa = await Pessoa.findByPk(pessoaId, {
        attributes: [ 'id', 'nome', 'cpf', 'rg', 'telefone', 'cns' ],
        include: { 
          model: Endereco,
          attributes: [ 'id', 'logradouro', 'complemento', 'numero', 
                      'bairro', 'cidade', 'uf', 'cep' ],
          association: 'enderecos',
        }
    });

    if(!pessoa) {
      return res.status(404).json({ message: 'Pessoa not found' });
    }

    return res.json(pessoa);
  }

  async showCustomSearch(req, res) {
    const { busca } = req.headers;

    const pessoas = await Pessoa.findAll({
      attributes: [ 'id', 'nome', 'cpf', 'rg', 'telefone', 'cns' ],
      include: { 
          model: Endereco,
          attributes: [ 'id', 'logradouro', 'complemento', 'numero', 
                        'bairro', 'cidade', 'uf', 'cep' ],
          association: 'enderecos',
      },
      where: {
        [Op.or]: [
          {
            nome: {[Op.iLike]: '%' + busca + '%'},
          },
          {
            cpf: {[Op.iLike]: '%' + busca + '%'}
          }
        ] 
      }
    })

    return res.json(pessoas);
  }

  async store(req, res) {    
    const { id, nome, cpf, rg, telefone, cns } = await Pessoa.create(req.body);

    const endereco = {
      logradouro: req.body.logradouro,
      complemento: req.body.complemento,
      numero: req.body.numero,
      bairro: req.body.bairro,
      cidade: req.body.cidade,
      uf: req.body.uf,
      cep: req.body.cep,
      pessoa_id: id
    }

    await Endereco.create(endereco);
    delete endereco.pessoa_id;

    return res.json({
        id, 
        nome, 
        cpf, 
        rg, 
        telefone, 
        cns,
        endereco
    });
  }

  async update(req, res) {    
    const pessoaId = req.headers.pessoa_id;

    const pessoa = {
      id: pessoaId,
      nome: req.body.nome,
      cpf: req.body.cpf,
      rg: req.body.rg,
      telefone: req.body.telefone,
      cns: req.body.cns
    }

    const endereco = {
      logradouro: req.body.logradouro,
      complemento: req.body.complemento,
      numero: req.body.numero,
      bairro: req.body.bairro,
      cidade: req.body.cidade,
      uf: req.body.uf,
      cep: req.body.cep,
      pessoa_id: pessoaId
    }

    const pessoaX = await Pessoa.findByPk(pessoaId, {
        attributes: [ 'id', 'nome', 'cpf', 'rg', 'telefone', 'cns' ],
        include: { 
          model: Endereco,
          attributes: [ 'id', 'logradouro', 'complemento', 'numero', 
                      'bairro', 'cidade', 'uf', 'cep' ],
          association: 'enderecos',
        }
    });

    if(!pessoaX) {
      return res.status(404).json({ message: 'Pessoa not found' });
    }

    const newPessoa = await pessoaX.update(pessoa);
    await pessoaX.dataValues.enderecos[0].update(endereco);

    const obj = {
      id: newPessoa.id,
      nome: newPessoa.nome,
      cpf: newPessoa.cpf,
      rg: newPessoa.rg,
      telefone: newPessoa.telefone,
      cns: newPessoa.cns,
      enderecos: [
        {
          id: newPessoa.enderecos[0].id,
          logradouro: newPessoa.enderecos[0].logradouro,
          complemento: newPessoa.enderecos[0].complemento,
          numero: newPessoa.enderecos[0].numero,
          bairro: newPessoa.enderecos[0].bairro,
          cidade: newPessoa.enderecos[0].cidade,
          uf: newPessoa.enderecos[0].uf,
          cep: newPessoa.enderecos[0].cep
        }
      ]
    }

    return res.json(obj);
  }

  async delete(req, res) {
    const pessoaId = req.headers.pessoa_id;
    const pessoa = await Pessoa.findByPk(pessoaId);
    
    if (!pessoa) {
      return res.status(404).json({ error: 'Pessoa not found' });
    }

    await pessoa.destroy();

    return res.status(204).send();
  }
}

module.exports = new PessoaController();