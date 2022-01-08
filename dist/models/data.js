"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const dataSchema = new mongoose.Schema({
    data: {
        type: String
    },
    n: {
        type: String
    }
});
const data = mongoose.model("data", dataSchema);
module.exports = data;
//# sourceMappingURL=data.js.map