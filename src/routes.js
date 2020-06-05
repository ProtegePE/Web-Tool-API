const { Router } = require('express');
const { celebrate, Segments, Joi } = require('celebrate');

const PessoaController = require('./app/controllers/PessoaController');
const ExameController = require('./app/controllers/ExameController');

const routes = new Router();

routes.get('/', function(req, res){
    res.json({ ok: true });
 });

routes.post('/pessoa', PessoaController.store);
routes.get('/pessoas', PessoaController.index);
routes.get('/pessoas/customSearch', PessoaController.showCustomSearch);
routes.get('/pessoa/id', PessoaController.show);
routes.put('/pessoa/id', PessoaController.update);
routes.delete('/pessoa/id', PessoaController.delete);

routes.post('/exame', ExameController.store);
routes.get('/exames', ExameController.index);
routes.get('/exames/customSearch', ExameController.showCustomSearch);
routes.get('/exame/id', ExameController.show);
routes.delete('/exames/id', ExameController.delete);

module.exports = routes;