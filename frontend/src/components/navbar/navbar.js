import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import './_navbar.scss'
const shoppingCart = '/housoku-images/shopping-bag.png'
const userProfile = '/housoku-images/user-profile.png'

export default function Navbar() {
    /*     const [isAuthenticated, setIsAuthenticated] = useState(false)
        const authStatus = useSelector(state => state.user.isAuthenticated);
    
        useEffect(() => {
            setIsAuthenticated(authStatus);
        }, [authStatus]); */

    const isAuthenticated = useSelector(state => state.user.isAuthenticated);

    return (
        <>

            {/* navbar div creates the div to hold the links (stretches across whole viewport)
            navbar is also a flexbox (row direction)  */ }

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
            </nav>

        </>
    )
} 