"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
let UserSchema = new mongoose_1.Schema({
    name: String,
    username: {
        type: String,
        default: '',
        required: true
    },
    email: String,
    password: String,
    roleId: String,
    profileId: String,
    isValid: {
        type: Boolean,
        default: true
    },
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
exports.default = mongoose_1.model('User', UserSchema);
