const { Router } = require('express');
const { celebrate, Segments, Joi } = require('celebrate');

const PessoaController = require('./app/controllers/PessoaController');
const EnderecoController = require('./app/controllers/EnderecoController');

const routes = new Router();

routes.get('/', function(req, res){
    res.json({ ok: true });
 });

 routes.post('/pessoa', PessoaController.store);
 routes.post('/endereco', EnderecoController.store);

 module.exports = routes;