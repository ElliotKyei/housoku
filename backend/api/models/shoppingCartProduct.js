class ShoppingCartProduct {
    constructor({ product_id, product_name, size, image_url, category_name, price, quantity = 1 }) {

        this.product_id = product_id,
            this.product_name = product_name,
            this.size = size,
            this.image_url = image_url,
            this.category_name = category_name,
            this.price = price,
            this.quantity = quantity
    }
}

module.exports = ShoppingCartProduct