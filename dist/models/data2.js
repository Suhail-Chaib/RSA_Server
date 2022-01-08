"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const data2Schema = new mongoose.Schema({
    data: {
        type: String
    },
    keyA: {
        type: String
    },
    keyB: {
        type: String
    }
});
const data2 = mongoose.model("data2", data2Schema);
module.exports = data2;
//# sourceMappingURL=data2.js.map