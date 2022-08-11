import { Post, UserPost } from "../models/models.js";

const create = async (req, res) => {
    try {
        const {title, text, postImgUrl, UserId} = req.body;

        const post = await Post.create({title, text, postImgUrl});
        const userPost = await UserPost.create({UserId, PostId: post.id})

        res.json(userPost);
    } catch (error) {
        console.log(error);
        res.json({message: 'Ошибка создания поста'})
    }
};

export {
    create
}