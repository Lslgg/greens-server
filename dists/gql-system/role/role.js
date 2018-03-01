"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
let RoleSchema = new mongoose_1.Schema({
    roleName: {
        type: String,
        default: '',
        unique: true,
        required: true
    },
    desc: String,
    code: String,
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
    },
});
function ToObjectId(id) { return mongoose_1.Types.ObjectId(id); }
exports.ToObjectId = ToObjectId;
exports.RolePowerSchema = mongoose_1.model("RolePower", new mongoose_1.Schema({
    roleId: String,
    powerId: String
}));
exports.default = mongoose_1.model('Role', RoleSchema);
