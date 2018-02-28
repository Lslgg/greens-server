

var requireText = require('require-text');
var Images = requireText('./images/images.gql', require);
var Article = requireText('./article/article.gql', require);
var News = requireText('./lcnews/lcnews.gql', require);
var Type = requireText('./type/type.gql', require);
var Product = requireText('./product/product.gql', require);
var ContactInfo = requireText('./contactInfo/contactInfo.gql', require);
var Menul = requireText('./menul/menul.gql', require);
var Garden = requireText('./garden/garden.gql', require);

export const GreensSchema = [
    Images,
    Article,
    News,
    Type,
    Product,
    ContactInfo,
    Menul,
    Garden
];
