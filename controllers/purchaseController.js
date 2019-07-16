import models from '../models'
import { model } from 'mongoose';

async function increaseStock(articleId, quantity) {
    let { stock } = await models.Article.findOne({_id:articleId});
    let newStock = parseInt(stock) + parseInt(quantity);
    const reg = await models.Article.findByIdAndUpdate({_id:articleId},{stock:newStock});
}

async function decreaseStock(articleId, quantity) {
    let { stock } = await models.Article.findOne({_id:articleId});
    let newStock = parseInt(stock) - parseInt(quantity);
    const reg = await models.Article.findByIdAndUpdate({_id:articleId},{stock:newStock});
}


export default {
    add: async(req, res, next) => {
        try {
            const reg = await models.Purchase.create(req.body)
            // update increaseStock 
            let details = req.body.details;
            console.log(details)
            details.map(function(x){
                decreaseStock(x._id, x.quantity)
            })

            res.status(200).json(reg)
        } catch(e) {
            res.status(500).send({
                message: 'Ocurrio un error'
            });
            next(e)
        }
    },
    query: async(req, res, next) => {
        try {
            const reg= await models.Purchase.findOne({ _id: req.query._id})
            .populate('user',{ name:1 })
            .populate('person', {name:1 })
            if(!reg){
                res.status(404).send({
                    message: "¡El registro solicitado, no existe!"
                });
            } else {
                res.status(200).json(reg);
            }
        } catch(e) {
            res.status(500).send({
                message: 'Ocurrio un error'
            });
            next(e)
        }
    },
    list: async(req, res, next) => {
        try {
            let value= req.query.value
            const reg= await models.Purchase.find({$or:[{'voucher_num': new RegExp(value, 'i')}, {'voucher_serial': new RegExp(value, 'i')}]})
            .populate('user', {name:1})
            .populate('person', {name:1})
            .sort({'createAt':-1});
            res.status(200).json(reg)
        } catch(e) {
            res.status(500).send({
                message: 'Ocurrio un error'
            });
            next(e)
        }
    },
    activate: async(req, res, next) => {
        try {
            const reg = await models.Purchase.findByIdAndUpdate({_id: req.body._id},{state:1}); 
            // update increaseStock 
            let details = reg.details;
            details.map(function(x){
                decreaseStock(x._id, x.quantity)
            })
            
            res.status(200).json(reg)
        } catch(e) {
            res.status(500).send({
                message: 'Ocurrio un error'
            });
            next(e)
        }
    },
    deactivate: async(req, res, next) => {
        try {
            const reg = await models.Purchase.findByIdAndUpdate({_id: req.body._id},{state:0}); 
            // update decrease stock
            let details = reg.details;
            details.map(function(x){
                increaseStock(x._id, x.quantity)
            })

            res.status(200).json(reg)
        } catch(e) {
            res.status(500).send({
                message: 'Ocurrio un error'
            });
            next(e)
        }
    },
}