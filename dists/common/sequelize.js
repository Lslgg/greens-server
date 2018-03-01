"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Sequelize = require("sequelize");
class MysqDB {
    constructor(tName) {
        this.tName = tName;
        this.sequelize = new Sequelize("game", "root", "123456", {
            host: "localhost",
            dialect: 'mysql',
            pool: { max: 5, min: 0, idle: 30000 },
            operatorsAliases: false,
            logging: false,
            dialectOptions: {
                multipleStatements: true
            },
        });
    }
    /**
     * 根据传入的sql语句查询，
     * 适用于复杂查询
     * @param sql
     */
    findSql(sql) {
        let promise = new Promise((resolve, reject) => {
            this.sequelize.query(sql, { type: this.sequelize.QueryTypes.SELECT }).then(data => {
                resolve(data);
            }).catch(error => reject(error));
        });
        return promise;
    }
    /**
     * 查询所有
     * @param sql
     */
    find() {
        var sql = `SELECT * FROM ${this.tName}`;
        let promise = new Promise((resolve, reject) => {
            this.sequelize.query(sql, { type: this.sequelize.QueryTypes.SELECT }).then(data => {
                resolve(data);
            }).catch(error => reject(error));
        });
        return promise;
    }
    /**
     * 根据ID查找
     * @param id
     */
    findById(id) {
        var sql = `SELECT * FROM ${this.tName} WHERE id=${id}`;
        let promise = new Promise((resolve, reject) => {
            this.sequelize.query(sql, { type: this.sequelize.QueryTypes.SELECT }).then(data => {
                resolve(data[0]);
            }).catch(err => reject(err));
        });
        return promise;
    }
    /**
     * 根据条件分页查找
     * @param pageIndex
     * @param pageSize
     * @param where
     */
    findPage(pageIndex, pageSize, where = "1=1", order = "id") {
        var sql = `SELECT * FROM ${this.tName} WHERE ${where}  
                ORDER BY ${order} LIMIT ${(pageIndex - 1) * pageSize}, ${pageSize}`;
        let promise = new Promise((resolve, reject) => {
            this.sequelize.query(sql, { type: this.sequelize.QueryTypes.SELECT }).then(data => {
                resolve(data);
            }).catch(error => reject(error));
        });
        return promise;
    }
    /**
     * 根据条件查找总数
     * @param where
     */
    findCount(where = "1=1") {
        var sql = `SELECT count(*) count FROM ${this.tName} WHERE ${where}`;
        var promise = new Promise((resolve, reject) => {
            this.sequelize.query(sql, { type: this.sequelize.QueryTypes.SELECT }).then(result => {
                var count = result[0]["count"];
                resolve(count);
            });
        });
        return promise;
    }
    /**
     * 根据条件查找
     * @param where
     */
    findWhere(where = "1=1", order = "") {
        var sql = `SELECT * FROM ${this.tName} WHERE ${where} ${order}`;
        let promise = new Promise((resolve, reject) => {
            this.sequelize.query(sql, { type: this.sequelize.QueryTypes.SELECT }).then(data => {
                resolve(data);
            }).catch(error => reject(error));
        });
        return promise;
    }
    /**
     * 添加
     * @param info
     * @return 添加的对象
     */
    add(info) {
        var { fields, fieldValues } = this.toAddStr(info);
        var sql = `INSERT INTO ${this.tName} (${fields}) VALUES (${fieldValues});
                SELECT LAST_INSERT_ID() as id;`;
        let promise = new Promise((resolve, reject) => {
            this.sequelize.query(sql, { type: this.sequelize.QueryTypes.SELECT })
                .then(data => {
                var id = data[1][0]["id"];
                if (!id) {
                    resolve(null);
                    return;
                }
                this.findById(id).then(data => resolve(data));
            }).catch(error => reject(error));
        });
        return promise;
    }
    /**
     * 修改
     * @param sql
     * @return 修改的对象
     */
    update(dealer, id) {
        var updateStr = this.toUpStr(dealer);
        var sql = `UPDATE ${this.tName} SET ${updateStr} WHERE id="${id}"`;
        let promise = new Promise((resolve, reject) => {
            this.sequelize.query(sql, { type: this.sequelize.QueryTypes.UPDATE })
                .then(data => {
                this.findById(id).then(data => resolve(data));
            }).catch(error => reject(error));
        });
        return promise;
    }
    /**
    * 修改
    * @param sql
    * @return 是否成功
    */
    updateByStr(updateStr, where = " 1=1 ") {
        var sql = `UPDATE ${this.tName} SET ${updateStr} WHERE ${where}`;
        let promise = new Promise((resolve, reject) => {
            this.sequelize.query(sql, { type: this.sequelize.QueryTypes.UPDATE })
                .then(data => resolve(data[1])).catch(error => reject(error));
        });
        return promise;
    }
    /**
     * 删除
     * @param where
     * @return 是否成功
     */
    delete(id) {
        var sql = `DELETE FROM ${this.tName} WHERE id="${id}"`;
        let promise = new Promise((resolve, reject) => {
            this.sequelize.query(sql, { type: this.sequelize.QueryTypes.DELETE })
                .then(data => {
                resolve(!data);
            }).catch(error => reject(error));
        });
        return promise;
    }
    /**
     * 将对象转换为修改的字符串
     * @param info
     */
    toUpStr(info) {
        var str = JSON.stringify(info);
        if (!str)
            return "";
        str = str.replace(/(":)/g, "=");
        str = str.replace(/(,")/g, ",");
        str = str.replace(/({")/g, "");
        str = str.replace(/(})/g, "");
        return str;
    }
    /**
     * 将对象转换为添加字符串
     * @param info
     * @retrun 字段名和字段值
     */
    toAddStr(info) {
        var keys = Object.keys(info);
        var values = Object.keys(info).map((key) => `"${info[key]}"`);
        var fields = keys.join(',');
        var fieldValues = values.join(',');
        return { fields, fieldValues };
    }
}
exports.MysqDB = MysqDB;
