'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.query('CREATE EXTENSION IF NOT EXISTS "uuid-ossp";')
      .then(() => {
        return queryInterface.createTable('rtpcr', { 
          id: {
            allowNull: false,
            primaryKey: true,
            type: Sequelize.DataTypes.UUID,
            defaultValue: Sequelize.literal('uuid_generate_v4()'),
          },
          valor: {
            type: Sequelize.STRING,
            allowNull: false,
          },
          exame_id: {
            type: Sequelize.DataTypes.UUID,
            references: { model: 'exame', key: 'id' },
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
      return queryInterface.dropTable('rtpcr');
  }
};