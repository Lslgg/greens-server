"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_1 = require("graphql");
const language_1 = require("graphql/language");
exports.default = new graphql_1.GraphQLScalarType({
    name: 'Comparison',
    description: `\`Mongodb Comparison 查询 \` scalar字段(不加$) \n
    语法: 
        等于 {eq:"admin"}
        in查询 {in:[1.,2,3]}
        小于 {lt:10}
        小于等于 {lte:10} | 
        大于 {gt:10}
        大于等于 {gte:10}
        between {lte:1,gte:10}     
        参考:https://docs.mongodb.com
    `,
    parseValue(value) {
        return value; // sent to resolvers
    },
    serialize(value) {
        return value; // sent to the client
    },
    parseLiteral(ast) {
        if (ast.kind === language_1.Kind.OBJECT) {
            var strList = [];
            if (ast.fields.length == 0)
                return JSON.parse("{}");
            for (var i = 0; i < ast.fields.length; i++) {
                var field = ast.fields[i]; //字段对象
                var key = field.name.value; //健
                var valType = field.value.kind; //类型
                var val = ""; //值
                if (valType == "ListValue") {
                    val = field.value["values"].map(p => {
                        if (p.kind == "StringValue") {
                            return `"${p.value}"`;
                        }
                        else {
                            return p.value;
                        }
                    });
                }
                else {
                    val = field.value["value"];
                }
                var str = ""; //合并成json字符串
                if (valType == "StringValue") {
                    str = `"$${key}":"${val}"`;
                }
                else if (valType == "ListValue") {
                    str = `"$${key}":[${val}]`;
                }
                else {
                    str = `"$${key}":${val}`;
                }
                strList.push(str);
            }
            var info = `{${strList.join(",")}}`;
            info = JSON.parse(info);
            return info;
        }
        if (ast.kind === language_1.Kind.STRING ||
            ast.kind === language_1.Kind.INT || ast.kind === language_1.Kind.BOOLEAN) {
            // console.log(ast.value)
            return ast.value;
        }
    }
});
