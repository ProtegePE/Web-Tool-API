const Exame = require('../models/Exame');
const Pessoa = require('../models/Pessoa');
const Rtpcr = require('../models/Rtpcr');
const Sorologico = require('../models/Sorologico');
const { Op } = require('sequelize');

class ExameController {
    async index (req, res) {
        const { page = 1 } = req.query; 
        const pessoaId = req.headers.pessoa_id;
        let exames = [];

        const exameSorologico = await Exame.findAll({
            attributes: [ 'id', 'resultado' ],
            include: { 
                model: Sorologico,
                attributes: [ 'igm', 'igg' ],
                association: 'exames_sorologico',
                limit: 20,
                offset: (page - 1) * 20,
            },
            where: { pessoa_id: pessoaId}
        });
        
        if(!exameSorologico) {
            return res.status(404).json({ message: 'Exame Sorologico not found' });
        }

        for(let i = 0; i < exameSorologico.length; i++) {
            if(exameSorologico[i].dataValues.exames_sorologico.length >= 1)
            {
                exames.push({
                    id: exameSorologico[i].dataValues.id,
                    resultado: exameSorologico[i].dataValues.resultado,
                    sorologico: exameSorologico[i].dataValues.exames_sorologico[0]
                })
            }
        }
        
        const exameRtpcr = await Exame.findAll({
            attributes: [ 'id', 'resultado' ],
            include: { 
                model: Rtpcr,
                attributes: [ 'valor' ],
                association: 'exames_rtpcr',
                limit: 20,
                offset: (page - 1) * 20,
            },
            where: { pessoa_id: pessoaId}
        });
        
        if(!exameRtpcr) {
            return res.status(404).json({ message: 'Exame Rtpcr not found' });
        }

        for(let i = 0; i < exameRtpcr.length; i++) {
            if(exameRtpcr[i].dataValues.exames_rtpcr.length >= 1)
            {
                exames.push({
                    id: exameRtpcr[i].dataValues.id,
                    resultado: exameRtpcr[i].dataValues.resultado,
                    retpcr: exameRtpcr[i].dataValues.exames_rtpcr[0]
                })
            }
        }
        
        return res.json(exames);
    }

    async store (req, res) {
        const pessoaId = req.headers.pessoa_id;

        const pessoa = Pessoa.findByPk(pessoaId);
        if(!pessoa) {
            return res.status(404).json({ message: 'Pessoa not found' });
        }

        const exame = {
            resultado: req.body.resultado,
            valor: req.body.valor,
            igm: req.body.igm,
            igg: req.body.igg,
            pessoa_id: pessoaId
        }

        //adicionar data 
        const exameX = await Exame.create(exame);
        
        if(!exame.valor){
            const sorologico = {
                igm: exame.igm,
                igg: exame.igg,
                exame_id: exameX.id,
            }

            const sorologicoX = await Sorologico.create(sorologico);
            delete sorologico.exame_id;

            return res.json({
                resultado: exame.resultado,
                sorologico: {
                    id: sorologicoX.id,
                    igm: sorologico.igm,
                    igg: sorologico.igg,   
                }
            });
        }

        const rtpcr = {
            valor: exame.valor,
            exame_id: exameX.id,
        }

        const rtpcrX = await Rtpcr.create(rtpcr);
        delete rtpcr.exame_id;

        return res.json({
            resultado: exame.resultado,
            rtpcr: {
                id: rtpcrX.id,
                valor: exame.valor
            }
        });
    }
}

module.exports = new ExameController();