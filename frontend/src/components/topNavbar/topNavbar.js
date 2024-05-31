import './_topNavbar.scss'
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { signOut } from '../../reducers/user/userSlice';
const userProfile = '/housoku-images/user-profile.png'

export default function TopNavbar() {
    const [loading, setLoading] = useState(true)
    const isAuthenticated = useSelector(state => state.user.isAuthenticated);
    const dispatch = useDispatch()

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
                    <li style={{ marginLeft: '1em' }}>|</li>
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
                        <li style={{ marginLeft: '1em' }}>|</li>
                        <li><a className='link' href='/sign-in'>Sign in</a></li>
                    </ul>
                </div>
            </>
    }

    // After loading is done (false), render the top nav bar. If not, display nothing

    return (
        <>
            <nav className='topNavbar'>

                <div id='logo'>
                    <a href='/'><img src={userProfile} alt='brandLogo' height='25px' /></a>
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