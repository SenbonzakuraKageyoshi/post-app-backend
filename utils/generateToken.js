import jwt from 'jsonwebtoken';

export const generateToken = (id) => {
    const token = jwt.sign({id}, 'secret', {expiresIn: '30d'});
    return token
};