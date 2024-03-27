import './_product.scss';
import PropTypes from 'prop-types'

export default function Product(props) {


    const productImageStyle = {
        height: props.height + 'px',
        width: props.width + 'px',
        backgroundImage: `url(${props.imageURL})`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        backgroundPositionY: 'bottom',
        overflow: 'hidden'
    }

    //height: props.height + 'px', width: props.width + 'px'
    return (

        /* Generate a flexbox named 'products' (using columns)
        First inner div (productImage) is the product image
        Second inner div (productInfo) is the product information  */

        <div className='productContainer'>
            <a href='/product-page'><div className='productImage' style={productImageStyle}></div></a>
            <div className='productInfo'>
                <p className='productName'>Product</p>
                {/*    <p className='productDesc'>Description of first product</p> */}
                <p className='productPrice'>$10.99 CAD</p>
            </div>
        </div>
    )
}

Product.defaultProps = {
    height: 258,
    width: 430,
    imageURL: '/housoku-images/productTest.jpg'
}

Product.propTypes = {
    height: PropTypes.number,
    width: PropTypes.number,
    imageURL: PropTypes.string
}
