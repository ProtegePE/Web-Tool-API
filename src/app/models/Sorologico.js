const Sequelize = require('sequelize');
const { Model } = require('sequelize');

class Sorologico extends Model {
    static init(sequelize) {
        super.init(
            {
                igm: Sequelize.STRING,
                igg: Sequelize.STRING,
            },
            {
                sequelize,
                tableName: 'sorologico',
            }
        );
        return this;
    }

    static associate (models) {
        this.belongsTo(models.Exame, {
            foreignKey: 'exame_id', 
            as: 'exame'
        })
    };
}

module.exports = Sorologico;