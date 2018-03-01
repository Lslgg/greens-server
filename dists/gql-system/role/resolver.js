"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const role_1 = require("./role");
const power_1 = require("../power/power");
class Role {
    constructor() {
    }
}
Role.Role = {
    Powers(model, info) {
        let promise = new Promise((resolve, reject) => {
            role_1.RolePowerSchema.find({ roleId: model.id }).then(res => {
                var powerIds = res.map(p => p.powerId);
                power_1.default.find({ '_id': { $in: powerIds } }).skip(0).limit(info.limit).then(res => {
                    resolve(res);
                }).catch(err => resolve(null));
            });
        });
        return promise;
    }
};
Role.Query = {
    getRoles(parent, __, context) {
        if (!context.user)
            return null;
        let promise = new Promise((resolve, reject) => {
            role_1.default.find().then(res => {
                resolve(res);
            }).catch(err => resolve(null));
        });
        return promise;
    },
    getRoleById(parent, { id }, context) {
        if (!context.user)
            return null;
        let promise = new Promise((resolve, reject) => {
            role_1.default.findById(id).then(res => {
                resolve(res);
            }).catch(err => resolve(null));
        });
        return promise;
    },
    getRolePage(parent, { pageIndex = 1, pageSize = 10, role }, context) {
        if (!context.user)
            return null;
        var skip = (pageIndex - 1) * pageSize;
        var userInfo = role_1.default.find(role).skip(skip).limit(pageSize);
        return userInfo;
    },
    getRoleCount(parent, { role }, context) {
        if (!context.user)
            return 0;
        var count = role_1.default.count(role);
        return count;
    },
    getRoleWhere(parent, { role }, context) {
        if (!context.user)
            return null;
        var users = role_1.default.find(role);
        return users;
    },
};
Role.Mutation = {
    saveRole(parent, { role }, context) {
        if (!context.user)
            return null;
        if (role.id && role.id != "0") {
            return new Promise((resolve, reject) => {
                role_1.default.findByIdAndUpdate(role.id, role, (err, res) => {
                    Object.assign(res, role);
                    resolve(res);
                });
            });
        }
        return role_1.default.create(role);
    },
    deleteRole(parent, { id }, context) {
        if (!context.user)
            return null;
        let promise = new Promise((resolve, reject) => {
            role_1.default.findByIdAndRemove(id, (err, res) => {
                resolve(res != null);
            });
        });
        return promise;
    },
    addRolePower(parent, { rolePower }, context) {
        if (!context.user)
            return null;
        return new Promise((resolve, reject) => {
            role_1.RolePowerSchema.create(rolePower, (err, res) => {
                if (err != null)
                    reject(err);
                role_1.default.findById(rolePower.roleId).then(res => {
                    resolve(res);
                });
            }).catch(err => { resolve(err); });
        });
    },
    addAllRolePower(parent, { rolePower }, context) {
        if (!context.user)
            return null;
        return new Promise((resolve, reject) => {
            role_1.RolePowerSchema.create(rolePower, (err, res) => {
                if (err != null)
                    reject(null);
                if (!rolePower || rolePower.length <= 0)
                    resolve(null);
                role_1.default.findById(rolePower[0].roleId).then(res => {
                    resolve(res);
                });
            }).catch(err => { resolve(err); });
        });
    },
    delPowerbyRoleId(parent, { roleId }, context) {
        if (!context.user)
            return null;
        let promise = new Promise((resolve, reject) => {
            role_1.RolePowerSchema.find({ roleId: roleId }).remove().then(res => {
                resolve(true);
            });
        });
        return promise;
    },
    delPowerbyId(parent, { id }, context) {
        if (!context.user)
            return null;
        let promise = new Promise((resolve, reject) => {
            role_1.RolePowerSchema.findByIdAndRemove(id, (err, res) => {
                resolve(res != null);
            });
        });
        return promise;
    },
    delAllPowerbyId(parent, { roleId, id }, context) {
        if (!context.user)
            return null;
        let promise = new Promise((resolve, reject) => {
            role_1.RolePowerSchema.find({ powerId: { $in: id }, roleId: roleId }).remove().then(res => {
                resolve(true);
            }).catch(err => resolve(err));
        });
        return promise;
    }
};
exports.Role = Role;
