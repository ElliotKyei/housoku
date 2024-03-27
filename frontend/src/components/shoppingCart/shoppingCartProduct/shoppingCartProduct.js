import './shoppingCartProduct.scss'


export default function ShoppingCartProduct() {
    return (
        <>
            <div className='shoppingCartProduct'>
                <div className='productImage'></div>
                <div className='productDetails'>
                    <p className='productName'>Jordan Big Boys Bucket Hat</p>
                    <p className='productCategory'>Hats</p>
                    <span className='productColour'>Colour Black</span>
                    <span className='productSize'>Size M</span>
                    <span className='productQuantity'>Quantity 1</span>
                </div>
                <p className='productPrice'>$39.99 CAD</p>

            </div>
            <div ><hr className='shoppingCartDivider' /></div>

        </>
    );

}
