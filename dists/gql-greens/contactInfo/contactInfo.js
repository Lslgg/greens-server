"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
let schema = new mongoose_1.Schema({
    // id:string                
    comName1: String,
    comName2: String,
    sPhone: String,
    webName: String,
    comAddress: String,
    cPhone1: String,
    cPhone2: String,
    webSite: String,
    title: String,
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
exports.default = mongoose_1.model('ContactInfo', schema);
