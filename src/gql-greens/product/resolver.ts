import ProductSchema, { IProductModel } from './product';
import { DocumentQuery, MongoosePromise } from 'mongoose';
import { FileManager } from '../../common/file/fileManager';
export class Product {
    constructor() {

    }

    static Images: any = {
		Images(model) {
			let promise = new Promise<Array<any>>((resolve, reject) => {
				let fm = new FileManager();
				let imgs = fm.getFileByIds(model.imageIds);
				resolve(imgs);
			});
			return promise;
		}
	};

    static Query: any = {
        getProduct(parent, { }, context): Promise<Array<IProductModel>> {
            if (!context.user) return null;

            let promise = new Promise<Array<IProductModel>>((resolve, reject) => {
                ProductSchema.find().then(res => {
                    resolve(res);
                }).catch(err => resolve(null));
            })
            return promise;
        },
        getProductById(parent, { id }, context): Promise<IProductModel> {
            if (!context.user) return null;

            let promise = new Promise<IProductModel>((resolve, reject) => {
                ProductSchema.findById(id).then(res => {
                    resolve(res);
                }).catch(err => resolve(null));
            });
            return promise;
        },

        getProductPage(parent, { pageIndex = 1, pageSize = 10,product }, context) {
            if (!context.user) return null;
            var skip = (pageIndex - 1) * pageSize
            var productInfo = ProductSchema.find(product).skip(skip).limit(pageSize)
            return productInfo;
        },

        getProductWhere(parent, { product }, context) {
            if (!context.user) return null;
            var productInfo = ProductSchema.find(product);
            return productInfo;
        },

        getProductCount(parent, { product }, context) {
            if (!context.user) return 0;
            var count = ProductSchema.count(product);
            return count;
        },
    }

    static Mutation: any = {
        saveProduct(parent, { product }, context) {
            if (!context.user) return null;
            if (product.id && product.id != "0") {
                return new Promise<IProductModel>((resolve, reject) => {
                    ProductSchema.findByIdAndUpdate(product.id, product, (err, res) => {
                        Object.assign(res, product);
                        resolve(res);
                    })
                });
            }
            return ProductSchema.create(product);
        },
        deleteProduct(parent, { id }, context): Promise<Boolean> {
            if (!context.user) return null;
            let promise = new Promise<Boolean>((resolve, reject) => {
                ProductSchema.findByIdAndRemove(id, (err, res) => {
                    resolve(res != null)
                }).catch(err => reject(err));
            });
            return promise;
        }
    }
}