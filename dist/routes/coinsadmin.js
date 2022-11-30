"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.coinsAdminRouter = void 0;
const express_1 = __importDefault(require("express"));
const app_1 = require("../app");
const router = express_1.default.Router();
exports.coinsAdminRouter = router;
//
router.get("/types", (req, res) => {
    res.json({
        types: app_1.machine.coinTypes
    });
});
router.post("/types", (req, res) => {
    const coinType = req.body;
    if (coinType == undefined || coinType.type === undefined) {
        res.status(400).json({ error: "Invalid coin type" });
        return;
    }
    app_1.machine.addCoinType(coinType.type);
    res.send(coinType);
});
router.delete("/types/:id", (req, res) => {
    let coinTypeId = -1;
    try {
        coinTypeId = parseInt(req.params.id);
    }
    catch (e) {
        res.status(400).json({ error: "Invalid id" });
        return;
    }
    const result = app_1.machine.deleteCoinType(coinTypeId);
    res.send({ deleted: result });
});
