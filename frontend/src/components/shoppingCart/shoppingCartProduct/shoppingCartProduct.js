import './_shoppingCartProduct.scss'
import PropTypes from 'prop-types'
import slugify from 'slugify'
import { useDispatch } from 'react-redux'
import { dbRemoveProduct, dbUpdateProductQuantity, dbUpdateProductSize } from '../../../reducers/shoppingCart/shoppingCartSlice';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import sanitizedProductId from '../../../customHooks/sanitizeProducts/sanitizeProductId';
const bin = '/housoku-images/bin.png'


export default function ShoppingCartProduct(props) {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [productPrice, setProductPrice] = useState(0)
    const [maxProductQuantity, setMaxProductQuantity] = useState(0)
    const [availableProductSizes, setProductSizes] = useState(null)

    // Get the product price from the server, and store it in productPrice useState  

    useEffect(() => {

        if (sanitizedProductId(productId)) {
            const getProduct = async () => {
                try {
                    const getProduct = await axios.get(`http://localhost:8080/api/getProductById/${productId}`)
                    setProductPrice(prev => getProduct.data.price)
                    setProductSizes(prev => getProduct.data.size)

                    const maxQuantity = 10
                    const maxProductQuantityArr = []

                    for (let i = 1; i <= maxQuantity; i++)
                        maxProductQuantityArr.push(i)

                    setMaxProductQuantity(prev => maxProductQuantityArr)
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

    }, [props])



    const slugifyProductName = slugify(props.product.product_name).toLowerCase();
    const productName = props.product.product_name;
    const productId = props.product.product_id
    const size = props.product.size
    const imageURL = props.product.image_url
    const categoryName = props.product.category_name
    const quantity = props.product.quantity
    const productIndex = props.productIndex

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


    const updateProductQuantity = async (e) => {
        try {
            const { value: newQuantity } = e.target
            await dispatch(dbUpdateProductQuantity(productIndex, newQuantity))
            props.refreshCart();
        }
        catch (error) {
            console.log(error.message)
        }

    }

    const updateProductSize = async (e) => {
        try {
            const { value: newSize } = e.target
            await dispatch(dbUpdateProductSize(productIndex, productId, newSize))
            props.refreshCart();
        }
        catch (error) {
            console.log(error.message)
        }

    }

    const removeProduct = async (e) => {
        try {
            await dispatch(dbRemoveProduct(productIndex))
            props.refreshCart();
        }
        catch (error) {
            console.log(error.message)
        }

    }

    return (
        <>
            <div className='shoppingCartProduct'>
                <div className='productImage'>

                    <a href={`/apparel/browse-products/${categoryName.toLowerCase()}/${slugifyProductName}/${productId}`}> <img src={imageURL} style={productImageStyle} /></a>
                </div>


                <div className='productDetails'>
                    {productPrice > 0 ? <p className='productPriceTop'>${productPrice} CAD</p> : <p className='productPrice'>-</p>}
                    <a href={`/apparel/browse-products/${categoryName.toLowerCase()}/${slugifyProductName}/${productId}`}><p className='productName'>{productName}</p></a>
                    <p className='productCategory'>{categoryName}</p>
                    {/*<span className='productColour'>Colour Black</span> */}
                    <div className='productOptions'>
                        <p className='productSize'>Size
                            <select name='size' onChange={(e) => updateProductSize(e)} className='sizeSelectList'>
                                {availableProductSizes &&
                                    availableProductSizes.map(s => {
                                        if (size === s)
                                            return <option value={s} selected>{s.toUpperCase()}</option>
                                        else
                                            return <option value={s}>{s.toUpperCase()}</option>

                                    })}
                            </select>
                        </p>

                        <p className='productQuantity'>Quantity
                            <select name='quantity' onChange={(e) => updateProductQuantity(e)} className='quantitySelectList'>
                                {maxProductQuantity &&
                                    maxProductQuantity.map(q => {
                                        if (quantity === q)
                                            return <option value={q} selected>{q}</option>
                                        else
                                            return <option value={q}>{q}</option>

                                    })}
                            </select>



                        </p>
                    </div>

                    <img id='bin' src={bin} alt='Trash icons created by Freepik - Flaticon' onClick={removeProduct} />
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
    productIndex: 999
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
    }),
    productIndex: PropTypes.number
}
