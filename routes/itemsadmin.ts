import express, {Express, Request, Response} from "express";
import {machine} from "../app";

const router = express.Router();


router.get("/", (req: Request, res: Response) => {
    res.send(machine.items);
});



router.post("/" , (req: Request, res: Response) => {
    const item = req.body;
    if (item == undefined || item.name === undefined || item.price === undefined) {
        res.status(400).json({error: "Invalid item"});
        return;
    }
    machine.addItem(item);
    res.send(item);
});

router.delete("/:id", (req: Request, res: Response) => {
   let itemId = -1
    try {
         itemId = parseInt(req.params.id);
    } catch (e) {
       res.status(400).json({error: "Invalid id"});
            return;
   }
    const result = machine.deleteItem(itemId);
    res.send({deleted:result});
})

//update price
router.put("/:id", (req: Request, res: Response) => {
    const itemId = Number(req.params.id);
    const item = req.body;
    const index = machine.items.findIndex((item) => item.id === itemId);
    //if item not found
    if (index === -1) {
        res.status(404).json({error: "Item not found"});
        return;
    }
    if (item.price != undefined) {
        machine.items[index].price = item.price;
    }

    // check if item name is valid
    if (item.name != undefined) {
        machine.items[index].name = item.name;
    }

    // check if item description is valid
    if (item.description != undefined) {
        machine.items[index].description = item.description;
    }

    // check quantity
    if (item.quantity != undefined) {
        machine.items[index].quantity = item.quantity;
    }
    res.send(item);
});



export {router as itemsAdminRouter};

