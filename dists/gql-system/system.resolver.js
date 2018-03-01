"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const resolver_1 = require("./user/resolver");
const resolver_2 = require("./role/resolver");
const resolver_3 = require("./menu/resolver");
const resolver_4 = require("./power/resolver");
const resolver_5 = require("./profile/resolver");
const resolver_6 = require("./file/resolver");
class SystemResolver {
    constructor() {
    }
}
SystemResolver.System = {
    User: resolver_1.User.User,
    Role: resolver_2.Role.Role,
    Power: resolver_4.Power.Power,
};
SystemResolver.Query = Object.assign({}, resolver_1.User.Query, resolver_2.Role.Query, resolver_3.Menu.Query, resolver_4.Power.Query, resolver_5.Profile.Query, resolver_6.File.Query);
SystemResolver.Mutation = Object.assign({}, resolver_1.User.Mutation, resolver_2.Role.Mutation, resolver_3.Menu.Mutation, resolver_4.Power.Mutation, resolver_5.Profile.Mutation, resolver_6.File.Mutation);
exports.SystemResolver = SystemResolver;
