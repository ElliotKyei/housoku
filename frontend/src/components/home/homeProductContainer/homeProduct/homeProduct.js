import './_homeProduct.scss';
import slugify from 'slugify'
import PropTypes from 'prop-types'


export default function HomeProduct(props) {

    const slugifyProductName = slugify(props.product.product_name).toLowerCase();
    const productName = props.product.product_name;
    const productId = props.product.product_id
    const price = props.product.price
    const imageURL = props.product.image_url
    const categoryName = props.product.category_name

    const productImageStyle = {
        height: props.height + 'px',
        width: props.width + 'px',
        backgroundImage: `url(${imageURL})`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        backgroundPositionY: 'center',
        borderRadius: '5px',
        overflow: 'hidden'
    }

    return (

        /* Generate a flexbox named 'products' (using columns)
        First inner div (productImage) is the product image
        Second inner div (productInfo) is the product information  */

        <div className='homeProduct'>
            <a href={`/apparel/browse-products/${categoryName.toLowerCase()}/${slugifyProductName}/${productId}`}>

                <div className='productImgContainer'> <img className='productImg' src={imageURL} style={productImageStyle} alt="product" /></div>
                <div className='productInfo'>
                    <p className='productName'>{productName}</p>
                    <p className='productDesc'>{categoryName}</p>
                    <p className='productPrice'>{price ? `CA$${price}` : ''}</p>
                </div>
            </a>
        </div>
    )
}

HomeProduct.defaultProps = {
    height: 460,
    width: 460,
    product: {
        product_id: "0",
        product_name: '',
        price: null,
        image_url: '',
        category_name: ""
    },
    imagePosition: 1

}

HomeProduct.propTypes = {
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