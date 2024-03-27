import './_productDetails.scss';
import PropTypes from 'prop-types'


export default function ProductDetails(props) {
    return (

        /* Generate a flexbox (for direction) named 'product'
       First inner div (productImage) is the product image
       Second inner div (productInfo) is th
       e product information  */

        <div className='productDetails'>
            <div className='productImage' style={{ height: props.height + 'px', width: props.width + 'px' }}></div>
            <div className='productInfo'>
                <p className='productName'>Jordan Big Boys Bucket Hat</p>
                <p className='productCategory'>Hats</p>
                <p className='productDesc'>Keep your cool in the sun and light up in the night in the Jordan Boys Bucket Hat.</p>
                <p className='productPrice'>$39.99</p>
                <p className='productColour'>Colour </p>
                <div className='btnSelect'><button className='colourBtn'></button></div><br />
                <p className='productSize'>Select size </p>
                <div>
                    <button className='sizeBtn'>S</button>
                    <button className='sizeBtn'>M</button>
                    <button className='sizeBtn'>L</button>
                </div>
                <input type='hidden' value='/' />
                {/* <button className="quantityBtn">Quantity</button> */}
                <button className="checkoutBtn">Add to Bag</button>

            </div>
        </div>
    )
}

ProductDetails.defaultProps = {
    height: 258,
    width: 430
}

ProductDetails.propTypes = {
    height: PropTypes.number,
    width: PropTypes.number
}
