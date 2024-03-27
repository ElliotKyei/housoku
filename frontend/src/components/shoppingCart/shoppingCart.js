import './shoppingCart.scss';
import ShoppingCartProduct from './shoppingCartProduct/shoppingCartProduct.js'

export default function ShoppingCart() {
    return (
        <>
            <div className='shoppingCart'>

                <div className='shoppingCartDetails'>
                    <div className='bagContainer'>
                        <div className='bagHeading'>
                            <h4 className='title'>Shopping Bag (count items)</h4>
                        </div>

                        <div>
                            <ShoppingCartProduct />
                            <ShoppingCartProduct />
                            <ShoppingCartProduct />
                            <ShoppingCartProduct />
                            <ShoppingCartProduct />
                            <ShoppingCartProduct />
                        </div>

                    </div>

                    <div className='summaryContainer'>
                        <div className='summaryHeading'>
                            <h4 className='title'>Summary</h4>
                        </div>
                        <div className='subtotalContainer'>
                            <p>Subtotal <span style={{ float: 'right' }}>$99.99 CAD</span></p>
                        </div>
                        <div className='deliveryFeeContainer'>
                            <p>Estimated Delivery & Handling <span style={{ float: 'right' }}>Free</span></p>
                        </div>
                        <div className='taxContainer'>
                            <p>Taxes <span style={{ float: 'right' }}>$19.99 CAD</span></p>
                        </div>

                        <hr className='summaryDivider' />

                        <div className='toalContainer'>
                            <p>Total <span style={{ float: 'right' }}>$139.99 CAD</span></p>
                        </div>
                        <hr className='summaryDivider' />

                        <button className="checkoutBtn">Checkout</button>

                    </div>
                </div>

            </div>

        </>
    )
}