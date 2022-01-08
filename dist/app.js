"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const home_routes_1 = require("./routes/home.routes");
const user_routes_1 = require("./routes/user.routes");
const app = express();
app.set('port', process.env.PORT || 3800);
app.use(morgan('dev'));
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(bodyParser.json());
app.use('/home', home_routes_1.default);
app.use('/user', user_routes_1.default);
exports.default = app;
//# sourceMappingURL=app.js.map