import bcrypt from 'bcrypt';
import {v4} from 'uuid';
import path from 'path';
import { fileURLToPath } from 'url';
import { User } from '../models/models.js';
import { generateToken } from '../utils/generateToken.js'

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const register = async (req, res) => {
    try {
        const {name, surname, email, number, password} = req.body;

        const {img} = req.files;
        console.log(req.files);
        let fileName = v4() + '.png';
        img.mv(path.resolve(__dirname, '..', 'static/users', fileName));

        const salt = await bcrypt.genSalt(10);
        const passwordHash = await bcrypt.hash(password, salt);

        const user = await User.create({name, surname, email, number, avatarUrl: fileName, passwordHash});

        const token = generateToken();

        res.json({...user.dataValues, token});

    } catch (error) {   
        console.log(req.files)
        console.log(error)
        res.json({message: 'Ошибка'})
    }
};

export {
    register
}