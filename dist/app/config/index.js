"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const port = process.env.PORT || 3000;
const dbUrl = process.env.DB_URL;
exports.default = {
    port,
    dbUrl,
};
