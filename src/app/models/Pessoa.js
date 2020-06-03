const Sequelize = require('sequelize');
const { Model } = require('sequelize');

class Pessoa extends Model {
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
                tableName: 'pessoa',
            }
        );
        return this;
    }

    static associate (models) {
        this.hasMany(models.Endereco, {
            foreignKey: 'pessoa_id', 
            as: 'enderecos'
        })
    };
}

module.exports = Pessoa;