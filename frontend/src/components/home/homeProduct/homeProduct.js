import './_homeProduct.scss';
import PropTypes from 'prop-types'


export default function HomeProduct(props) {
    return (

        /* Generate a flexbox named 'products' (using columns)
        First inner div (productImage) is the product image
        Second inner div (productInfo) is the product information  */

        <div className='product'>
            <a href='/product-page'><div className='productImage' style={{ height: props.height + 'px', width: props.width + 'px' }}></div></a>
            <div className='productInfo'>
                <p className='productName'>Product</p>
                <p className='productDesc'>Description of first product</p>
                <p className='productPrice'>$10.99</p>
            </div>
        </div>
    )
}

HomeProduct.defaultProps = {
    height: 258,
    width: 430
}

HomeProduct.propTypes = {
    height: PropTypes.number,
    width: PropTypes.number
}
