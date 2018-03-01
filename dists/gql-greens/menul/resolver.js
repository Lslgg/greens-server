"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const menul_1 = require("./menul");
class Menul {
    constructor() {
    }
}
Menul.Query = {
    getMenul(parent, {}, context) {
        let promise = new Promise((resolve, reject) => {
            menul_1.default.find().then(res => {
                resolve(res);
            }).catch(err => resolve(null));
        });
        return promise;
    },
    getMenulById(parent, { id }, context) {
        let promise = new Promise((resolve, reject) => {
            menul_1.default.findById(id).then(res => {
                resolve(res);
            }).catch(err => resolve(null));
        });
        return promise;
    },
};
Menul.Mutation = {
    saveMenul(parent, { menul }, context) {
        if (menul.id && menul.id != "0") {
            return new Promise((resolve, reject) => {
                menul_1.default.findByIdAndUpdate(menul.id, menul, (err, res) => {
                    Object.assign(res, menul);
                    resolve(res);
                });
            });
        }
        return menul_1.default.create(menul);
    },
    deleteMenul(parent, { id }, context) {
        let promise = new Promise((resolve, reject) => {
            menul_1.default.findByIdAndRemove(id, (err, res) => {
                resolve(res != null);
            }).catch(err => reject(err));
        });
        return promise;
    }
};
exports.Menul = Menul;
