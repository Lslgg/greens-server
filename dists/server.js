"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const middleware_1 = require("graphql-voyager/middleware");
const Mongoose = require("mongoose");
const schema_1 = require("./schema");
const path = require("path");
var bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const passport = require('passport');
const expressValidator = require('express-validator');
var session = require('express-session');
const MongoStore = require('connect-mongo')(session);
var cors = require('cors');
var graphqlHTTP = require('express-graphql');
const { graphqlExpress, graphiqlExpress } = require('apollo-server-express');
var { makeExecutableSchema } = require('graphql-tools');
const expressPlayground = require('graphql-playground-middleware-express').default;
const apollo_upload_server_1 = require("apollo-upload-server");
const uploadFile_1 = require("./common/file_server/uploadFile");
class Server {
    constructor() {
        this.app = express();
        this.config();
        this.routes();
    }
    config() {
        //设置静态文件
        var options = {
            dotfiles: 'ignore',
            etag: false,
            extensions: ['htm', 'html'],
            index: false,
            maxAge: '1d',
            redirect: false,
            setHeaders: function (res, path, stat) {
                res.set('x-timestamp', Date.now());
            }
        };
        this.app.use("/uploads", express.static(path.join(__dirname, '../uploads'), options));
        //设置网站
        this.app.use("/", express.static(path.join(__dirname, '../web')));
        //设置mongodb连接
        const MONGO_URI = 'mongodb://localhost/LCWebSite';
        Mongoose.connect(MONGO_URI || process.env.MONGO_URI, { useMongoClient: true });
        this.app.use(bodyParser.urlencoded({ extended: false }));
        this.app.use(bodyParser.json());
        //设置cors 跨域
        const corsOption = this.setCors();
        this.app.use(cors(corsOption));
        //设置Session
        this.app.use(passport.initialize());
        this.app.use(passport.session());
        this.app.use(expressValidator());
        this.app.use(cookieParser());
        this.app.use(session({
            secret: 'jufengyd',
            key: 'token',
            resave: false,
            saveUninitialized: false,
            store: new MongoStore({
                mongooseConnection: Mongoose.connection
            })
        }));
    }
    routes() {
        var uploadFileRouter = new uploadFile_1.UploadFile().router();
        this.app.use('/', uploadFileRouter);
        this.app.use('/graphql', apollo_upload_server_1.apolloUploadExpress(), graphqlExpress(req => {
            let context = {
                session: req.session,
                user: req.session.user
            };
            return { schema: schema_1.default, context };
        }));
        this.app.get('/playground', expressPlayground({ endpoint: '/graphql' }));
        this.app.use('/graphiql', graphiqlExpress({ endpointURL: '/graphql' }));
        this.app.use('/voyager', middleware_1.express({ endpointUrl: '/graphql' }));
    }
    setCors() {
        return {
            credentials: true,
            origin: [
                "http://localhost:4200",
                "http://localhost:3000",
                "http://localhost:8083",
                "http://www.lianheqianjin.com",
                "http://211.149.219.127:80",
                "http://108.161.189.121:443"
            ],
            headers: [
                "Access-Control-Allow-Origin",
                "Access-Control-Allow-Headers",
                "Origin, X-Requested-With, Content-Type",
                "CORELATION_ID"
            ]
        };
    }
}
exports.default = new Server().app;
