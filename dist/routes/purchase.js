"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.purchaseRouter = void 0;
const express_1 = __importDefault(require("express"));
const app_1 = require("../app");
const router = express_1.default.Router();
exports.purchaseRouter = router;
// Purchase by giving item id and coins
router.post("/", (req, res) => {
    const request = req.body;
    let coinBalance = 0;
    if (request == undefined || request.itemId == undefined || request.coins == undefined) {
        res.status(400).json({ error: "Invalid request" });
        return;
    }
    // validate coins
    for (let coin of request.coins) {
        if (!app_1.machine.coinTypes.includes(coin)) {
            res.status(400).json({ error: "Invalid coin type" });
            return;
        }
    }
    // validate item
    const item = app_1.machine.items.find((item) => item.id === request.itemId);
    if (item == undefined) {
        res.status(400).json({ error: "Invalid item" });
        return;
    }
    // sum up coins
    for (let coin of request.coins) {
        coinBalance += coin;
    }
    // check if enough coins
    if (coinBalance < item.price) {
        res.status(400).json({ error: "Not enough coins" });
        return;
    }
    // check if item is available
    if (item.quantity <= 0) {
        res.status(400).json({ error: "Item not available" });
        return;
    }
    // update item quantity
    app_1.machine.items.map((item) => {
        if (item.id === request.itemId) {
            item.quantity--;
        }
        return item;
    });
    // update balance
    app_1.machine.balance += item.price;
    // return change
    const change = coinBalance - item.price;
    // calculate change and return coins
    const changeCoins = app_1.machine.calculateChange(change);
    res.json({ item, change, changeCoins });
});
