import './_shoppingCartProduct.scss'
import PropTypes from 'prop-types'
import slugify from 'slugify'
import { useDispatch } from 'react-redux'
import { dbRemoveProduct, dbUpdateProductQuantity } from '../../../reducers/shoppingCart/shoppingCartSlice';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import sanitizedProductId from '../../../customHooks/sanitizeProductId';
const bin = '/housoku-images/bin.png'


export default function ShoppingCartProduct(props) {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [productPrice, setProductPrice] = useState(0)

    const slugifyProductName = slugify(props.product.product_name).toLowerCase();
    const productName = props.product.product_name;
    const productId = props.product.product_id
    const size = props.product.size
    const imageURL = props.product.image_url
    const categoryName = props.product.category_name
    const quantity = props.product.quantity
    const price = props.product.quantity
    const itemKey = props.key

    const productImageStyle = {
        height: '158px',
        width: '180px',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        backgroundPositionY: 'center',
        overflow: 'hidden',
        borderRadius: 0,
        padding: 0,
        margin: 0,
    }

    // Get the product price from the server, and store it in productPrice useState  

    useEffect(() => {
        if (sanitizedProductId(productId)) {
            const getProduct = async () => {
                try {
                    const getProduct = await axios.get(`http://localhost:8080/api/getProductById/${productId}`)
                    setProductPrice(prev => getProduct.data.price)
                    const price = Number(getProduct.data.price)
                }
                catch (error) {
                    console.log(error)
                }
            }

            getProduct();
        }
        else {
            navigate('/')
        }

    }, [])


    return (
        <>
            <div className='shoppingCartProduct'>
                <div className='productImage'>

                    <a href={`/apparel/browse-products/${categoryName.toLowerCase()}/${slugifyProductName}/${productId}`}> <img src={imageURL} style={productImageStyle} /></a>
                </div>


                <div className='productDetails'>
                    <a href={`/apparel/browse-products/${categoryName.toLowerCase()}/${slugifyProductName}/${productId}`}><p className='productName'>{productName}</p></a>
                    <p className='productCategory'>{categoryName}</p>
                    {/*<span className='productColour'>Colour Black</span> */}
                    <span className='productSize'>Size {size}</span>
                    <span className='productQuantity'>Quantity: {quantity}</span>
                    <img id='bin' src={bin} alt='Trash icons created by Freepik - Flaticon' />
                </div>
                {productPrice > 0 ? <p className='productPrice'>${productPrice} CAD</p> : <p className='productPrice'>-</p>}
            </div>
            <div ><hr className='shoppingCartDivider' /></div>

        </>
    );

}

ShoppingCartProduct.defaultProps = {
    product: {
        category_name: "Hats",
        image_url: '../../../../public/housoku-images/productTest.jpg',
        product_id: 0,
        product_name: 'Jordan Big Boys Bucket Hat',
        price: 999,
        quantity: 1,
        size: 'M',
    },
}

ShoppingCartProduct.propTypes = {
    product: PropTypes.shape({
        category_name: PropTypes.string,
        image_url: PropTypes.string,
        product_id: PropTypes.number,
        product_name: PropTypes.string,
        price: PropTypes.number,
        quantity: PropTypes.number,
        size: PropTypes.string
    })
}
