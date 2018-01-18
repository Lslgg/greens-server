import { Images } from './images/resolver';
import { Article } from './article/resolver';
import { lcNews } from './lcnews/resolver';
import { Type } from './type/resolver';

export class GreensResolver {
    constructor() {

    }

    static Greens: any = {
        Article: Article.Images,
        Images: Images.Images,
        lcNews: lcNews.Images,
    }


    static Query: any = {
        ...Images.Query,
        ...Article.Query,
        ...lcNews.Query,
        ...Type.Query,
    }

    static Mutation: any = {
        ...Images.Mutation,
        ...Article.Mutation,
        ...lcNews.Mutation,
        ...Type.Mutation,
    }
}