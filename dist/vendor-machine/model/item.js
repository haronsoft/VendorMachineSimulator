"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Item {
    constructor(name, price, description, id, quantity) {
        this.name = name;
        this.price = price;
        this.description = description;
        this.id = id;
        this.quantity = quantity;
    }
    toString() {
        return `${this.name} - ${this.price}`;
    }
    equals(other) {
        return this.id === other.id;
    }
}
exports.default = Item;
