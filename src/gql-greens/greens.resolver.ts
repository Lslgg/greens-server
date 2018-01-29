import { Images } from './images/resolver';
import { Article } from './article/resolver';
import { lcNews } from './lcnews/resolver';
import { Type } from './type/resolver';
import { Product } from './product/resolver';
import { ContactInfo } from './contactInfo/resolver'
import { Menul } from './menul/resolver'

export class GreensResolver {
    constructor() {

    }

    static Greens: any = {
        Article: Article.Images,
        Images: Images.Images,
        lcNews: lcNews.Images,
        Product: Product.Images,
    }


    static Query: any = {
        ...Images.Query,
        ...Article.Query,
        ...lcNews.Query,
        ...Type.Query,
        ...Product.Query,
        ...ContactInfo.Query,
        ...Menul.Query,
    }

    static Mutation: any = {
        ...Images.Mutation,
        ...Article.Mutation,
        ...lcNews.Mutation,
        ...Type.Mutation,
        ...Product.Mutation,
        ...ContactInfo.Mutation,
        ...Menul.Mutation,
    }
}