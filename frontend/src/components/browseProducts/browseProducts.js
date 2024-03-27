import './browseProducts.scss'
import Product from './product/product.js'
import axios from 'axios';
import { useEffect, useState } from 'react'
import Mailjet from 'node-mailjet';

export default function BrowseProducts() {

    const mailjet = Mailjet.apiConnect(
        process.env.REACT_APP_MJ_APIKEY_PUBLIC,
        process.env.REACT_APP_MJ_APIKEY_PRIVATE
    )

    const request = mailjet
        .post('send', { version: 'v3.1' })
        .request({
            Messages: [
                {
                    From: {
                        Email: "pilot@mailjet.com",
                        Name: "Housoku"
                    },
                    To: [
                        {
                            Email: "passenger1@mailjet.com",
                            Name: "passenger 1"
                        }
                    ],
                    Subject: "Your email flight plan!",
                    TextPart: "Dear passenger 1, welcome to Mailjet! May the delivery force be with you!",
                    HTMLPart: "<h3>Dear passenger 1, welcome to <a href=\"https://www.mailjet.com/\">Mailjet</a>!</h3><br />May the delivery force be with you!"
                }
            ]
        })

    request
        .then((result) => {
            console.log(result.body)
        })
        .catch((err) => {
            console.log(err.statusCode)
        })



    const fetchAPI = async (url) => {
        try {
            const res = await axios.get(url)
        }
        catch (err) {
            console.log(err.message)
        }
    }

    useEffect(() => {
        fetchAPI("https://background-remover.p.rapidapi.com/remove-background")
    }, [])

    const imageHeight = 420;
    const imageWidth = 400;

    return (
        <>
            <div className='browseProducts'>
                <div>
                    <span className='wallBreadCrumbs'>Men's Apparel</span>
                    <h4 className='wallHeader'>Browse Products</h4>
                </div>
                <div className='products'>
                    <Product height={imageHeight} width={imageWidth} imageURL='/housoku-images/product14.jpg' />
                    <Product height={imageHeight} width={imageWidth} imageURL='/housoku-images/product12.jpg' />
                    <Product height={imageHeight} width={imageWidth} imageURL='/housoku-images/product9.jpg' />

                    <Product height={imageHeight} width={imageWidth} imageURL='/housoku-images/product10.jpg' />
                    <Product height={imageHeight} width={imageWidth} imageURL='/housoku-images/product2.jpg' />
                    <Product height={imageHeight} width={imageWidth} imageURL='/housoku-images/product11.jpg' />

                    <Product height={imageHeight} width={imageWidth} imageURL='/housoku-images/product7.jpg' />
                </div>
            </div>
        </>
    );
}