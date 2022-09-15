import { Subscriber, UserSubscribe, User } from "../models/models.js";

const subscribe = async (req, res) => {
    try {
        const { subscriberId, id } = req.body;

        await Subscriber.create({id: subscriberId});
        const userSubscribe = await UserSubscribe.create({UserId: id, SubscriberId: subscriberId});
        await User.increment({subscibers: 1}, { where: { id } });

        res.json(userSubscribe);
    } catch (error) {
        console.log(error)
        res.json({message: 'Не удалось подписаться'})
    }
};

const unSubscribe = async (req, res) => {
    try {
        const { subscriberId } = req.body;

        const subscriber = await Subscriber.destroy({where: { id: subscriberId }});
        const userSubscribe = await UserSubscribe.destroy({where: { SubscriberId: subscriberId }});
        await User.decrement({subscibers: 1}, { where: { id } })

        res.json({message: 'success'});
    } catch (error) {
        console.log(error)
        res.json({message: 'Не удалось отписаться'})
    }
};

export {
    subscribe, unSubscribe
}