"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.coinsUserRouter = void 0;
const express_1 = __importDefault(require("express"));
const app_1 = require("../app");
const router = express_1.default.Router();
exports.coinsUserRouter = router;
//
router.get("/types", (req, res) => {
    res.json({
        types: app_1.machine.coinTypes
    });
});
// push coins
router.post("/push", (req, res) => {
    const coin = req.body;
    if (coin == undefined || coin.type === undefined) {
        res.status(400).json({ error: "Invalid coin type" });
        return;
    }
    const result = app_1.machine.insertCoin(coin.type);
    if (!result) {
        res.status(400).json({ error: "Invalid coin type" });
        return;
    }
    res.json({ inserted: result });
});
// balance
router.get("/balance", (req, res) => {
    res.json({
        balance: app_1.machine.balance
    });
});
