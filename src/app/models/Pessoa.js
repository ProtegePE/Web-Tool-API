const Sequelize = require('sequelize');
const { Model } = require('sequelize');

class Area extends Model {
    static init(sequelize) {
        super.init(
            {
                nome: Sequelize.STRING,
                cpf: Sequelize.STRING,
                rg: Sequelize.STRING,
                telefone: Sequelize.STRING,
                cns: Sequelize.STRING,
            },
            {
                sequelize,
            }
        );
        return this;
    }
}

module.exports = Area;