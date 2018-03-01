"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const resolver_1 = require("./images/resolver");
const resolver_2 = require("./article/resolver");
const resolver_3 = require("./lcnews/resolver");
const resolver_4 = require("./type/resolver");
const resolver_5 = require("./product/resolver");
const resolver_6 = require("./contactInfo/resolver");
const resolver_7 = require("./menul/resolver");
const resolver_8 = require("./garden/resolver");
class GreensResolver {
    constructor() {
    }
}
GreensResolver.Greens = {
    Article: resolver_2.Article.Images,
    Images: resolver_1.Images.Images,
    lcNews: resolver_3.lcNews.Images,
    Product: resolver_5.Product.Images,
    Garden: resolver_8.Garden.Images,
};
GreensResolver.Query = Object.assign({}, resolver_1.Images.Query, resolver_2.Article.Query, resolver_3.lcNews.Query, resolver_4.Type.Query, resolver_5.Product.Query, resolver_6.ContactInfo.Query, resolver_7.Menul.Query, resolver_8.Garden.Query);
GreensResolver.Mutation = Object.assign({}, resolver_1.Images.Mutation, resolver_2.Article.Mutation, resolver_3.lcNews.Mutation, resolver_4.Type.Mutation, resolver_5.Product.Mutation, resolver_6.ContactInfo.Mutation, resolver_7.Menul.Mutation, resolver_8.Garden.Mutation);
exports.GreensResolver = GreensResolver;
