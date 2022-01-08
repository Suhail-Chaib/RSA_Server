"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_controller_1 = require("../controllers/user.controller");
const router = (0, express_1.Router)();
router.put('/login-user/:password', user_controller_1.default.loginUser);
router.post('/register-user', user_controller_1.default.registerUser);
exports.default = router;
//# sourceMappingURL=user.routes.js.map