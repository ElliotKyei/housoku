import './_productDetails.scss';
import PropTypes from 'prop-types'
import { useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { dbAddProduct } from '../../../reducers/shoppingCart/shoppingCartSlice';


export default function ProductDetails(props) {
    const dispatch = useDispatch();

    const isAuthenticated = useSelector((state) => state.user.isAuthenticated)
    const [disableSubmit, setDisabledSubmit] = useState(false)
    const [sizeSelected, setSizeSelected] = useState("")
    const [sizeSelectedError, setSizeSelectedError] = useState(false)
    const [sizeClassName, setSizeClassName] = useState(null)
    const [currentMainImageSRC, setCurrentMainImageSRC] = useState(props.product.image_url);
    const [currentMainImageEffect, setCurrentMainImageEffect] = useState('image-1');
    const currentImageRef = useRef(null)


    let sizeClassNameTmp = {}
    const productName = props.product.product_name;
    const productDescription = props.product.description;
    const productId = props.product.product_id
    const price = props.product.price
    const size = props.product.size
    const imageURL = props.product.image_url
    const categoryName = props.product.category_name

    const mainProductImageStyle = {
        width: '100%',
        height: '100%',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        backgroundPositionY: 'center',
        overflow: 'hidden',
        borderRadius: '5px'
    }

    const productImageStyle = {

        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        backgroundPositionY: 'center',
        backgroundPositionX: 'center',
        overflow: 'hidden',
        borderRadius: '5px',
    }

    // handler function to change main image on hover

    const selectMainImage = (e) => {
        if (e.target === currentImageRef.current)
            return

        if (e.target !== currentImageRef.current) {
            currentImageRef.current.classList.remove('selectedImage')


            e.target.classList.add('selectedImage')
            setCurrentMainImageSRC(e.target.src)
            setCurrentMainImageEffect(e.target.id)
            currentImageRef.current = e.target
        }
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

    const addToBag = (e) => {

        if (isAuthenticated && e.target) {

            e.target.disabled = true
            setDisabledSubmit(prev => true)

            if (sizeSelected.trim().length === 0) {
                setSizeSelectedError(prev => true)
                e.target.disabled = false
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
                console.log(e.target.textContent)
                e.target.textContent = "Adding..."
                e.target.className = "checkoutBtnDisabled"

                if (!disableSubmit) {
                    setTimeout(() => {
                        dispatch(dbAddProduct(product))
                        e.target.disabled = false
                        setDisabledSubmit(prev => false)
                        e.target.textContent = "Add to Bag"
                        e.target.className = "checkoutBtn"
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
            <div className='productImages'>
                <div className='productImage' ><img id='image-1' className='selectedImage imageEffects' src={imageURL} style={productImageStyle} alt="product" onMouseOver={selectMainImage} ref={currentImageRef} /></div>
                <div className='productImage' ><img id='image-2' className='imageEffects' src={imageURL} style={productImageStyle} alt="product" onMouseOver={selectMainImage} /></div>
                <div className='productImage' ><img id='image-3' className='imageEffects' src={imageURL} style={productImageStyle} alt="product" onMouseOver={selectMainImage} /></div>
                <div className='productImage' ><img id='image-4' className='imageEffects' src={imageURL} style={productImageStyle} alt="product" onMouseOver={selectMainImage} /></div>
                <div className='productImage' ><img id='image-5' className='imageEffects' src={imageURL} style={productImageStyle} alt="product" onMouseOver={selectMainImage} /></div>
                <div className='productImage' ><img id='image-6' className='imageEffects' src={imageURL} style={productImageStyle} alt="product" onMouseOver={selectMainImage} /></div>
            </div>



            <div className='item productImgContainer'>
                <div className='mainProductImage'> <img src={currentMainImageSRC} id={currentMainImageEffect} style={mainProductImageStyle} alt="product" /></div>
            </div>

            <div className='item productInfoTop'>
                <p className='productName'>{productName}</p>
                <p className='productCategory'>{categoryName}</p>
                <p className='productPrice'>${price} CAD</p>
            </div>

            <div className='item productInfo'>
                <p className='productName'>{productName}</p>
                <p className='productCategory'>{categoryName}</p>
                <p className='productPrice'>${price} CAD</p>
                <p className='productDesc'>{productDescription}</p>

                {/*  <p className='productColour'>Colour </p>
                <div className='btnSelect'><button className='colourBtn'></button></div><br /> */}

                <p className='productSize'>Select size </p>
                <div className='sizeBtnContainer'>
                    {
                        size.map(s => {

                            sizeClassNameTmp[`${s}Class`] = "sizeBtn"
                            return <button
                                className={sizeClassName ? sizeClassName[`${s}Class`] : 'sizeBtn'}
                                name={s}
                                onFocus={selectSize}
                                value={sizeSelected}>
                                {s.toUpperCase()}
                            </button>
                        })
                    }

                    {/*   <input type='radio' className='sizeRadio' id='size' name='size' value={sizeSelected} />
                    <label className='customSizeRadio'>test</label> */}

                </div>
                <input type='hidden' value='/' />
                {/*   <button className="quantityBtn">Quantity</button> */}
                {sizeSelectedError && <div className='errorMsg' id='otherErrors'>Please select a size.</div>}
                <button className="checkoutBtn" onClick={addToBag}>Add to Bag</button>

            </div>


            <div className='item productInfoBottom'>
                <p className='productDesc'>{productDescription}</p>
                <p className='productSize'>Select size </p>
                <div className='sizeBtnContainer'>
                    {
                        size.map(s => {

                            sizeClassNameTmp[`${s}Class`] = "sizeBtn"
                            return <button
                                className={sizeClassName ? sizeClassName[`${s}Class`] : 'sizeBtn'}
                                name={s}
                                onFocus={selectSize}
                                value={sizeSelected}>
                                {s.toUpperCase()}
                            </button>
                        })
                    }

                    {/*   <input type='radio' className='sizeRadio' id='size' name='size' value={sizeSelected} />
                    <label className='customSizeRadio'>test</label> */}

                </div>
                <input type='hidden' value='/' />
                {/*   <button className="quantityBtn">Quantity</button> */}
                {sizeSelectedError && <div className='errorMsg' id='otherErrors'>Please select a size.</div>}
                <button className="checkoutBtn" onClick={addToBag}>Add to Bag</button>
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
