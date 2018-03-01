"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
const del = require("del");
const multer = require("multer");
const Loki = require("lokijs");
const utils_1 = require("../file_server/utils");
class FileManager {
    constructor() {
        this.uploadDir = 'uploads';
        this.COLLECTION_NAME = 'db';
        //上传文件
        this.processUpload = (upload) => __awaiter(this, void 0, void 0, function* () {
            var { stream, filename, mimetype, encoding } = yield upload;
            var { id, path } = yield this.storeUpload({ stream, filename });
            var originalname = filename; //上传的文件名
            filename = `${id}-${filename}`; //新的文件名
            const col = yield utils_1.loadCollection(this.COLLECTION_NAME, this.db);
            const data = col.insert({ id, originalname, filename, mimetype, encoding, path });
            this.db.saveDatabase();
            return data;
        });
        //设置上传
        this.storeUpload = ({ stream, filename }) => __awaiter(this, void 0, void 0, function* () {
            const shortid = require('shortid');
            const id = shortid.generate();
            const path = `${this.uploadDir}/${id}-${filename}`;
            return new Promise((resolve, reject) => stream.pipe(fs_1.createWriteStream(path))
                .on('finish', () => resolve({ id, path }))
                .on('error', reject));
        });
        //清除文件
        this.cleanFolder = (folderPath, fileName) => {
            del.sync([`${folderPath}${fileName}`, `!${folderPath}`]);
        };
        this.config();
    }
    config() {
        var storage = multer.diskStorage({
            destination: function (req, file, cb) {
                cb(null, 'uploads');
            },
            filename: function (req, file, cb) {
                var index = file.originalname.lastIndexOf(".");
                var fileName = file.originalname.substr(0, index);
                var exit = file.originalname.substr(index);
                cb(null, fileName + '-' + Date.now() + exit);
            }
        });
        this.upload = multer({ storage: storage, fileFilter: utils_1.imageFilter });
        this.db = new Loki(`uploads/db.json`, { persistenceMethod: 'fs' });
    }
    //根据id查找文件
    getFileById(id) {
        var promise = new Promise((resolve, reject) => {
            utils_1.loadCollection(this.COLLECTION_NAME, this.db).then((col) => {
                const result = col.findOne({ id: id });
                resolve(result);
            });
        });
        return promise;
    }
    //根据id列表查找文件
    getFileByIds(ids) {
        return __awaiter(this, void 0, void 0, function* () {
            var promise = new Promise((resolve, reject) => {
                utils_1.loadCollection(this.COLLECTION_NAME, this.db).then((col) => {
                    const result = col.find({ id: { '$in': ids } });
                    resolve(result);
                });
            });
            return promise;
        });
    }
    /**
     * 删除单个文件
    */
    delFild(id) {
        var promise = new Promise((resolve, reject) => {
            this.getFileById(id).then((file) => {
                this.cleanFolder("uploads/", file.filename);
                utils_1.loadCollection(this.COLLECTION_NAME, this.db).then((col) => {
                    col.remove(file);
                    this.db.saveDatabase();
                    resolve(true);
                });
            });
        });
        return promise;
    }
    /**
    * 批量删除删除文件
    */
    delFilds(ids) {
        if (ids.length >= 0) {
            return Promise.all(ids.map(this.delFild));
        }
        return null;
    }
}
exports.FileManager = FileManager;
