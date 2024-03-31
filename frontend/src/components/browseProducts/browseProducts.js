import './browseProducts.scss'
import Product from './product/product.js'
import axios from 'axios';
import { useEffect, useState } from 'react'

export default function BrowseProducts() {
    /* 
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
     */
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