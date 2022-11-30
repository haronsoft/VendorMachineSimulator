import express, {Express, Request, Response} from "express";
import {machine} from "../app";

const router = express.Router();

// Purchase by giving item id and coins
router.post("/", (req: Request, res: Response) => {
   const request = req.body;
   let coinBalance = 0;
   if(request == undefined || request.itemId == undefined || request.coins == undefined) {
       res.status(400).json({error: "Invalid request"});
       return;
   }

   // validate coins
    for (let coin of request.coins) {
        if (!machine.coinTypes.includes(coin)) {
            res.status(400).json({error: "Invalid coin type"});
            return;
        }
    }

    // validate item
    const item = machine.items.find((item) => item.id === request.itemId);
    if (item == undefined) {
        res.status(400).json({error: "Invalid item"});
        return;
    }

    // sum up coins
    for (let coin of request.coins) {
        coinBalance += coin;
    }

    // check if enough coins
    if (coinBalance < item.price) {
        res.status(400).json({error: "Not enough coins"});
        return;
    }

    // check if item is available
    if (item.quantity <= 0) {
        res.status(400).json({error: "Item not available"});
        return;
    }

    // update item quantity
    machine.items.map((item) => {
        if (item.id === request.itemId) {
            item.quantity--;
        }
        return item;
    });

    // update balance
    machine.balance += item.price;

    // return change
    const change = coinBalance - item.price;
    // calculate change and return coins
    const changeCoins = machine.calculateChange(change);

    res.json({item, change, changeCoins});
})

export {router as purchaseRouter};