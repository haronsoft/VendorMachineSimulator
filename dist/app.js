"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.machine = void 0;
const express_1 = __importDefault(require("express"));
const vendingmachine_1 = __importDefault(require("./model/vendingmachine"));
const itemsadmin_1 = require("./routes/itemsadmin");
const itemsuser_1 = require("./routes/itemsuser");
const coinsadmin_1 = require("./routes/coinsadmin");
const coinsuser_1 = require("./routes/coinsuser");
const purchase_1 = require("./routes/purchase");
const app = (0, express_1.default)();
const port = process.env.PORT || 3000;
const machine = new vendingmachine_1.default();
exports.machine = machine;
app.use(express_1.default.json());
app.use("/admin/items", itemsadmin_1.itemsAdminRouter);
app.use("/user/items", itemsuser_1.itemsUserRouter);
app.use("/admin/coins", coinsadmin_1.coinsAdminRouter);
app.use("/user/coins", coinsuser_1.coinsUserRouter);
app.use("/user/purchase", purchase_1.purchaseRouter);
app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});
