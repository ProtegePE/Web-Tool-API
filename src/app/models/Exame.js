const Sequelize = require('sequelize');
const { Model } = require('sequelize');

class Exame extends Model {
    static init(sequelize) {
        super.init(
            {
                resultado: Sequelize.STRING,
            },
            {
                sequelize,
                tableName: 'exame',
            }
        );
        return this;
    }

    static associate (models) {
        this.belongsTo(models.Pessoa, {
            foreignKey: 'pessoa_id', 
            as: 'pessoa'
        })
    };
}

module.exports = Exame;