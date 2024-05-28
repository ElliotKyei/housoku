import './_shoppingCart.scss';
import ShoppingCartProduct from './shoppingCartProduct/shoppingCartProduct.js'
import { useSelector, useDispatch } from 'react-redux'
import { useEffect, useState } from 'react';
import axios from 'axios';
import { dbGetShoppingCart } from '../../reducers/shoppingCart/shoppingCartSlice.js';

export default function ShoppingCart() {
    const [loading, setLoading] = useState(true)
    const dispatch = useDispatch();
    const items = useSelector(state => state.shoppingCart.items)
    const subTotal = Number(useSelector(state => state.shoppingCart.subTotal))
    const shoppingCartCount = useSelector(state => state.shoppingCart.shoppingCartCount)
    const [orderCompleted, setOrderCompleted] = useState(false)

    let taxes = Number((subTotal * 0.13).toFixed(2));
    let total = Number((subTotal + taxes).toFixed(2));
    let itemCount = 0;

    useEffect(() => {
        setLoading(prev => false)
    }, [])

    const refreshCart = () => dispatch(dbGetShoppingCart())
    // handler function that runs when user clicks checkout

    const checkoutOrder = async () => {
        try {
            const finalOrder = {
                ...items,
                subTotal: subTotal,
                taxes: subTotal,
                total: total
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
                {items.map((prod, ind) => {
                    itemCount++
                    return <ShoppingCartProduct product={prod} productIndex={ind} key={ind} refreshCart={refreshCart} />
                })
                }
            </>
    }

    else {
        renderProducts =
            <>
                <p className='emptyCartMsg'>There are no items in your bag.</p>
            </>
    }

    return (
        <>
            {!loading && (
                <div className='shoppingCart'>

                    <div className='shoppingCartDetails'>
                        <div className='bagContainer'>

                            <div className='bagHeading'>
                                <h4 className='title'>Shopping Bag</h4>
                            </div>
                            <div className='bagSubheading'>
                                <p className='subTitle'>{itemCount} {itemCount.length === 1 ? 'item' : 'items'} | {total > 0 ? `$${total}` : '-'}</p>
                            </div>

                            <div ><hr className='topDivider' /></div>

                            <div className='cartProductContainer'>
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
            )}
        </>
    )
}