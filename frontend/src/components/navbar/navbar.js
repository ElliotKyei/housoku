import './_navbar.scss'
import shoppingCart from '../../images/shopping-bag.png'
import userProfile from '../../images/user-profile.png'

export default function Navbar() {
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
                        <li><a className='link' href='/apparel/browse-products'>Tops</a></li>
                        <li><a className='link' href='/apparel/browse-products'>Pants</a></li>
                        <li><a className='link' href='/apparel/browse-products'>Shoes</a></li>
                    </ul>
                </div>

                {/* 3rd element in flexbox row: searchbar  */}
                <div className='searchbar'>
                    <div className='searchQuery'>
                        <span>Search</span>
                    </div>
                </div>

                {/* 4th element in flexbox row: searchbar  */}

                <div id='userProfile'>
                    <a href='/signin'><img src={userProfile} alt='' height='25px' /></a>
                </div>

                {/* 5th element in flexbox row: shopping cart  */}

                <div id='shoppingCart'>
                    <a href=''><img src={shoppingCart} alt='Flaticon' height='30px' /></a>
                </div>
            </nav>

        </>
    )
} 