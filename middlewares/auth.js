import tokenService from '../services/token'

export default {
    verifyUser: async (req,res,next) => {
        if(!req.headers.token) {
            return res.status(404).send({
                message: 'No token'
            })
        }
        const response= await tokenService.decode(req.headers.token)
        if(response.rol === 'Admin' || response.rol === 'seller' || response.rol === 'storekeeper') {
            next();
        } else {
            return res.status(403).send({
                message: 'No autorizado'
            })
        }
    },
    verifyAdmin: async (req,res,next) => {
        if(!req.headers.token) {
            return res.status(404).send({
                message: 'No token'
            })
        }
        const response= await tokenService.decode(req.headers.token)
        if(response.rol === 'Admin') {
            next();
        } else {
            return res.status(403).send({
                message: 'No autorizado'
            })
        }
    },
    verifySeller: async (req,res,next) => {
        if(!req.headers.token) {
            return res.status(404).send({
                message: 'No token'
            })
        }
        const response= await tokenService.decode(req.headers.token)
        if(response.rol === 'Admin' || response.rol === 'storekeeper') {
            next();
        } else {
            return res.status(403).send({
                message: 'No autorizado'
            })
        }
    },
    verifyStorekeeper: async (req,res,next) => {
        if(!req.headers.token) {
            return res.status(404).send({
                message: 'No token'
            })
        }
        const response= await tokenService.decode(req.headers.token)
        if(response.rol === 'Admin' || response.rol === 'seller') {
            next();
        } else {
            return res.status(403).send({
                message: 'No autorizado'
            })
        }
    },
}