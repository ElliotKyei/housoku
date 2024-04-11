import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import './_navbar.scss'
import { dbGetShoppingCart } from '../../reducers/shoppingCart/shoppingCartSlice';
const shoppingCart = '/housoku-images/shopping-bag.png'
const userProfile = '/housoku-images/user-profile.png'

export default function Navbar() {
    const [loading, setLoading] = useState(true)
    const cartCount = useSelector(state => state.shoppingCart.shoppingCartCount);

    useEffect(() => {
        setLoading(prev => false)
    }, [])

    return (
        <>

            {loading ? (<></>)

                :

                (


                    <nav className='navbar'>

                        {/* 1st element in flexbox row: navbar brand (Housoku)  */}

                        <div className='navbar-brand'>
                            <a href='/'><span id='brand'>Housoku</span></a>
                        </div>

                        {/* 2nd element in flexbox row: list of links <- also a flexbox (row direction)  */}


                        <div className='navbar-list' >
                            <ul>
                                <li><a className='link' href='/apparel/browse-products/tops'>Tops</a></li>
                                <li><a className='link' href='/apparel/browse-products/pants'>Pants</a></li>
                                <li><a className='link' href='/apparel/browse-products/shoes'>Shoes</a></li>
                            </ul>
                        </div>

                        {/* 3rd element in flexbox row: searchbar  */}
                        <div className='searchbar'>
                            <div className='searchQuery'>
                                <span>Search</span>
                            </div>
                        </div>

                        {/* 4th element in flexbox row: searchbar  */}

                        {/*    {isAuthenticated && <p>Hello, User!</p>}
                <div id='userProfile'>
                    <a href='/sign-in'><img src={userProfile} alt='' height='25px' /></a>
                </div> */}

                        {/* 5th element in flexbox row: shopping cart  */}

                        <div id='shoppingCart'>
                            <a href='/cart'><img src={shoppingCart} alt='Flaticon' height='28px' /></a>
                        </div>
                        {cartCount > 0 ? <span id='cartCount'>{cartCount}</span> : <span id='cartCount' style={{ color: 'white' }}>99</span>}

                    </nav>
                )}
        </>
    )
} 