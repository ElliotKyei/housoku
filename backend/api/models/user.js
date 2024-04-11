class User {
    constructor({ user_d, first_name, last_name, email, password, shipping_address = null, billing_Address = null }) {

        this.user_d = user_d,
            this.first_name = first_name,
            this.last_name = last_name,
            this.email = email,
            this.password = password,
            this.shipping_address = shipping_address,
            this.billing_Address = billing_Address
    }
}

module.exports = User