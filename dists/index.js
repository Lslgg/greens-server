"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = require("./server");
var PORT = 8080;
var server = server_1.default.listen(PORT, function () {
    console.log('Now browse to http://localhost:8080/playground');
    console.log('Now browse to http://localhost:8080/graphiql');
    console.log('Now browse to http://localhost:8080/voyager');
    server_1.default.settings.port = PORT;
});
