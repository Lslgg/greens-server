"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const product_1 = require("./product");
const fileManager_1 = require("../../common/file/fileManager");
class Product {
    constructor() {
    }
}
Product.Images = {
    Images(model) {
        let promise = new Promise((resolve, reject) => {
            let fm = new fileManager_1.FileManager();
            let imgs = fm.getFileByIds(model.imageIds);
            resolve(imgs);
        });
        return promise;
    }
};
Product.Query = {
    getProduct(parent, {}, context) {
        let promise = new Promise((resolve, reject) => {
            product_1.default.find().then(res => {
                resolve(res);
            }).catch(err => resolve(null));
        });
        return promise;
    },
    getProductById(parent, { id }, context) {
        let promise = new Promise((resolve, reject) => {
            product_1.default.findById(id).then(res => {
                resolve(res);
            }).catch(err => resolve(null));
        });
        return promise;
    },
    getProductPage(parent, { pageIndex = 1, pageSize = 10, product }, context) {
        var skip = (pageIndex - 1) * pageSize;
        var productInfo = product_1.default.find(product).skip(skip).limit(pageSize);
        return productInfo;
    },
    getProductWhere(parent, { product }, context) {
        var productInfo = product_1.default.find(product);
        return productInfo;
    },
    getProductCount(parent, { product }, context) {
        if (!context.user)
            return 0;
        var count = product_1.default.count(product);
        return count;
    },
};
Product.Mutation = {
    saveProduct(parent, { product }, context) {
        if (product.id && product.id != "0") {
            return new Promise((resolve, reject) => {
                product_1.default.findByIdAndUpdate(product.id, product, (err, res) => {
                    Object.assign(res, product);
                    resolve(res);
                });
            });
        }
        return product_1.default.create(product);
    },
    deleteProduct(parent, { id }, context) {
        let promise = new Promise((resolve, reject) => {
            product_1.default.findByIdAndRemove(id, (err, res) => {
                resolve(res != null);
            }).catch(err => reject(err));
        });
        return promise;
    }
};
exports.Product = Product;
