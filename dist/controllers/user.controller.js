"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const User = require("../models/user");
const RSA_Module_1 = require("../../../RSA-Module");
const publicKeyModel = require("../models/publicKey");
const privateKeyModel = require("../models/privateKey");
const bc = require("bigint-conversion");
function registerUser(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        let user = req.body;
        const rsa = new RSA_Module_1.RSA();
        yield rsa.generateRandomKeys();
        try {
            let pub = new publicKeyModel({
                "n": bc.bigintToBase64(rsa.publicKey.n),
                "e": bc.bigintToBase64(rsa.publicKey.e),
            });
            let priv = new privateKeyModel({
                "d": bc.bigintToBase64(rsa.privateKey.d),
                "publicKey": pub,
            });
            let u = new User({
                "password": user.password,
                "publicKey": pub,
                "privateKey": priv,
            });
            yield u.save().then(() => {
                return res.status(201).json("User created successfully!");
            });
        }
        catch (err) {
            return res.status(500).json(err);
        }
    });
}
function loginUser(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const password = req.params.password;
        let user = yield User.findOne({ "password": password });
        console.log(req.params.password);
        if (!user) {
            return res.status(404).json({ message: "User not found." });
        }
        else {
            return res.status(200).json({ message: "Usuario Conectado" });
        }
    });
}
exports.default = { loginUser, registerUser };
//# sourceMappingURL=user.controller.js.map