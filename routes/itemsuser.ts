import express, {Express, Request, Response} from "express";
import {machine} from "../app";

const router = express.Router();


router.get("/", (req: Request, res: Response) => {
    res.send(machine.items);
});


router.post("/select", (req: Request, res: Response) => {
    const item = req.body;
    const result = machine.selectItem(item.id);
    res.send({result});
});


export {router as itemsUserRouter};