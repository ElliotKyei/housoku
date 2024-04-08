import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import './_topNavbar.scss'
const shoppingCart = '/housoku-images/shopping-bag.png'
const userProfile = '/housoku-images/user-profile.png'

export default function TopNavbar() {

    const isAuthenticated = useSelector(state => state.user.isAuthenticated);

    return (
        <>
            {/* navbar div creates the div to hold the links (stretches across whole viewport)
            navbar is also a flexbox (row direction)  */ }

            <nav className='topNavbar'>

                {/* 1st element in flexbox row: navbar brand (Housoku)  */}

                <div id='userProfile'>
                    <a href='/sign-in'><img src={userProfile} alt='' height='25px' /></a>
                </div>


                {/* 4th element in flexbox row: searchbar  */}


                {/* 2nd element in flexbox row: list of links <- also a flexbox (row direction)  */}

                {!isAuthenticated ?


                    <div className='navbar-list' >
                        <ul >
                            {/* {isAuthenticated && <li> <span>Hello, User!</span></li>} */}
                            <li><a className='link' href='/create-account'>Create Account</a></li>
                            <li>|</li>
                            <li><a className='link' href='/sign-in'>Sign in</a></li>
                        </ul>
                    </div>

                    :

                    <div className='navbar-list' >
                        <ul>
                            <span id="welcomeMsg">Welcome, User</span>
                            <a id="logout" href='/sign-in'>Log out</a>
                        </ul>
                    </div>

                }

            </nav>

        </>
    )
} 