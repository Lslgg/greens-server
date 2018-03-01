"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_1 = require("graphql");
const language_1 = require("graphql/language");
exports.default = new graphql_1.GraphQLScalarType({
    name: 'Json',
    description: 'Json字符串转换为对象',
    parseValue(value) {
        let json = JSON.parse(value);
        return json; // sent to the client
    },
    serialize(value) {
        return value; // sent to resolvers
    },
    parseLiteral(ast) {
        if (ast.kind !== language_1.Kind.STRING) {
            throw new graphql_1.GraphQLError(`Query error: Can only parse dates strings, got a: ${ast.kind}`, [ast]);
        }
        try {
            let json = JSON.parse(ast.value);
            return json;
        }
        catch (_a) {
            return ast.value;
        }
    },
});
