"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
let schema = new mongoose_1.Schema({
    // id:string                
    name1: String,
    name2: String,
    name3: String,
    name4: String,
    name5: String,
    name6: String,
    name7: String,
    createAt: {
        type: Date,
        default: new Date(),
        required: true
    },
    updateAt: {
        type: Date,
        default: new Date(),
        required: true
    },
});
exports.default = mongoose_1.model('Menul', schema);
