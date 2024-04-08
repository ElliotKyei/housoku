import './browseProducts.scss'
import Product from './product/product.js'
import axios from 'axios';
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';

export default function BrowseProducts() {
    //const [currentCategory, setCurrentCategory] = useState("Tops")
    const [products, setProducts] = useState(null)
    const { category } = useParams()

    useEffect(() => {

        const fetchProducts = async () => {
            let getProducts = null

            try {
                if (category === "tops") {
                    getProducts = await axios.get("http://localhost:8080/api/getAllTops")
                }
                else if (category === "pants") {
                    getProducts = await axios.get("http://localhost:8080/api/getAllPants")
                }
                else if (category === "shoes") {
                    getProducts = await axios.get("http://localhost:8080/api/getAllShoes")
                }

                if (getProducts) {

                    setProducts(prev => getProducts.data)
                }
            }

            catch (error) {
                console.log(error)
            }
        }

        fetchProducts();

    }, [])


    const imageHeight = 400;
    const imageWidth = 360;

    /* Actual image dimensions when I implement side bar
    const imageHeight = 390;
    const imageWidth = 360;
    */

    let renderProducts = <></>
    {/* <>
            <Product height={imageHeight} width={imageWidth} imageURL='/housoku-images/product14.jpg' />
            <Product height={imageHeight} width={imageWidth} imageURL='/housoku-images/product12.jpg' />
            <Product height={imageHeight} width={imageWidth} imageURL='/housoku-images/product9.jpg' />

            <Product height={imageHeight} width={imageWidth} imageURL='/housoku-images/product10.jpg' />
            <Product height={imageHeight} width={imageWidth} imageURL='/housoku-images/product2.jpg' />
            <Product height={imageHeight} width={imageWidth} imageURL='/housoku-images/product11.jpg' />

            <Product height={imageHeight} width={imageWidth} imageURL='/housoku-images/product7.jpg' />
        </> */}

    if (products) {
        let imagePos = 0
        renderProducts = products.map(prod => {
            imagePos++;
            prod.price = parseFloat(prod.price)
            return <Product height={imageHeight} width={imageWidth} product={prod} key={prod.product_id} imagePosition={imagePos} />

        })

    }

    return (
        <>
            <div className='browseProducts'>
                <div>
                    <span className='wallBreadCrumbs'>Men's Apparel</span>
                    <h4 className='wallHeader'>Browse Products</h4>
                </div>
                <div className='products'>
                    {renderProducts}
                </div>
            </div>
        </>
    );
}