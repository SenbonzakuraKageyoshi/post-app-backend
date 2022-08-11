import {v4} from 'uuid';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const avatarUpload = async (req, res) => {
    try {
        const {uniqueFileName} = req.body;
        const {image} = req.files;
        image.mv(path.resolve(__dirname, '..', 'static/users', uniqueFileName));
        res.json({message: 'Успешно', fileName: uniqueFileName})    
    } catch (error) {
        console.log(error)
        res.json({message: 'Ошибка загрузки изображений'})
    }
};

const removeAvatar = async (req, res) => {
    try {
        const {fileName} = req.body;
        fs.unlinkSync(path.resolve() + `/static/users/${fileName}`)
        res.json({message: 'Успешно'})
    } catch (error) {
        console.log(error)
        res.json({message: 'Ошибка удаления аватара'})
    }
};

const postImagesUpload = async (req, res) => {
    try {
        const {image} = req.files;
        let fileName = v4() + '.png';
        image.mv(path.resolve(__dirname, '..', 'static/posts', fileName));
        res.json({message: 'Успешно'})
    } catch (error) {
        console.log(error)
        res.json({message: 'Ошибка загрузки изображений'})
    }
};

const removePostImg = async (req, res) => {
    try {
        const {fileName} = req.body;
        fs.unlinkSync(path.resolve() + `/static/posts/${fileName}`)
        res.json({message: 'Успешно'})
    } catch (error) {
        console.log(error)
        res.json({message: 'Ошибка удаления изображения'})
    }
};

export {
    avatarUpload, postImagesUpload, removeAvatar, removePostImg
}

