"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const UserSchema = new mongoose.Schema({
    password: {
        type: String
    },
    publicKey: [
        {
            n: {
                type: String
            },
            e: {
                type: String
            }
        }
    ],
    privateKey: [
        {
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
        }
    ]
});
const User = mongoose.model("user", UserSchema);
module.exports = User;
//# sourceMappingURL=user.js.map