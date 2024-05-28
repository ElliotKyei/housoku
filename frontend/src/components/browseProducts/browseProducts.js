import './_browseProducts.scss'
import Product from './product/product.js'
import axios from 'axios';
import { useEffect, useState } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import Filter from './filter/filter.js';
import sanitizeSearchParams from '../../customHooks/sanitizeSearchParams/sanitizeSearchParams.js';
import { set } from 'lodash';

export default function BrowseProducts() {
    const location = useLocation();
    const navigate = useNavigate();
    let { category = "Tops", subcategory = null } = useParams()
    category = category[0].toUpperCase() + category.slice(1).toLowerCase()

    const defaultQueryParams = {
        category: category,
        subcategory: subcategory,
        pmin: null,
        pmax: null,
        filterByColor: null,
        filterBySize: null
    }

    const [queryParams, setQueryParams] = useState(defaultQueryParams)
    const [products, setProducts] = useState(null)
    const [subcategoryOptions, setSubCategoryOptions] = useState(null)
    const [filterComponentEnabled, setFilterComponentEnabled] = useState(true)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        let params = {}
        let searchParams = new URLSearchParams(location.search)
        sanitizeSearchParams(searchParams)
        for (const key of searchParams.keys()) {
            params[key] = searchParams.getAll(key)
        }
        setQueryParams(prev => ({ ...defaultQueryParams, ...params, category: category, subcategory: subcategory }));
    }, [location.search, category, subcategory])

    useEffect(() => {

        // Fetch products depending on category 

        let getProducts = null
        let getSubcategories = null

        const getFilteredProducts = async () => {
            try {
                const filteredProducts = await axios.get(`http://localhost:8080/api/applyFilters/${JSON.stringify(queryParams)}`, { headers: { "Content-Type": 'application/json' } })
                if (filteredProducts.status === 200) {

                    getProducts = filteredProducts.data.allFilteredProducts
                    getSubcategories = filteredProducts.data.allSubcategories.map((s) => s.subcategory[0].toUpperCase() + s.subcategory.slice(1))


                    if (getProducts.length === 0)
                        setProducts(prev => null)
                    else
                        setProducts(prev => getProducts)

                    if (getSubcategories.length === 0)
                        setSubCategoryOptions(prev => null)
                    else {

                        setSubCategoryOptions(prev => getSubcategories)
                    }


                    setLoading(false)
                }
            }
            catch (error) {
                console.log(error.message)
            }
        }

        getFilteredProducts()


    }, [queryParams])


    const toggleFilter = (e) => {
        setFilterComponentEnabled(!filterComponentEnabled)
    }


    const imageHeight = 400;
    const imageWidth = 375;
    let productResults = <></>

    // placeholder for products until fetch is completed

    let productPlaceholders = <>
        <Product height={imageHeight} width={imageWidth} imageURL='/housoku-images/product14.jpg' />
        <Product height={imageHeight} width={imageWidth} imageURL='/housoku-images/product12.jpg' />
        <Product height={imageHeight} width={imageWidth} imageURL='/housoku-images/product9.jpg' />

        <Product height={imageHeight} width={imageWidth} imageURL='/housoku-images/product10.jpg' />
        <Product height={imageHeight} width={imageWidth} imageURL='/housoku-images/product2.jpg' />
        <Product height={imageHeight} width={imageWidth} imageURL='/housoku-images/product11.jpg' />

        <Product height={imageHeight} width={imageWidth} imageURL='/housoku-images/product7.jpg' />
    </>

    // if products are available, render

    if (products) {
        let imagePos = 0
        productResults = products.map(prod => {
            imagePos++;
            prod.price = parseFloat(prod.price)

            return <Product height={imageHeight} width={imageWidth} product={prod} key={prod.product_id} imagePosition={imagePos} isFilterEnabled={filterComponentEnabled} />
        })
    }
    else {
        productResults = <><p className='mainViewMsg'>No results found</p></>
    }

    return (
        <>
            <div className='browseProducts'>
                <div className='topLayer'>
                    {/*                     <div className='subheading'><span className='wallBreadCrumbs'>Men's Apparel</span></div> */}
                    <div className='wallHeaderContent'>
                        <div className='heading'><h4 className='wallHeader'>Browse Products</h4></div>
                        <div className='toggleHideFilter'>
                            <button className='toggleHideFilterBtn' onClick={toggleFilter}>
                                <span>{filterComponentEnabled ? 'Hide Filters' : 'Show Filters'}</span>
                                <img id='filterIcon' src='http://localhost:8080/housoku-images/icons/filter.png' alt='filter image by Rahul Kaklotar (falticon)' />
                            </button>
                        </div>
                    </div>
                </div>

                <div className='mainView'>
                    {!loading && filterComponentEnabled ?
                        (<div className='filters'>
                            <Filter filterCategory={category} filterSubcategories={subcategoryOptions} />
                        </div>)

                        :

                        <></>}

                    <div className='products'>

                        {loading ? productPlaceholders : productResults}
                        {/* {!loading && productResults} */}

                    </div>

                </div>
            </div >
        </>
    );
}