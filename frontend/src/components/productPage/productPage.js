import { useEffect, useState } from 'react';
import './_productPage.scss'
import ProductDetails from './productDetails/productDetails.js'
import { useParams, useNavigate } from 'react-router-dom'
import axios from 'axios';
import sanitizedProductId from '../../customHooks/sanitizeProductId.js';

export default function ProductPage() {
    const navigate = useNavigate()
    const [product, setProduct] = useState(null)
    const { id, category } = useParams();


    // Sanitize the product ID and fetch from database

    useEffect(() => {
        if (sanitizedProductId(id)) {
            const getProduct = async () => {
                try {
                    const getProduct = await axios.get(`http://localhost:8080/api/getProductById/${id}`)


                    if (category !== getProduct.data.category_name.trim().toLowerCase()) {
                        navigate('/')
                    }

                    setProduct(prev => ({
                        ...getProduct.data,
                        price: parseFloat(getProduct.data.price)
                    }))
                }
                catch (error) {
                    navigate('/')
                }
            }

            getProduct();
        }
    }, [])

    // render product if valid

    let renderProduct = <></>

    if (product) {
        renderProduct = <ProductDetails width={550} height={620} product={product} />
    }

    return (
        <>
            <div className='productPage'>
                {renderProduct}
            </div>
        </>
    )
}