class Product {
    constructor({ product_id, product_name, description, colour, size, image_url, category_name, price, category_id, brand, subcategory, featured_section = null }) {

        this.product_id = product_id,
            this.product_name = product_name,
            this.description = description,
            this.colour = colour,
            this.size = size,
            this.category_name = category_name,
            this.price = price,
            this.category_id = category_id,
            this.image_url = image_url,
            this.brand = brand,
            this.subcategory = subcategory,
            this.featured_section = featured_section
    }
}

module.exports = Product