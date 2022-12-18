"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.itemsAdminRouter = void 0;
const express_1 = __importDefault(require("express"));
const app_1 = require("../app");
const router = express_1.default.Router();
exports.itemsAdminRouter = router;
router.get("/", (req, res) => {
    res.send(app_1.machine.items);
});
router.post("/", (req, res) => {
    const item = req.body;
    if (item == undefined || item.name === undefined || item.price === undefined) {
        res.status(400).json({ error: "Invalid item" });
        return;
    }
    app_1.machine.addItem(item);
    res.send(item);
});
router.delete("/:id", (req, res) => {
    let itemId = -1;
    try {
        itemId = parseInt(req.params.id);
    }
    catch (e) {
        res.status(400).json({ error: "Invalid id" });
        return;
    }
    const result = app_1.machine.deleteItem(itemId);
    res.send({ deleted: result });
});
//update price
router.put("/:id", (req, res) => {
    const itemId = Number(req.params.id);
    const item = req.body;
    const index = app_1.machine.items.findIndex((item) => item.id === itemId);
    //if item not found
    if (index === -1) {
        res.status(404).json({ error: "Item not found" });
        return;
    }
    if (item.price != undefined) {
        app_1.machine.items[index].price = item.price;
    }
    // check if item name is valid
    if (item.name != undefined) {
        app_1.machine.items[index].name = item.name;
    }
    // check if item description is valid
    if (item.description != undefined) {
        app_1.machine.items[index].description = item.description;
    }
    // check quantity
    if (item.quantity != undefined) {
        app_1.machine.items[index].quantity = item.quantity;
    }
    res.send(item);
});
