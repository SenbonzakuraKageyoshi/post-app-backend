import bcrypt from 'bcrypt';
import { User } from '../models/models.js';
import { generateToken } from '../utils/generateToken.js'
import jwt from 'jsonwebtoken';

const register = async (req, res) => {
    try {
        const {name, surname, email, number, password, imageUrl} = req.body;

        const salt = await bcrypt.genSalt(10);
        const passwordHash = await bcrypt.hash(password, salt);

        const user = await User.create({name, surname, email, number, avatarUrl: imageUrl, passwordHash});

        const token = generateToken();

        res.json({...user.dataValues, token});

    } catch (error) {   
        console.log(req.files)
        console.log(error)
        res.json({message: 'Ошибка'})
    }
};

const getMe = async (req, res) => {
    try {
        const {token} = req.body;
        console.log(token)
        const decoded = jwt.verify(token, 'secret');

        const user = await User.findOne({ id: decoded.id });
            
        res.json({...user.dataValues});

    } catch (error) {   
        console.log(error)
        res.json({message: 'Ошибка получения данных пользователя'})
    }
};

export {
    register, getMe
}