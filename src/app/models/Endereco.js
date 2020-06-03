const Sequelize = require('sequelize');
const { Model } = require('sequelize');

class Endereco extends Model {
    static init(sequelize) {
        super.init(
            {
                logradouro: Sequelize.STRING,
                complemento: Sequelize.STRING,
                numero: Sequelize.STRING,
                bairro: Sequelize.STRING,
                cidade: Sequelize.STRING,
                uf: Sequelize.STRING,
                cep: Sequelize.STRING,
            },
            {
                sequelize,
                tableName: 'endereco',
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

module.exports = Endereco;