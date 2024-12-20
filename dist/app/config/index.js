"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
// specifying where is the .env file lcoated
dotenv_1.default.config({ path: path_1.default.join(process.cwd(), '.env') });
//exporting PORT and DATABASE_URL
exports.default = {
    database_url: process.env.DATABASE_URL,
    port: process.env.PORT,
};
