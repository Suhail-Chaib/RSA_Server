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
const RSA_Module_1 = require("../../../RSA-Module");
const RSA_Module_2 = require("../../../RSA-Module");
const RSA_Module_3 = require("../../../RSA-Module");
const homeModel = require("../models/home");
const Data = require("../models/data");
const Data2 = require("../models/data2");
const User = require("../models/user");
const publicKeyModel = require("../models/publicKey");
const privateKeyModel = require("../models/privateKey");
const bc = require("bigint-conversion");
const generatePublicKey = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
        yield pub.save();
        yield priv.save();
        res.send(pub);
    }
    catch (err) {
        return res.status(500).json(err);
    }
});
const getData2 = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log(req.params.password);
        const results = yield User.find({ "password": req.params.password });
        console.log(results[0].publicKey[0].n);
        const data = yield Data2.find({ "keyB": results[0].publicKey[0].n }, { "_id": 0, "data": 1, "keyA": 1 });
        return res.status(200).json(data);
    }
    catch (err) {
        return res.status(404).json(err);
    }
});
const getData = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const results = yield User.find({ "password": req.params.password });
        const data = yield Data.find({ "n": results[0].publicKey[0].n }, { "_id": 0, "data": 1 });
        return res.status(200).json(data);
    }
    catch (err) {
        return res.status(404).json(err);
    }
});
const getPrivateKey = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const results = yield User.find({ "password": req.params.password });
        console.log(results[0].privateKey[0].d);
        return res.status(200).json(results[0].privateKey[0].d);
    }
    catch (err) {
        return res.status(404).json(err);
    }
});
const getUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const results = yield User.find({ "password": req.params.password });
        return res.status(200).json(results);
    }
    catch (err) {
        return res.status(404).json(err);
    }
});
const getPublicKey = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const results = yield publicKeyModel.find({ "password": req.params.password });
        return res.status(200).json(results);
    }
    catch (err) {
        return res.status(404).json(err);
    }
});
const postSigned = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let data = req.body.data;
        let keyA = req.body.keyA;
        let keyB = req.body.keyB;
        console.log(data);
        console.log(keyA);
        console.log(keyB);
        let info = new Data2({
            "data": data,
            "keyA": keyA,
            "keyB": keyB
        });
        info.save().then(() => {
            return res.status(201).json("User created successfully!");
        });
    }
    catch (err) {
        return res.status(404).json(err);
    }
});
const postEncrypted = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    function save() {
        return new Promise((resolve, reject) => {
            try {
                let dataE = new Data({
                    "data": req.body.data,
                    "n": req.body.n
                });
                dataE.save().then(() => {
                    return res.status(201).json(dataE);
                });
                resolve();
            }
            catch (err) {
                return res.status(500).json(err);
            }
        });
    }
    function encrypt() {
        return __awaiter(this, void 0, void 0, function* () {
            const chekN = yield User.find({ "publicKey.0.n": req.body.n }, { "_id": 0, "privateKey": 1 });
            if (!chekN)
                return res.status(409).json({ code: 409, message: "This PrivateKey does not exist" });
            else {
                try {
                    let e = bc.base64ToBigint("AQAB");
                    let n = bc.base64ToBigint(req.body.n);
                    let d = bc.base64ToBigint(chekN[0].privateKey[0].d);
                    const publicKey = new RSA_Module_2.PublicKey(e, n);
                    const privateKey = new RSA_Module_3.PrivateKey(d, publicKey);
                    const y = privateKey.decrypt(bc.base64ToBigint(req.body.data));
                    console.log("Text decrypted: \n" + bc.bigintToText(y));
                }
                catch (err) {
                    return res.status(404).json(err);
                }
            }
        });
    }
    save().then(res => encrypt());
});
exports.default = { generatePublicKey, getPublicKey, postEncrypted, getData, getPrivateKey, getUser, postSigned, getData2 };
//# sourceMappingURL=home.controller.js.map