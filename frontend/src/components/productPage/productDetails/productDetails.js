import './_productDetails.scss';
import PropTypes from 'prop-types'
import { useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { dbAddProduct } from '../../../reducers/shoppingCart/shoppingCartSlice';


export default function ProductDetails(props) {
    const dispatch = useDispatch();
    const submitBtn = useRef(null);

    const isAuthenticated = useSelector((state) => state.user.isAuthenticated)
    const [disableSubmit, setDisabledSubmit] = useState(false)
    const [sizeSelected, setSizeSelected] = useState("")
    const [sizeSelectedError, setSizeSelectedError] = useState(false)
    const [sizeClassName, setSizeClassName] = useState(null)


    let sizeClassNameTmp = {}
    const productName = props.product.product_name;
    const productDescription = props.product.description;
    const productId = props.product.product_id
    const price = props.product.price
    const size = props.product.size
    const imageURL = props.product.image_url
    const categoryName = props.product.category_name

    const productImageStyle = {
        height: props.height + 'px',
        width: props.width + 'px',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        backgroundPositionY: 'center',
        overflow: 'hidden'
    }

    // handler function whenever a size is selected

    const selectSize = (e) => {
        setSizeSelected(prev => e.target.name)
        setSizeClassName(prev => ({
            ...sizeClassNameTmp,
            [`${e.target.name}Class`]: 'sizeBtnSelected'
        }))

        setSizeSelectedError(prev => false)
    }

    // handler function whenever a size is selected

    const addToBag = () => {

        if (isAuthenticated && submitBtn.current) {

            submitBtn.current.disabled = true
            setDisabledSubmit(prev => true)

            if (sizeSelected.trim().length === 0) {
                setSizeSelectedError(prev => true)
                submitBtn.current.disabled = false
                setDisabledSubmit(prev => false)
                return
            }
            else {

                const product = {
                    product_id: productId,
                    product_name: productName,
                    size: sizeSelected,
                    image_url: imageURL,
                    category_name: categoryName,
                    quantity: 1
                }
                submitBtn.current.textContent = "Adding..."
                submitBtn.current.className = "checkoutBtnDisabled"

                if (!disableSubmit) {
                    setTimeout(() => {
                        dispatch(dbAddProduct(product))
                        submitBtn.current.disabled = false
                        setDisabledSubmit(prev => false)
                        submitBtn.current.textContent = "Add to Bag"
                        submitBtn.current.className = "checkoutBtn"
                    }, 300)
                }
            }
        }
    }


    return (

        /* Generate a flexbox (for direction) named 'product'
       First inner div (productImage) is the product image
       Second inner div (productInfo) is th
       e product information  */

        <div className='productDetails'>
            <img src={imageURL} style={productImageStyle} alt="product" />
            <div className='productInfo'>
                <p className='productName'>{productName}</p>
                <p className='productCategory'>{categoryName}</p>
                <p className='productDesc'>{productDescription}</p>
                <p className='productPrice'>${price} CAD</p>

                {/*    <p className='productColour'>Colour </p>
                <div className='btnSelect'><button className='colourBtn'></button></div><br /> */}

                <p className='productSize'>Select size </p>
                <div>
                    {


                        size.map(s => {

                            sizeClassNameTmp[`${s}Class`] = "sizeBtn"
                            return <button
                                className={sizeClassName ? sizeClassName[`${s}Class`] : 'sizeBtn'}
                                name={s}
                                onFocus={selectSize}
                                value={sizeSelected}>
                                {s}
                            </button>
                        })
                    }

                    {/*   <input type='radio' className='sizeRadio' id='size' name='size' value={sizeSelected} />
                    <label className='customSizeRadio'>test</label> */}

                </div>
                <input type='hidden' value='/' />
                {/*   <button className="quantityBtn">Quantity</button> */}
                {sizeSelectedError && <div className='errorMsg' id='otherErrors'>Please select a size.</div>}
                <button className="checkoutBtn" onClick={addToBag} ref={submitBtn}>Add to Bag</button>

            </div>
        </div>
    )
}

ProductDetails.defaultProps = {
    height: 258,
    width: 430,
    product: {
        brand: "Jordan",
        category_id: "Jordan Big Boys Bucket Hat",
        category_name: "Hats",
        colour: ['Black'],
        description: "Keep your cool in the sun and light up in the night in the Jordan Boys Bucket Hat.",
        image_url: '../../../../public/housoku-images/productTest.jpg',
        price: 39.99,
        product_id: 0,
        product_name: 'Jordan Big Boys Bucket Hat',
        size: ['S', 'M', 'L'],
        subcategory: 'Bucket Hat'
    }
}

ProductDetails.propTypes = {
    height: PropTypes.number,
    width: PropTypes.number,
    product: PropTypes.shape({
        brand: PropTypes.string,
        category_id: PropTypes.string,
        category_name: PropTypes.string,
        colour: PropTypes.array,
        description: PropTypes.string,
        image_url: PropTypes.string,
        price: PropTypes.number,
        product_id: PropTypes.number,
        product_name: PropTypes.string,
        size: PropTypes.array,
        subcategory: PropTypes.string
    })

}
