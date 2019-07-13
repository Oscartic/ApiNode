import models from '../models'
import bcrypt from 'bcryptjs'

export default {
    add: async(req, res, next) => {
        try {
            req.body.password = await bcrypt.hash(req.body.password, 10);
            const reg = await models.User.create(req.body)
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
            const reg= await models.User.findOne({ _id: req.query._id})
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
            const reg= await models.User.find({$or:[{'name': new RegExp(value, 'i')}, {'email': new RegExp(value, 'i')}]},{createdAt:0})
            .sort({'createAt':-1});
            res.status(200).json(reg)
        } catch(e) {
            res.status(500).send({
                message: 'Ocurrio un error'
            });
            next(e)
        }
    },
    update: async(req, res, next) => {
        try {
            let pass = req.body.password;
            const reg0 = await models.User.findOne({ _id: req.body._id})
            if(pass!=reg0.password){
                req.body.password = await bcrypt.hash(req.body.password, 10);
            }
            const reg= await models.User.findByIdAndUpdate(
                {_id:req.body._id},
                {
                    rol: req.body.rol,
                    name: req.body.name, 
                    document_type: req.body.document_type,
                    document_num: req.body.document_num,
                    address: req.body.address,
                    phone: req.body.phone,
                    email: req.body.email,
                    password: req.body.password
                });
            res.status(200).json(reg);
        } catch(e) {
            res.status(500).send({
                message: 'Ocurrio un error'
            });
            next(e)
        }
    },
    remove: async(req, res, next) => {
        try {
            const reg = await models.User.findByIdAndDelete({_id: req.body._id})
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
            const reg = await models.User.findByIdAndUpdate({_id: req.body._id},{state:1}); 
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
            const reg = await models.User.findByIdAndUpdate({_id: req.body._id},{state:0}); 
            res.status(200).json(reg)
        } catch(e) {
            res.status(500).send({
                message: 'Ocurrio un error'
            });
            next(e)
        }
    },
}