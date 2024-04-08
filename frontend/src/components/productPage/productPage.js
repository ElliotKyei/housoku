import { useEffect, useState } from 'react';
import './_productPage.scss'
import ProductDetails from './productDetails/productDetails.js'
import { useParams, useNavigate } from 'react-router-dom'
import axios from 'axios';

export default function ProductPage() {
    const navigate = useNavigate()
    const [product, setProduct] = useState(null)
    const { id, category } = useParams();
    const uuidv4Regex = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i

    function sanitizedProductId(id) {
        const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

        if (id.trim().length !== 36) {
            navigate('/')
            return false;
        }

        else if (!uuidRegex.test(id)) {
            navigate('/')
            return false
        }

        return true
    }

    useEffect(() => {
        if (sanitizedProductId(id)) {
            console.log("Getting product. ID is sanitized")
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
                    console.log("Product Data is ", product)
                }
                catch (error) {
                    navigate('/')
                }
            }

            getProduct();
        }
    }, [])

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