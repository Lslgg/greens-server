"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_1 = require("graphql");
const language_1 = require("graphql/language");
exports.default = new graphql_1.GraphQLScalarType({
    name: 'RegExp',
    description: '正则表达式类型，用于正则查询！',
    parseValue(value) {
        let regex = new RegExp(value);
        return regex; // sent to resolvers
    },
    serialize(value) {
        let regex = new RegExp(value);
        return regex; // sent to the client
    },
    parseLiteral(ast) {
        if (ast.kind !== language_1.Kind.STRING) {
            throw new graphql_1.GraphQLError(`Query error: Can only parse dates strings, got a: ${ast.kind}`, [ast]);
        }
        let regex = new RegExp(ast.value);
        return regex;
    },
});
