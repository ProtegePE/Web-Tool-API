const Sequelize = require('sequelize');
const databaseConfig = require('../config/database');

const Pessoa = require('../app/models/Pessoa');
const Endereco = require('../app/models/Endereco');

// Variável para receber todos os models
const models = [Pessoa, Endereco];

class Database {
    constructor() {
      this.init();
    }
  
    init() {
      // Conexão do banco com os models
      this.connection = new Sequelize(databaseConfig);
  
      models
        .map(model => model.init(this.connection))
        .map(model => model.associate && model.associate(this.connection.models));
    }
  }
  
  module.exports = new Database();