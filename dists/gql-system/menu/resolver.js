"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const menu_1 = require("./menu");
class Menu {
    constructor() {
    }
}
Menu.Query = {
    getMenus(parent, __, context) {
        if (!context.user)
            return null;
        let promise = new Promise((resolve, reject) => {
            menu_1.default.find().then(res => {
                resolve(res);
            }).catch(err => resolve(null));
        });
        return promise;
    },
    getMenuById(parent, { id }, context) {
        if (!context.user)
            return null;
        let promise = new Promise((resolve, reject) => {
            menu_1.default.findById(id).then(res => {
                resolve(res);
            }).catch(err => resolve(null));
        });
        return promise;
    },
    getMenuPage(parent, { pageIndex = 1, pageSize = 10, menu }, context) {
        if (!context.user)
            return null;
        var userInfo = menu_1.default.find(menu)
            .skip((pageIndex - 1) * pageSize).limit(pageSize);
        return userInfo;
    },
    getMenuCount(parent, { menu }, context) {
        if (!context.user)
            return 0;
        var count = menu_1.default.count(menu);
        return count;
    },
    getMenuWhere(parent, { menu }, context) {
        if (!context.user)
            return null;
        //var users = MenuSchema.find({"pid":{"$in" : ["5a221555842273172c089eb1","5a2215d3842273172c089eb2"]}});
        return menu_1.default.find(menu);
    },
};
Menu.Mutation = {
    saveMenu(parent, { menu }, context) {
        if (!context.user)
            return null;
        if (menu.id && menu.id != "0") {
            return new Promise((resolve, reject) => {
                menu_1.default.findByIdAndUpdate(menu.id, menu, (err, res) => {
                    Object.assign(res, menu);
                    resolve(res);
                });
            });
        }
        return menu_1.default.create(menu);
    },
    deleteMenu(parent, { id }, context) {
        if (!context.user)
            return null;
        let promise = new Promise((resolve, reject) => {
            menu_1.default.findByIdAndRemove(id, (err, res) => {
                resolve(res != null);
            });
        });
        return promise;
    }
};
exports.Menu = Menu;
