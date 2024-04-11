import { useSelector } from 'react-redux';
import './_topNavbar.scss'
import { useEffect, useState } from 'react';
const userProfile = '/housoku-images/user-profile.png'

export default function TopNavbar() {
    const [loading, setLoading] = useState(true)
    const isAuthenticated = useSelector(state => state.user.isAuthenticated);

    useEffect(() => {
        setTimeout(() => {
            setLoading(prev => false)
        }, 250)
    }, [])

    // If user is authenticated, display welcome message. If not, display sign in, create account, etc

    let renderTopNav;

    if (isAuthenticated) {
        renderTopNav = <>

            <div className='navbar-list' >
                <ul>
                    <span id="welcomeMsg">Welcome</span>
                    <li>|</li>
                    <a className='link' href='/sign-in'>Sign Out</a>
                </ul>
            </div>
        </>
    }

    else {
        renderTopNav =
            <>
                <div className='navbar-list' >
                    <ul >
                        {/* {isAuthenticated && <li> <span>Hello, User!</span></li>} */}
                        <li><a className='link' href='/create-account'>Create Account</a></li>
                        <li>|</li>
                        <li><a className='link' href='/sign-in'>Sign in</a></li>
                    </ul>
                </div>
            </>
    }

    // After loading is done (false), render the top nav bar. If not, display nothing

    return (
        <>
            <nav className='topNavbar'>

                <div id='userProfile'>
                    <a href='/sign-in'><img src={userProfile} alt='' height='25px' /></a>
                </div>
                {loading ? (<></>) : (
                    <>
                        {renderTopNav}
                    </>
                )}
            </nav>
        </>
    )
} 