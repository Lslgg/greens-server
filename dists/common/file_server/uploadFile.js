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
const express = require("express");
const multer = require("multer");
const Loki = require("lokijs");
const utils_1 = require("./utils");
class UploadFile {
    constructor() {
        this.COLLECTION_NAME = 'editor';
        this.config();
    }
    config() {
        var storage = multer.diskStorage({
            destination: function (req, file, cb) {
                cb(null, 'uploads/editor');
            },
            filename: function (req, file, cb) {
                var index = file.originalname.lastIndexOf(".");
                var fileName = file.originalname.substr(0, index);
                var exit = file.originalname.substr(index);
                cb(null, fileName + '-' + Date.now() + exit);
            }
        });
        this.upload = multer({ storage: storage, fileFilter: utils_1.imageFilter });
        this.db = new Loki(`uploads/editor/editor.json`, { persistenceMethod: 'fs' });
    }
    router() {
        let router;
        router = express.Router();
        //上传图片
        router.post('/upload', this.upload.single('file'), (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const col = yield utils_1.loadCollection(this.COLLECTION_NAME, this.db);
                const data = col.insert(req.file);
                this.db.saveDatabase();
                const web = "http://" + req.hostname + ":" + req.app.settings.port + "/";
                res.send({ location: web + data.path });
            }
            catch (err) {
                res.sendStatus(400);
            }
        }));
        //上传图片2
        router.post('/profile', this.upload.single('avatar'), (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const col = yield utils_1.loadCollection(this.COLLECTION_NAME, this.db);
                const data = col.insert(req.file);
                this.db.saveDatabase();
                const web = "http://" + req.hostname + ":" + req.app.settings.port + "/";
                res.send({ link: web + data.path, id: data.id });
            }
            catch (err) {
                res.sendStatus(400);
            }
        }));
        //根据图片名字删除图片
        router.post('/delimg/:id', (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const col = yield utils_1.loadCollection(this.COLLECTION_NAME, this.db);
                const result = col.find({ filename: req.params.id })[0];
                if (!result) {
                    res.send({ success: false });
                    return;
                }
                utils_1.cleanFolder(result.destination, result.filename);
                col.remove(result);
                this.db.saveDatabase();
                res.send({ success: true });
            }
            catch (err) {
                res.sendStatus(400);
            }
        }));
        return router;
    }
}
exports.UploadFile = UploadFile;
