import './_shoppingCart.scss';
import ShoppingCartProduct from './shoppingCartProduct/shoppingCartProduct.js'
import { useSelector, useDispatch } from 'react-redux'
import { useState } from 'react';
import axios from 'axios';
import { dbGetShoppingCart } from '../../reducers/shoppingCart/shoppingCartSlice.js';

export default function ShoppingCart() {
    const dispatch = useDispatch();
    const items = useSelector(state => state.shoppingCart.items)
    const subTotal = Number(useSelector(state => state.shoppingCart.subTotal))
    const shoppingCartCount = useSelector(state => state.shoppingCart.shoppingCartCount)
    const [orderCompleted, setOrderCompleted] = useState(false)

    // Calculate tax and total

    const taxes = Number((subTotal * 0.13).toFixed(2))
    const total = Number((subTotal + taxes).toFixed(2))

    // handler function that runs when user clicks checkout

    const checkoutOrder = async () => {
        try {
            const finalOrder = {
                ...items,
                subTotal: subTotal,
                taxes: subTotal,
                subTotal: subTotal,
            }

            const checkout = await axios.post('http://localhost:8080/api/check-out', finalOrder,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Cache-Control': 'no-cache'
                    },
                    withCredentials: true
                })


            if (checkout.status === 200) {
                setOrderCompleted(prev => true)
                dispatch(dbGetShoppingCart())
            }
        }
        catch (error) {
            console.log(error)
        }
    }


    // If user has items in cart, render them.

    let renderProducts = <></>

    if (shoppingCartCount !== 0) {
        renderProducts =
            <>
                {items.map((prod, ind) => <ShoppingCartProduct product={prod} key={ind} />)}
            </>
    }
    else {
        renderProducts =
            <>
                <p>There are no items in your bag.</p>
            </>
    }

    return (
        <>
            <div className='shoppingCart'>

                <div className='shoppingCartDetails'>
                    <div className='bagContainer'>
                        <div className='bagHeading'>
                            <h4 className='title'>Shopping Bag</h4>
                        </div>

                        <div>
                            {renderProducts}
                        </div>

                    </div>

                    <div className='summaryContainer'>
                        <div className='summaryHeading'>
                            <h4 className='title'>Summary</h4>
                        </div>
                        <div className='subtotalContainer'>
                            {subTotal > 0 ? <p>Subtotal <span style={{ float: 'right' }}>${subTotal} CAD</span></p> : <p>Subtotal <span style={{ float: 'right' }}>-</span></p>}
                        </div>
                        <div className='deliveryFeeContainer'>
                            <p>Estimated Delivery & Handling <span style={{ float: 'right' }}>Free</span></p>
                        </div>
                        <div className='taxContainer'>
                            {taxes > 0 ? <p>Taxes <span style={{ float: 'right' }}>${taxes} CAD</span></p> : <p>Taxes <span style={{ float: 'right' }}>-</span></p>}
                        </div>

                        <hr className='summaryDivider' />

                        <div className='toalContainer'>
                            {total > 0 ? <p>Total <span style={{ float: 'right' }}>${total} CAD</span></p> : <p>Total <span style={{ float: 'right' }}>-</span></p>}
                        </div>
                        <hr className='summaryDivider' />

                        <button className="checkoutBtn" onClick={() => checkoutOrder()}>Checkout</button>

                    </div>
                </div>

            </div>

        </>
    )
}