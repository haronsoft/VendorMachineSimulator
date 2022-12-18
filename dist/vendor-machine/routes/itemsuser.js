"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.itemsUserRouter = void 0;
const express_1 = __importDefault(require("express"));
const app_1 = require("../app");
const router = express_1.default.Router();
exports.itemsUserRouter = router;
router.get("/", (req, res) => {
    res.send(app_1.machine.items);
});
router.post("/select", (req, res) => {
    const item = req.body;
    const result = app_1.machine.selectItem(item.id);
    res.send({ result });
});
