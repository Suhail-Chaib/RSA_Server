"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const home_controller_1 = require("../controllers/home.controller");
const router = (0, express_1.Router)();
router.get('/postPublicKey', home_controller_1.default.generatePublicKey);
router.get('/getPublicKey/:password', home_controller_1.default.getPublicKey);
router.post('/postData', home_controller_1.default.postEncrypted);
router.get('/getData/:password', home_controller_1.default.getData);
router.get('/getPrivateKey/:password', home_controller_1.default.getPrivateKey);
router.get('/getUser/:password', home_controller_1.default.getUser);
router.post('/postData2', home_controller_1.default.postSigned);
router.get('/getData2/:password', home_controller_1.default.getData2);
exports.default = router;
//# sourceMappingURL=home.routes.js.map