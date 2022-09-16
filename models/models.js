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
    subscibers: {type: DataTypes.INTEGER, defaultValue: 0, allowNull: false},
});

const Subscriber = sequelize.define('Subscriber', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false},
    UserSubscriberId:{type: DataTypes.INTEGER, allowNull: false},
    name: {type: DataTypes.STRING, allowNull: false},
    surname: {type: DataTypes.STRING, allowNull: false},
    avatarUrl: {type: DataTypes.STRING}
});
   
const Post = sequelize.define('Post', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false},
    title: {type: DataTypes.STRING, allowNull: false},
    text: {type: DataTypes.STRING, allowNull: false},
    likes: {type: DataTypes.INTEGER, defaultValue: 0, allowNull: false},
    views: {type: DataTypes.INTEGER, defaultValue: 0, allowNull: false},
    postImgUrl: {type: DataTypes.STRING},
});

const UserPost = sequelize.define('UserPost', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false},
});


const UserLike = sequelize.define('UserLike', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false},
});

const UserSubscribe = sequelize.define('UserSubscribe', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false},
});

User.belongsToMany(Post, {through: UserPost});
Post.belongsToMany(User, {through: UserPost});

UserPost.belongsTo(User, {foreignKey: 'UserId'});
UserPost.belongsTo(Post, {foreignKey: 'PostId'});

User.belongsToMany(Post, {through: UserLike});
Post.belongsToMany(User, {through: UserLike});

UserLike.belongsTo(User, {foreignKey: 'UserId'});
UserLike.belongsTo(Post, {foreignKey: 'PostId'});

User.belongsToMany(Subscriber, {through: UserSubscribe});
Subscriber.belongsToMany(User, {through: UserSubscribe});

UserSubscribe.belongsTo(Subscriber, {foreignKey: 'SubscriberId'});
UserSubscribe.belongsTo(User, {foreignKey: 'UserId'});

export {
    User, Post, UserPost, UserLike, UserSubscribe, Subscriber
}