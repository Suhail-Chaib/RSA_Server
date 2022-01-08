"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const publicKeySchema = new mongoose.Schema({
    n: {
        type: String
    },
    e: {
        type: String
    },
    password: {
        type: String
    }
});
const publicKey = mongoose.model("publicKey", publicKeySchema);
module.exports = publicKey;
//# sourceMappingURL=publicKey.js.map