import { Subscriber, UserSubscribe, User } from "../models/models.js";

const subscribe = async (req, res) => {
    try {
        const { subscriberId, name, surname, avatarUrl, id } = req.body;

        const subscriber = await Subscriber.create({UserSubscriberId: subscriberId, name, surname, avatarUrl});
        console.log(subscriber)
        const userSubscribe = await UserSubscribe.create({UserId: id, SubscriberId: subscriber.dataValues.id});
        await User.increment({subscibers: 1}, { where: { id } });

        res.json(userSubscribe);
    } catch (error) {
        console.log(error)
        res.json({message: 'Не удалось подписаться'})
    }
};

const unSubscribe = async (req, res) => {
    try {
        const { userId, subscriberId } = req.body;

        const subscriberForId = await Subscriber.findOne({where: { UserSubscriberId: subscriberId }});
        await Subscriber.destroy({where: { UserSubscriberId: subscriberId }});
        await UserSubscribe.destroy({where: { SubscriberId: subscriberForId.id }});

        await User.decrement({subscibers: 1}, { where: { id: userId } })

        res.json(subscriberForId);
    } catch (error) {
        console.log(error)
        res.json({message: 'Не удалось отписаться'})
    }
};

const getSubscribers = async (req, res) => {
    try {
        let { id, page } = req.body;

        page = page || 1;
        const limit = 16;
        let offset = page * limit - limit;

        const subscibers =  await UserSubscribe.findAll({where: { UserId: id }, limit, offset, include: [{model: Subscriber}]});  

        res.json(subscibers)
    } catch (error) {
        console.log(error)
        res.json({message: 'Не удалось получить подписчиков'})
    }
}

export {
    subscribe, unSubscribe, getSubscribers
}