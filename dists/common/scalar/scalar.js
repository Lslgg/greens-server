"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Date_1 = require("./Date");
const Comparison_1 = require("./Comparison");
const RegExp_1 = require("./RegExp");
const Json_1 = require("./Json");
const apollo_upload_server_1 = require("apollo-upload-server");
class Scalar {
    constructor() {
    }
}
Scalar.Scalar = {
    Comparison: Comparison_1.default,
    Date: Date_1.default,
    RegExp: RegExp_1.default,
    Json: Json_1.default,
    Upload: apollo_upload_server_1.GraphQLUpload
};
exports.Scalar = Scalar;
