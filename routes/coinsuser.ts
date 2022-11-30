import express, {Express, Request, Response} from "express";
import {machine} from "../app";

const router = express.Router();

//
router.get("/types", (req: Request, res: Response) => {
    res.json({
        types: machine.coinTypes
    })
})

// push coins
router.post("/push", (req: Request, res: Response) => {
    const coin = req.body;
    if (coin == undefined || coin.type === undefined) {
        res.status(400).json({error: "Invalid coin type"});
        return;
    }
    const result = machine.insertCoin(coin.type);
    if (!result) {
        res.status(400).json({error: "Invalid coin type"});
        return;
    }
    res.json({inserted: result});
});

// balance
router.get("/balance", (req: Request, res: Response) => {
    res.json({
        balance: machine.balance
    })
});

export {router as coinsUserRouter};
