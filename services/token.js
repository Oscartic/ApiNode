import jwt from 'jsonwebtoken'
import models from '../models'
// refresh token => 
async function checkToken(token){
    let __id = null;
    try {
        const {_id}= await jwt.decode(token);
        __id = _id;

    } catch(e){
        return false;
    }
    const user = await models.User.findOne({_id: __id, state:1});
    if(user){
        const token = jwt.sign({_id: __id}, 'secretpassfortokengenerator', {expiresIn: '1d'});
        return{token, rol:user.rol}
    } else {
        return false;
    }
}
// encode and decode token =>
export default {
    encode: async(_id) => {
        const token = jwt.sign({_id: _id},'secretpassfortokengenerator', {expiresIn: '1d'});
        return token;
    },
    decode: async(token) => {
        try {
            const {_id} = await jwt.verify(token, 'secretpassfortokengenerator');
            const user = await models.User.findOne({_id,state: 1});
            if(user){
                return user;
            } else {
                return false;
            }
        } catch(e) {
            const newToken = await checkToken(token);
            return newToken;
        }
    }
}
