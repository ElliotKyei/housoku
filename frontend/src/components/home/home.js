import Product from './homeProductContainer/homeProduct/homeProduct.js';
import HomeProductContainer from './homeProductContainer/homeProductContainer.js';
import './_home.scss';
import { useEffect, useState } from 'react';
import axios from 'axios';

export default function Home() {
    //const heroImage
    const [featuredProducts, setFeaturedProducts] = useState(null);
    const [trendingProducts, setTrendingProducts] = useState(null);
    const [headingProducts, setHeadingProducts] = useState(null);

    // Fetch products from database listed as "Featured" or "Heading"

    useEffect(() => {
        const getHomeProducts = async () => {
            try {
                const products = await axios.get('http://localhost:8080/api/getAllFeaturedProducts')

                if (products.status === 200) {

                    setFeaturedProducts(prev => ([
                        ...(products.data.filter(p => p.featured_section === "Featured"))
                    ]))

                    setTrendingProducts(prev => ([
                        ...(products.data.filter(p => p.featured_section === "Trending"))
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


    let trendingProductsList = <></>
    // if trending products are finished fetching, render

    if (trendingProducts) {
        trendingProductsList = trendingProducts.map(p => {
            return <div className='item'><Product product={p} width={460} height={460} key={p.product_id} /></div>
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
                <Product width={780} height={709} product={headingProducts[0]} key={headingProducts[0].product_id} />
            </div>
            <div className='smallProduct'>
                {
                    headingProductsList = headingProducts.slice(1).map(p => {
                        return <Product width={581} height={281} product={p} key={p.product_id} />
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
                        <div className="heroSubTitle">
                            <p>Men's Apparel</p>
                        </div>
                        <div className="heroLink">
                            <a href='/apparel/browse-products/tops'><button className="heroBtn">Shop</button></a>
                        </div>
                    </div>
                </div>

                {/*Featured Section*/}
                <div id='6ebfefb9-88eb-437d-963f-2196806aed58'>
                    {<HomeProductContainer products={featuredProducts} title="Latest & Greatest" />}
                </div>


                {/*Trending Section*/}
                <div id='0cc5404d-8a84-4478-968a-8b5f90ea6ea6'>
                    {<HomeProductContainer products={trendingProducts} title="Trending This Week" />}
                </div>


                {/*Heading Section*/}

                <div id='2259605a-551f-4d56-a56d-c967661b379e'>
                    {<HomeProductContainer products={headingProducts} title="Heading" />}
                </div>



            </div>
        </>
    )
}