"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const coin_1 = __importDefault(require("./coin"));
class VendingMachine {
    constructor() {
        this._balance = 0;
        this._items = [];
        this._selectedItem = null;
        this._coinTypes = [1, 2, 5, 10, 20, 50, 100, 200];
    }
    get balance() {
        return this._balance;
    }
    set balance(bal) {
        this._balance = bal;
    }
    get items() {
        return this._items;
    }
    get coinTypes() {
        return this._coinTypes;
    }
    get selectedItem() {
        return this._selectedItem;
    }
    selectItem(itemId) {
        const item = this._items.find((item) => item.id === itemId);
        if (!item) {
            return null;
        }
        this._selectedItem = item;
        return item;
    }
    addItem(item) {
        // set the id to the next available id
        item.id = this._items.length + 1;
        this._items.push(item);
    }
    deleteItem(itemId) {
        const index = this._items.findIndex((item) => item.id === itemId);
        if (index === -1) {
            return false;
        }
        this._items.splice(index, 1);
        return true;
    }
    addCoinType(coinType) {
        // check if coin type is already in the list
        if (this._coinTypes.includes(coinType)) {
            return;
        }
        // add coin type to the list
        this._coinTypes.push(coinType);
    }
    insertCoin(value) {
        if (!this._coinTypes.includes(value)) {
            return false;
        }
        this._balance += value;
        return true;
    }
    purchaseItem() {
        if (this._selectedItem === null) {
            throw new Error("No item selected");
        }
        if (this._selectedItem.price > this._balance) {
            throw new Error("Not enough balance");
        }
        this._balance -= this._selectedItem.price;
        this._selectedItem = null;
    }
    deleteCoinType(coinTypeId) {
        const index = this._coinTypes.findIndex((coinType) => coinType === coinTypeId);
        if (index === -1) {
            return false;
        }
        this._coinTypes.splice(index, 1);
        return true;
    }
    calculateChange(change) {
        const changeCoins = [];
        let remainingChange = change;
        const sortedCoinTypes = this._coinTypes.sort((a, b) => b - a);
        for (let coinType of sortedCoinTypes) {
            const coin = new coin_1.default(coinType);
            while (remainingChange >= coinType) {
                changeCoins.push(coin);
                remainingChange -= coinType;
            }
        }
        return changeCoins;
    }
}
exports.default = VendingMachine;
