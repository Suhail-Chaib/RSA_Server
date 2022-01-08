"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const config_1 = require("./config/config");
mongoose.connect(config_1.default.DB.URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});
const connection = mongoose.connection;
connection.once("open", function () {
    console.log("Connected successfully");
});
connection.on("error", console.error.bind(console, "connection error: "));
//# sourceMappingURL=database.js.map