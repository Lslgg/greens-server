"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fileManager_1 = require("../../common/file/fileManager");
class File {
    constructor() {
    }
}
File.Query = {
    images(parent, { id }, context) {
        var fm = new fileManager_1.FileManager();
        return fm.getFileById(id);
    }
};
File.Mutation = {
    singleUpload(parent, { file }, context) {
        var fm = new fileManager_1.FileManager();
        return fm.processUpload(file);
    },
    multipleUpload(parent, { files }, context) {
        var fm = new fileManager_1.FileManager();
        return Promise.all(files.map(fm.processUpload));
    },
    deleFile(parent, { id }, context) {
        var fm = new fileManager_1.FileManager();
        return fm.delFild(id);
    }
};
exports.File = File;
