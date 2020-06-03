'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.query('CREATE EXTENSION IF NOT EXISTS "uuid-ossp";')
      .then(() => {
        return queryInterface.createTable('endereco', { 
          id: {
            allowNull: false,
            primaryKey: true,
            type: Sequelize.DataTypes.UUID,
            defaultValue: Sequelize.literal('uuid_generate_v4()'),
          },
          logradouro: {
            type: Sequelize.STRING,
            allowNull: false,
          },
          complemento: {
            type: Sequelize.STRING,
            allowNull: false,
          },
          numero: {
            type: Sequelize.STRING,
            allowNull: false,
          },
          bairro: {
            type: Sequelize.STRING,
            allowNull: false,
          },
          cidade: {
            type: Sequelize.STRING,
            allowNull: false,
          },
          uf: {
            type: Sequelize.STRING,
            allowNull: false,
          },
          cep: {
            type: Sequelize.STRING,
            allowNull: false,
          },
          pessoa_id: {
            type: Sequelize.DataTypes.UUID,
            references: { model: 'pessoa', key: 'id' },
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE',
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
      return queryInterface.dropTable('endereco');
  }
};