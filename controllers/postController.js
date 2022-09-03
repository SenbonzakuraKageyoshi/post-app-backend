import { Post, User, UserPost, UserLike } from "../models/models.js";

const create = async (req, res) => {
    try {
        const {title, text, postImgUrl, UserId} = req.body;

        const post = await Post.create({title, text, postImgUrl});
        const userPost = await UserPost.create({UserId, PostId: post.dataValues.id})

        res.json(userPost);
    } catch (error) {
        console.log(error);
        res.json({message: 'Ошибка создания поста'})
    }
};

const getAll = async (req, res) => {
    try {
        let { page } = req.body;

        page = page || 1;
        const limit = 3;

        let offset = page * limit - limit;

        const posts = await UserPost.findAll({include: [{model: User}, {model: Post}], limit, offset});
        const postsLength = await UserPost.findAll();

        const postsWithoutPrivateInfo = posts.map((post) => {
            post.User.email = null;
            post.User.number = null;
            post.User.passwordHash = null;
            return post;
        })

        return res.set('x-total-count', postsLength.length).set('Access-Control-Expose-Headers', 'X-Total-Count').json(postsWithoutPrivateInfo);
    } catch (error) {
        console.log(error);
        res.json({message: 'Ошибка получения постов'})
    }
};

const getUserPosts = async (req, res) => {
    try {
        let { id, page, isLength } = req.body;

        page = page || 1;
        const limit = 16;
        let offset = page * limit - limit;

        if(isLength){
            const posts = await UserPost.findAll({where: {UserId: id}, include: [{model: User}, {model: Post}]});

            return res.json(posts.length);
        }

        const posts = await UserPost.findAll({where: {UserId: id}, include: [{model: User}, {model: Post}], limit, offset});

        const postsWithoutPrivateInfo = posts.map((post) => {
            post.User.email = null;
            post.User.number = null;
            post.User.passwordHash = null;
            return post;
        })

        return res.set('x-total-count', postsWithoutPrivateInfo.length).set('Access-Control-Expose-Headers', 'X-Total-Count').json(postsWithoutPrivateInfo);   
    } catch (error) {
        console.log(error);
        res.json({message: 'Ошибка получения постов пользователя'})
    }
};

const getPost = async (req, res) => {
    try {
        const { id } = req.params;

        const post = await UserPost.findOne({where: { PostId: id }, include: [{model: User}, {model: Post}]});
        await Post.increment({views: 1}, { where: { id } });
        
        post.User.email = null;
        post.User.number = null;
        post.User.passwordHash = null;

        return res.json(post);
        
    } catch (error) {
        console.log(error);
        res.json({message: 'Ошибка получения поста'})
    }
};

const likePost = async (req, res) => {
    try {
        const {postId, userId} = req.body;

        const userLikes = await UserLike.create({UserId: userId, PostId: postId})
        const like = await Post.increment({likes: 1}, { where: { id: postId } })

        res.json(userLikes)
    } catch (error) {
        console.log(error);
        res.json({message: 'Не удалость лайкнуть пост'})
    }
};

const dislikePost = async (req, res) => {
    try {
        const {postId, userId} = req.body;

        const userLikes = await UserLike.destroy({where: { PostId: postId }})
        const like = await Post.decrement({likes: 1}, { where: { id: postId } })

        res.json(userLikes)
    } catch (error) {
        console.log(error); 
        res.json({message: 'Не удалость дизлайкнуть пост'})
    }
};

export {
    create, getAll, getPost, likePost, dislikePost, getUserPosts
}