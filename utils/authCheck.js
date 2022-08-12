import jwt from 'jsonwebtoken';

const authCheck = (req, res, next) => {
    if(req.method === 'OPTIONS'){
        next()
    }
    try {
        const token = req.headers.authorization.split(' ')[1]

        if(!token) {
            return res.status(403).json({message: 'Пользователь не авторизован'})
        }

        const decoded = jwt.verify(token, 'secret');
        req.userId = decoded;
        
        next();
    } catch (error) {
        res.status(403).json({message: 'Пользователь не авторизован'})
    }
};

export default authCheck;