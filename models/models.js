import { DataTypes } from "sequelize";
import sequelize from '../db.js';

const User = sequelize.define('User', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false},
    name: {type: DataTypes.STRING, allowNull: false},
    surname: {type: DataTypes.STRING, allowNull: false},
    number: {type: DataTypes.STRING, allowNull: false},
    avatarUrl: {type: DataTypes.STRING},
    email: {type: DataTypes.STRING, allowNull: false},
    passwordHash: {type: DataTypes.STRING, allowNull: false},
});

const Post = sequelize.define('Post', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false},
    title: {type: DataTypes.STRING, allowNull: false},
    text: {type: DataTypes.STRING, allowNull: false},
    postImgUrl: {type: DataTypes.STRING},
});

const UserPost = sequelize.define('UserPost', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false},
});

User.belongsToMany(Post, {through: UserPost});
Post.belongsToMany(User, {through: UserPost});
User.belongsTo(Post, {foreignKey: 'postId'})

export {
    User, Post, UserPost
}