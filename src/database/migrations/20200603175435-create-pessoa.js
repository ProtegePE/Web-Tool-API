'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.query('CREATE EXTENSION IF NOT EXISTS "uuid-ossp";')
      .then(() => {
        return queryInterface.createTable('pessoas', { 
          id: {
            allowNull: false,
            primaryKey: true,
            type: Sequelize.DataTypes.UUID,
            defaultValue: Sequelize.literal('uuid_generate_v4()'),
          },
          nome: {
            type: Sequelize.STRING,
            allowNull: false,
          },
          cpf: {
            type: Sequelize.STRING,
            allowNull: false,
          },
          rg: {
            type: Sequelize.STRING,
            allowNull: false,
          },
          telefone: {
            type: Sequelize.STRING,
            allowNull: false,
          },
          cns: {
            type: Sequelize.STRING,
            allowNull: false,
          },          
          created_at: {
            type: Sequelize.DATE,
            allowNull: false,
          },
          updated_at: {
            type: Sequelize.DATE,
            allowNull: false,
          },
        });
      })
  },

  down: (queryInterface) => {
      return queryInterface.dropTable('areas');
  }
};