"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_1 = require("graphql");
const language_1 = require("graphql/language");
exports.default = new graphql_1.GraphQLScalarType({
    name: 'Date',
    description: '日期类型',
    parseValue(value) {
        return new Date(value); // sent to resolvers
    },
    serialize(value) {
        return value.toISOString(); // sent to the client
    },
    parseLiteral(ast) {
        if (ast.kind !== language_1.Kind.STRING) {
            throw new graphql_1.GraphQLError(`Query error: Can only parse dates strings, got a: ${ast.kind}`, [ast]);
        }
        if (isNaN(Date.parse(ast.value))) {
            throw new graphql_1.GraphQLError(`Query error: not a valid date`, [ast]);
        }
        return new Date(ast.value);
    },
});
