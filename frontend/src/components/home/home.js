import Product from './homeProduct/homeProduct.js';
import './_home.scss';

export default function Home() {
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
                        <button className="heroBtn">Button</button>
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
                        <div className='item'><Product /></div>
                        <div className='item'><Product /></div>
                        <div className='item'><Product /></div>
                        <div className='item'><Product /></div>
                        <div className='item'><Product /></div>
                        <div className='item'><Product /></div>

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
                        <div className='largeProduct'>
                            <Product width={780} height={682} />
                        </div>
                        <div className='smallProduct'>
                            <Product width={541} height={261} />
                            <Product width={541} height={261} />

                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}