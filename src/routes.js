const { Router } = require('express');
const { celebrate, Segments, Joi } = require('celebrate');

const routes = new Router();

routes.get('/', function(req, res){
    res.json({ ok: true });
 });

 module.exports = routes;