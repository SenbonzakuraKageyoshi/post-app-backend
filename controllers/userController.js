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

        const token = generateToken(user.dataValues.id)

        res.json({...user.dataValues, token});
    } catch (error) {   
        console.log(error)
        res.json({message: 'Ошибка'})
    }
};

const login = async (req, res) => {
    try {
        const {email, number, password} = req.body;

        const user = await User.findOne({email, number});

        if(!user){
            return res.status(404).json({message: 'Неверный логин или пароль'});
        };

        const isValidPass = await bcrypt.compare(password, user.dataValues.passwordHash);

        if(!isValidPass){
            return res.status(404).json({message: 'Неверный логин или пароль'});
        };

        const token = generateToken(user.dataValues.id)

        res.json({...user.dataValues, token});
    } catch (error) {   
        console.log(error)
        res.json({message: 'Ошибка входа'})
    }
};

const getMe = async (req, res) => {
    try {
        const token = req.headers.authorization.split(' ')[1]

        if(!token){
            return res.status(404).json(null);
        }

        const {id} = jwt.verify(token, '1a2b-3c4d-5e6f-7g8h');
        console.log(id)

        const user = await User.findOne({ where: {id} });
        console.log(user)

        res.json(user.dataValues);

    } catch (error) {   
        console.log(error)
        res.json(null)
    }
};

export {
    register, login, getMe
}