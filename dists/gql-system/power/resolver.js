"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const power_1 = require("./power");
const menu_1 = require("../menu/menu");
class Power {
    constructor() {
    }
}
Power.Power = {
    Menu(model) {
        return new Promise((resolve, reject) => {
            menu_1.default.findById(model.menuId).then(menu => {
                resolve(menu);
            });
        });
    },
};
Power.Query = {
    getPowers(parent, __, context) {
        if (!context.user)
            return null;
        let promise = new Promise((resolve, reject) => {
            power_1.default.find().then(res => {
                resolve(res);
            }).catch(err => resolve(null));
        });
        return promise;
    },
    getPowerById(parent, { id }, context) {
        if (!context.user)
            return null;
        let promise = new Promise((resolve, reject) => {
            power_1.default.findById(id).then(res => {
                resolve(res);
            }).catch(err => resolve(null));
        });
        return promise;
    },
    getPowerPage(parent, { pageIndex = 1, pageSize = 10, power }, context) {
        if (!context.user)
            return null;
        var skip = (pageIndex - 1) * pageSize;
        var list = power_1.default.find(power).skip(skip).limit(pageSize);
        return list;
    },
    getPowerCount(parent, { power }, context) {
        if (!context.user)
            return 0;
        var count = power_1.default.count(power);
        return count;
    },
    getPowerWhere(parent, { power }, context) {
        if (!context.user)
            return null;
        var users = power_1.default.find(power);
        return users;
    },
};
Power.Mutation = {
    savePower(parent, { power }, context) {
        if (!context.user)
            return null;
        if (power.id && power.id != "0") {
            return new Promise((resolve, reject) => {
                power_1.default.findByIdAndUpdate(power.id, power, (err, res) => {
                    Object.assign(res, power);
                    resolve(res);
                });
            });
        }
        return power_1.default.create(power);
    },
    deletePower(parent, { id }, context) {
        if (!context.user)
            return null;
        let promise = new Promise((resolve, reject) => {
            power_1.default.findByIdAndRemove(id, (err, res) => {
                resolve(res != null);
            });
        });
        return promise;
    },
    addAllPower(parent, { power }, context) {
        if (!context.user)
            return null;
        return power_1.default.create(power);
    },
    delAllPower(parent, { power }, context) {
        if (!context.user)
            return null;
        let promise = new Promise((resolve, reject) => {
            if (!power)
                resolve(false);
            power_1.default.find(power).remove((err, res) => {
                resolve(res != null);
            });
        });
        return promise;
    }
};
exports.Power = Power;
