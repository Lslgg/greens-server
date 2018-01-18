

var requireText = require('require-text');
var Images = requireText('./images/images.gql', require);
var Article = requireText('./article/article.gql', require);
var News = requireText('./lcnews/lcnews.gql', require); 
var Type = requireText('./type/type.gql', require); 

export const GreensSchema= [
    Images,
    Article,
    News,
    Type
];
