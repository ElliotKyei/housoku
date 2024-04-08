
const Mailjet = require('node-mailjet');

const sendWelcomeEmail = (email, name) => {
    const mailjet = Mailjet.apiConnect(
        process.env.MJ_APIKEY_PUBLIC,
        process.env.MJ_APIKEY_PRIVATE

    )

    const request = mailjet
        .post('send', { version: 'v3.1' })
        .request({
            Messages: [
                {
                    From: {
                        Email: "housoku.apparel@gmail.com",
                        Name: "Housoku"
                    },
                    To: [
                        {
                            Email: email,
                            Name: name
                        }
                    ],
                    Subject: "Welcome to Housoku",
                    TextPart: "Thank you for signing up. Here's a discount to use for any purchase on our website #FIRST2024",
                    HTMLPart: "<h3>Thank you for signing up. Here's a discount to use for any purchase on our website <b>#FIRST2024</b><h3>"
                }
            ]
        })

    request
        .then((result) => {
            // console.log(result.body)
            console.log(this.toString(result.body))
            console.log(result)
        })
        .catch((err) => {
            console.log(err.statusCode)
        })

}

module.exports = sendWelcomeEmail