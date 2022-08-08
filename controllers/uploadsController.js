import {v4} from 'uuid';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const avatarUpload = async (req, res) => {
    try {
        const {image} = req.files;
        let fileName = v4() + '.png';
        image.mv(path.resolve(__dirname, '..', 'static/users', fileName));
        res.json({message: 'success', data: req.files})
    } catch (error) {
        console.log(error)
    }
};

const postImagesUpload = async (req, res) => {
    try {
        const {image} = req.files;
        let fileName = v4() + '.png';
        image.mv(path.resolve(__dirname, '..', 'static/posts', fileName));
        res.json({message: 'success', data: req.files})
    } catch (error) {
        console.log(error)
    }
};

const removeAvatar = async (req, res) => {
    try {
        const {fileName} = req.body;
        console.log(__dirname)
        fs.unlinkSync()
    } catch (error) {
        console.log(error)
    }
};

export {
    avatarUpload, postImagesUpload, removeAvatar
}

