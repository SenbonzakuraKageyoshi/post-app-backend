import { Post, User, UserPost, PostLike } from "../models/models.js";

const create = async (req, res) => {
    try {
        const {title, text, postImgUrl, userId} = req.body;

        const post = await Post.create({title, text, postImgUrl});
        const userPost = await UserPost.create({UserId: userId, PostId: post.dataValues.id})

        res.json(userPost);
    } catch (error) {
        console.log(error);
        res.json({message: 'Ошибка создания поста'})
    }
};

const getAll = async (req, res) => {
    try {
        const { id } = req.body;
        if(!id){
            const posts = await UserPost.findAll({include: [{model: User}, {model: Post}]});
            // доделать получение постлайков
            return res.json(posts);
        }else{
            const posts = await UserPost.findAll({where: { id }}, {include: [{model: User}]});
            // доделать получение постлайков
            return res.json(posts);
        }
    } catch (error) {
        console.log(error);
        res.json({message: 'Ошибка получения постов'})
    }
};

const getPost = async (req, res) => {
    try {
        const { id } = req.body;

        let liked = false;

        const post = await UserPost.findAll({where: { id }}, {include: [{model: User}, {model: Post}]});

        return res.json(post);
        
    } catch (error) {
        console.log(error);
        res.json({message: 'Ошибка получения поста'})
    }
};

const likePost = async (req, res) => {
    try {
        const {postId, userId} = req.body;

        const postLike = await PostLike.create({UserId: userId, PostId: postId})

        res.json(postLike)
    } catch (error) {
        console.log(error);
        res.json({message: 'Не удалость лайкнуть пост'})
    }
}

export {
    create, getAll, getPost, likePost
}