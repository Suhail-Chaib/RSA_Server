"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = require("./app");
require("./database");
const http_1 = require("http");
const httpServer = (0, http_1.createServer)(app_1.default);
httpServer.listen(app_1.default.get('port'));
console.log('Server in port', app_1.default.get('port'));
//# sourceMappingURL=index.js.map