import { User } from "../models/models.js";

const getAllUsers = (async (req, res) => {
    try {
        let { page } = req.body;

        page = page || 1;
        const limit = 16;
        let offset = page * limit - limit;

        const users = await User.findAll({limit, offset});

        const postsWithoutPrivateInfo = users.map((user) => {
            user.email = null;
            user.passwordHash = null;
            user.number = null;
            return user;
        })

        res.json(postsWithoutPrivateInfo)

    } catch (error) {
        console.log(error)
        res.json({message: 'Ошибка получения пользователей'})
    }
});

export {
    getAllUsers
}