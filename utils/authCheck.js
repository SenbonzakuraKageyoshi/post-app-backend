import jwt from 'jsonwebtoken';

const authCheck = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1]

        if(!token) {
            return res.status(403).json({message: 'Пользователь не авторизован'})
        }

        const decoded = jwt.verify(token, '1a2b-3c4d-5e6f-7g8h');
        req.userId = decoded;

        next();
    } catch (error) {
        res.status(403).json({message: 'Пользователь не авторизован'})
    }
};

export default authCheck;