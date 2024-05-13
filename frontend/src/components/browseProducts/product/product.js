import './_product.scss';
import PropTypes from 'prop-types'
import slugify from 'slugify'
import { Link } from 'react-router-dom';

export default function Product(props) {
    const slugifyProductName = slugify(props.product.product_name).toLowerCase();
    const productName = props.product.product_name;
    const productId = props.product.product_id
    const price = props.product.price
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

    return (

        /* Generate a flexbox named 'products' (using columns)
        First inner div (productImage) is the product image
        Second inner div (productInfo) is the product information  */
        <>
            <div className='productContainer'>
                <Link to={`/apparel/browse-products/${categoryName.toLowerCase()}/${slugifyProductName}/${productId}`}>
                    <img src={imageURL} style={productImageStyle} alt="product" />
                </Link>
                <div className='productInfo'>
                    <p className='productName'>{productName}</p>
                    <p className='categoryName'>{categoryName}</p>
                    <p className='productPrice'>${price} CAD</p>
                </div>
            </div>
        </>
    )
}

Product.defaultProps = {
    height: 258,
    width: 430,
    product: {
        product_id: "0",
        product_name: 'Product',
        price: 15.99,
        image_url: '/housoku-images/productTest.jpg',
        category_name: "tops"
    },
    imagePosition: 1

}

Product.propTypes = {
    height: PropTypes.number,
    width: PropTypes.number,
    product: PropTypes.shape({
        product_id: PropTypes.string,
        product_name: PropTypes.string,
        price: PropTypes.number,
        image_url: PropTypes.string,
        category_name: PropTypes.string
    }),
    imagePosition: PropTypes.number
};