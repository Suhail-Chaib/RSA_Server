"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const HomeSchema = new mongoose.Schema({
    text: {
        type: String
    },
});
const Home = mongoose.model("Home", HomeSchema);
module.exports = Home;
//# sourceMappingURL=home.js.map