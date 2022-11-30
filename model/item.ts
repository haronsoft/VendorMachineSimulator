export default class Item {
    constructor(
        public name: string,
        public price: number,
        public description: string,
        public id: number,
        public quantity: number
    ) {}

    toString() {
        return `${this.name} - ${this.price}`;
    }

    equals(other: Item) {
        return this.id === other.id;
    }
}