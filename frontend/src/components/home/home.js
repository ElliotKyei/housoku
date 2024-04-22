import Product from './homeProductContainer/homeProduct/homeProduct.js';
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
            return <div className='item'><Product product={p} width={460} height={460} key={p.product_id} /></div>
        })
    }

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
                    </div>
                    <div className="heroSubTitle">
                        <span>Men's apparel online web application</span>
                    </div>
                    <div className="heroLink">
                        <a href='/apparel/browse-products/tops'><button className="heroBtn">Shop</button></a>
                    </div>
                </div>

                {/*Featured Section*/}

                <div className='featured' id='6c6e4e9d-84ce-448a-bbfb-56ffcc06443c'>
                    <div className='headerLayer'>

                        <div className='title'>
                            <h4 >Latest & Greatest</h4>
                        </div>

                        <div className='scrollProducts'>
                            <div className='title'>
                                <p>Discover All </p>
                            </div>

                            <button className='leftScrollButton'>
                                <div>
                                    <svg focusable="false" viewBox="0 0 24 24" role="img" width="24px" height="24px" fill="none">
                                        <path stroke="black" stroke-width="1.5" d="M15.525 18.966L8.558 12l6.967-6.967"> </path>
                                    </svg>
                                </div>
                            </button>


                            <button className='rightScrollButton' onClick={() => console.log("right button clicked")}>
                                <div>
                                    <svg focusable="false" viewBox="0 0 24 24" role="img" width="24px" height="24px" fill="none">
                                        <path stroke="black" stroke-width="1.5" d="M8.474 18.966L15.44 12 8.474 5.033"> </path>
                                    </svg>
                                </div>
                            </button>
                        </div>

                    </div>

                    {/* Featured Images *
               Just a simple div flexbox row (productContainerRow) with
               the items (products)*/ }

                    <div className="productContainerRow" id='6ebfefb9-88eb-437d-963f-2196806aed58'>
                        {featuredProductsList}
                    </div>


                </div>


                <div className='featured' id='0cc5404d-8a84-4478-968a-8b5f90ea6ea6'>
                    <div className='headerLayer'>

                        <div className='title'>
                            <h4 >Trending This Week</h4>
                        </div>

                        <div className='scrollProducts'>
                            <div className='title'>
                                <p>Discover All </p>
                            </div>

                            <div>
                                <button className='leftScrollButton'>
                                    <svg focusable="false" viewBox="0 0 24 24" role="img" width="24px" height="24px" fill="none">
                                        <path stroke="black" stroke-width="1.5" d="M15.525 18.966L8.558 12l6.967-6.967"> </path>
                                    </svg>
                                </button>
                            </div>


                            <div>
                                <button className='rightScrollButton' onClick={() => console.log("right button clicked")}>
                                    <svg focusable="false" viewBox="0 0 24 24" role="img" width="24px" height="24px" fill="none">
                                        <path stroke="black" stroke-width="1.5" d="M8.474 18.966L15.44 12 8.474 5.033"> </path>
                                    </svg>
                                </button>
                            </div>
                        </div>

                    </div>

                    {/* Featured Images *
               Just a simple div flexbox row (productContainerRow) with
               the items (products)*/ }

                    <div className="productContainerRow">
                        {trendingProductsList}
                    </div>
                </div>


                {/*Heading Section*/}

                <div className='featured' id='2259605a-551f-4d56-a56d-c967661b379e'>
                    <div className='headerLayer'>

                        <div className='title'>
                            <h4 >More Inspiration</h4>
                        </div>

                        <div className='scrollProducts'>
                            <div className='title'>
                                <p>Discover All</p>
                            </div>

                            <div>
                                <button className='leftScrollButton'>
                                    <svg focusable="false" viewBox="0 0 24 24" role="img" width="24px" height="24px" fill="none">
                                        <path stroke="black" stroke-width="1.5" d="M15.525 18.966L8.558 12l6.967-6.967"> </path>
                                    </svg>
                                </button>
                            </div>


                            <div>
                                <button className='rightScrollButton' onClick={() => console.log("right button clicked")}>
                                    <svg focusable="false" viewBox="0 0 24 24" role="img" width="24px" height="24px" fill="none">
                                        <path stroke="black" stroke-width="1.5" d="M8.474 18.966L15.44 12 8.474 5.033"> </path>
                                    </svg>
                                </button>
                            </div>
                        </div>

                    </div>

                    {/* Featured Images *
               Just a simple div flexbox row (productContainerRow) with
               the items (products)*/ }

                    <div className="productContainerCol">
                        {headingProductsList}
                    </div>
                </div>



            </div>
        </>
    )
}