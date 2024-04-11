import Product from './homeProduct/homeProduct.js';
import './_home.scss';
import { useEffect, useState } from 'react';
import axios from 'axios';

export default function Home() {

    const [featuredProducts, setFeaturedProducts] = useState(null);
    const [headingProducts, setHeadingProducts] = useState(null);

    // Fetch products from database listed as "Featured" or "Heading"

    useEffect(() => {
        const getHomeProducts = async () => {
            try {
                const products = await axios.get('http://localhost:8080/api/getAllFeaturedProducts')

                if (products.status === 200) {

                    let featuredProd = products.data.filter(p => p.featured_section === "Featured")

                    setFeaturedProducts(prev => ([
                        ...(products.data.filter(p => p.featured_section === "Featured"))
                    ]))

                    setHeadingProducts(prev => ([
                        ...(products.data.filter(p => p.featured_section === "Heading"))
                    ]))
                }
            }
            catch (error) {

                setFeaturedProducts(prev => null)
                setHeadingProducts(prev => null)
            }
        }

        getHomeProducts()

    }, [])

    // placeholder until featured products in db are fetched

    let featuredProductsList = <>
        <div className='item'><Product /></div>
        <div className='item'><Product /></div>
        <div className='item'><Product /></div>
        <div className='item'><Product /></div>
        <div className='item'><Product /></div>
        <div className='item'><Product /></div>
    </>

    // if featured products are finished fetching, render

    if (featuredProducts) {
        featuredProductsList = featuredProducts.map(p => {
            return <div className='item'><Product product={p} key={p.product_id} /></div>
        })
    }

    // placeholder until heading products in db are fetched

    let headingProductsList = <>
        <div className='largeProduct'>
            <Product width={780} height={682} />
        </div>
        <div className='smallProduct'>
            <Product width={541} height={261} />
            <Product width={541} height={261} />

        </div>
    </>

    // if heading products are finished fetching, render
    if (headingProducts) {

        headingProductsList = <>
            <div className='largeProduct'>
                <Product width={780} height={682} product={headingProducts[0]} key={headingProducts[0].product_id} />
            </div>
            <div className='smallProduct'>
                {
                    headingProductsList = headingProducts.slice(1).map(p => {
                        return <Product width={541} height={261} product={p} key={p.product_id} />
                    })
                }
            </div>
        </>
    }



    return (
        <>

            <div className="homePage">

                {/* Hero Images
                1. Create a div - this will be a flexbox & the background will be an image
                2. Create another div inside for titles, buttons etc.
                3. Use the column flex direction and center the contents */ }

                <div className="heroImage">
                    <div className="heroContainer">
                        <div className='heroTitle'>
                            <h1><span>Housoku</span></h1>
                        </div>
                    </div>
                    <div className="heroSubTitle">
                        <span>Men's apparel online web application</span>
                    </div>
                    <div className="heroLink">
                        {/*        <a href='/'>
                            <button className="heroBtn">Button</button>
                        </a> */}
                        <a href='/apparel/browse-products/tops'><button className="heroBtn">Shop</button></a>
                    </div>
                </div>

                {/*Featured Section*/}

                <div className='featured'>
                    <div >
                        <h4 className='title'>Featured</h4>
                    </div>

                    {/* Featured Images *
                   Just a simple div flexbox row (productContainerRow) with
                   the items (products)*/ }

                    <div className="productContainerRow">
                        {featuredProductsList}
                    </div>
                </div>

                {/*Heading Section*/}

                <div className='heading'>

                    <div >
                        <h4 className='title'>Heading</h4>
                    </div>

                    {/* Heading Images *
                   Just a simple div flexbox row (productContainerRow) with
                   the items (products)
                   
                   The first div is the first item in the row (largeProduct)
                   Second div (smallProduct) contains 2 products. 
                   This will place the products on top of each other in the second row of the flexbox */}

                    <div className="productContainerCol">
                        {headingProductsList}
                    </div>
                </div>
            </div>
        </>
    )
}