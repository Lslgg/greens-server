"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const user_1 = require("./user");
const role_1 = require("../role/role");
const profile_1 = require("../profile/profile");
class User {
    constructor() {
    }
}
User.User = {
    Role(model) {
        return role_1.default.findById(model.roleId);
    },
    Profile(model) {
        return profile_1.default.findOne({ userId: model.id });
    }
};
User.Query = {
    getUsers(parent, __, context) {
        if (!context.user)
            return null;
        let promise = new Promise((resolve, reject) => {
            user_1.default.find().then(res => {
                resolve(res);
            }).catch(err => resolve(null));
        });
        return promise;
    },
    getUserById(parent, { id }, context) {
        if (!context.user)
            return null;
        let promise = new Promise((resolve, reject) => {
            user_1.default.findById(id).then(res => {
                resolve(res);
            }).catch(err => resolve(null));
        });
        return promise;
    },
    getUserPage(parent, { pageIndex = 1, pageSize = 10, user }, context) {
        if (!context.user)
            return null;
        var skip = (pageIndex - 1) * pageSize;
        var userInfo = user_1.default.find(user).skip(skip).limit(pageSize);
        return userInfo;
    },
    getUserWhere(parent, { user }, context) {
        if (!context.user)
            return null;
        // console.log(user);
        var users = user_1.default.find(user);
        return users;
    },
    getUserCount(parent, { user }, context) {
        if (!context.user)
            return 0;
        var count = user_1.default.count(user);
        return count;
    },
    login(parent, { username, password }, context) {
        return new Promise((resolve, reject) => {
            user_1.default.find({ username, password }).then(data => {
                if (data.length > 0) {
                    var user = data[0];
                    context.session.user = user;
                    resolve(user);
                }
                else {
                    context.session.user = null;
                    resolve(null);
                }
            });
        });
    },
    logOut(parent, {}, context) {
        context.user = null;
        context.session.user = null;
        return true;
    },
    currentUser(parent, {}, context) {
        if (!context.user)
            return null;
        let promise = new Promise((resolve, reject) => {
            let user = context.user;
            if (user) {
                user_1.default.findById(user._id).then(res => {
                    resolve(res);
                }).catch(err => resolve(null));
            }
            else {
                resolve(null);
            }
        });
        return promise;
    },
};
User.Mutation = {
    saveUser(parent, { user }, context) {
        if (!context.user)
            return null;
        if (user.id && user.id != "0") {
            return new Promise((resolve, reject) => {
                user_1.default.findByIdAndUpdate(user.id, user, (err, res) => {
                    Object.assign(res, user);
                    resolve(res);
                });
            });
        }
        return user_1.default.create(user);
    },
    deleteUser(parent, { id }, context) {
        if (!context.user)
            return null;
        let promise = new Promise((resolve, reject) => {
            user_1.default.findByIdAndRemove(id, (err, res) => {
                resolve(res != null);
            }).catch(err => reject(err));
        });
        return promise;
    }
};
exports.User = User;
