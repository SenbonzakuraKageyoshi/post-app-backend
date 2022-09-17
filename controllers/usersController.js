import { User } from "../models/models.js";

const getAllUsers = (async (req, res) => {
    try {
        let { page } = req.body;

        page = page || 1;
        const limit = 25;
        let offset = page * limit - limit;

        const users = await User.findAll({limit, offset});
        const usersLength = await User.findAll();

        const usersWithoutPrivateInfo = users.map((user) => {
            user.email = null;
            user.passwordHash = null;
            user.number = null;
            return user;
        });

        return res.set('x-total-count', usersLength.length).set('Access-Control-Expose-Headers', 'X-Total-Count').json(usersWithoutPrivateInfo);

    } catch (error) {
        console.log(error)
        res.json({message: 'Ошибка получения пользователей'})
    }
});

const getUser = async (req, res) => {
    try {
        const { id } = req.body;

        const user = await User.findOne({ where: {id}});

        user.email = null;
        user.number = null;
        user.passwordHash = null;

        res.json({...user.dataValues});
    } catch (error) {   
        console.log(error)
        res.json(null)
    }
};


export {
    getAllUsers, getUser
}