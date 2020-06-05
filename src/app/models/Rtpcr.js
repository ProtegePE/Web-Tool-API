const Sequelize = require('sequelize');
const { Model } = require('sequelize');

class Rtpcr extends Model {
    static init(sequelize) {
        super.init(
            {
                valor: Sequelize.STRING,
            },
            {
                sequelize,
                tableName: 'rtpcr',
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

module.exports = Rtpcr;