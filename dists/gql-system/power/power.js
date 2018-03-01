"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const OPERATION = ['SHOW', 'ADD', 'UPDATE', 'DELETE'];
let schema = new mongoose_1.Schema({
    title: String,
    operation: {
        type: [String],
        enum: OPERATION
    },
    code: String,
    url: String,
    explain: String,
    type: String,
    menuId: String,
    isValid: Boolean,
    createAt: {
        type: Date,
        default: new Date(),
        required: true
    },
    updateAt: {
        type: Date,
        default: new Date(),
        required: true
    }
});
exports.default = mongoose_1.model('Power', schema);
