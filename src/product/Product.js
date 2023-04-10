export default class Product{
    id
    name
    price
    quantity
    category

    constructor(id, name, price, quantity, category) {
        this.id = id;
        this.name = name;
        this.price = price;
        this.quantity = quantity;
        this.category = category;
    }
}