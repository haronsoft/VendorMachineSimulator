import express, {Express, Request, Response} from "express";
import VendingMachine from "./model/vendingmachine";

import {itemsAdminRouter} from "./routes/itemsadmin";
import {itemsUserRouter} from "./routes/itemsuser";
import {coinsAdminRouter} from "./routes/coinsadmin";
import {coinsUserRouter} from "./routes/coinsuser";
import {purchaseRouter} from "./routes/purchase";


const app: Express = express();
const port = process.env.PORT || 3000;
const machine = new VendingMachine();
export {machine}

app.use(express.json());
app.use("/admin/items", itemsAdminRouter);
app.use("/user/items", itemsUserRouter);
app.use("/admin/coins", coinsAdminRouter);
app.use("/user/coins", coinsUserRouter);
app.use("/user/purchase", purchaseRouter);


app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});