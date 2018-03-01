"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var { makeExecutableSchema } = require('graphql-tools');
var requireText = require('require-text');
const resolvers_1 = require("./resolvers");
var Base = requireText('./base.gql', require);
const gql_system_1 = require("./gql-system");
const gql_greens_1 = require("./gql-greens");
//基础表
var typeDefs = [Base];
//系统表
typeDefs = typeDefs.concat(gql_system_1.SystemSchema);
//聊城韭菜
typeDefs = typeDefs.concat(gql_greens_1.GreensSchema);
const schema = makeExecutableSchema({
    typeDefs: typeDefs,
    resolvers: resolvers_1.default,
    logger: { log: e => {
            // console.log(e)
        } }
});
exports.default = schema;
