import express, {Express, Request, Response} from "express";
import {machine} from "../app";

const router = express.Router();

//
router.get("/types", (req: Request, res: Response) => {
    res.json({
        types: machine.coinTypes
    })
})

router.post("/types", (req: Request, res: Response) => {
    const coinType = req.body;
    if (coinType == undefined || coinType.type === undefined) {
        res.status(400).json({error: "Invalid coin type"});
        return;
    }
    machine.addCoinType(coinType.type);
    res.send(coinType);
})

router.delete("/types/:id", (req: Request, res: Response) => {
    let coinTypeId = -1
    try {
        coinTypeId = parseInt(req.params.id);
    } catch (e) {
        res.status(400).json({error: "Invalid id"});
        return;
    }
    const result = machine.deleteCoinType(coinTypeId);
    res.send({deleted:result});
});

export {router as coinsAdminRouter};
