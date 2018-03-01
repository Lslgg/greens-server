"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const scalar_1 = require("./common/scalar/scalar");
const gql_system_1 = require("./gql-system");
const gql_greens_1 = require("./gql-greens");
exports.default = Object.assign({ Query: Object.assign({}, gql_system_1.SystemResolver.Query, gql_greens_1.GreensResolver.Query), Mutation: Object.assign({}, gql_system_1.SystemResolver.Mutation, gql_greens_1.GreensResolver.Mutation) }, gql_system_1.SystemResolver.System, scalar_1.Scalar.Scalar, gql_greens_1.GreensResolver.Greens);
