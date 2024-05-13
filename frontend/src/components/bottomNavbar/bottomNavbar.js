import './_bottomNavbar.scss'
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
const userProfile = '/housoku-images/user-profile.png'

export default function BottomNavbar() {
    const [loading, setLoading] = useState(true)
    const isAuthenticated = useSelector(state => state.user.isAuthenticated);

    useEffect(() => {
        setTimeout(() => {
            setLoading(prev => false)
        }, 250)
    }, [])

    // If user is authenticated, display welcome message. If not, display sign in, create account, etc


    // After loading is done (false), render the top nav bar. If not, display nothing

    return (
        <>
            <nav className='bottomNavbar'>
                <div className='announcementContainer'>
                    <p className='announcement'>New Products Coming In May 1st, 2024</p>
                </div>
            </nav>
        </>
    )
} 