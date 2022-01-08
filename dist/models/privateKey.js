"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const privateKeySchema = new mongoose.Schema({
    d: {
        type: String
    },
    publicKey: [
        {
            n: {
                type: String
            },
            e: {
                type: String
            },
            password: {
                type: String
            }
        }
    ],
    password: {
        type: String
    }
});
const privateKey = mongoose.model("privateKey", privateKeySchema);
module.exports = privateKey;
//# sourceMappingURL=privateKey.js.map