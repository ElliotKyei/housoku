import './_productDetails.scss';
import PropTypes from 'prop-types'


export default function ProductDetails(props) {

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
        backgroundImage: `url(${imageURL})`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        backgroundPositionY: 'center',
        overflow: 'hidden'
    }

    return (

        /* Generate a flexbox (for direction) named 'product'
       First inner div (productImage) is the product image
       Second inner div (productInfo) is th
       e product information  */

        <div className='productDetails'>
            <img src={imageURL} style={productImageStyle}></img>
            <div className='productInfo'>
                <p className='productName'>{productName}</p>
                <p className='productCategory'>{categoryName}</p>
                <p className='productDesc'>{productDescription}</p>
                <p className='productPrice'>${price} CAD</p>
                {/*    <p className='productColour'>Colour </p>
                <div className='btnSelect'><button className='colourBtn'></button></div><br /> */}
                <p className='productSize'>Select size </p>
                <div>
                    {size.map(s => <button className='sizeBtn'>{s}</button>)}
                </div>
                <input type='hidden' value='/' />
                {/*   <button className="quantityBtn">Quantity</button> */}
                <button className="checkoutBtn">Add to Bag</button>

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
