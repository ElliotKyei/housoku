import { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import './_navbar.scss'
import { setBlur } from '../../reducers/blur/blurSlice';
import { dbGetShoppingCart } from '../../reducers/shoppingCart/shoppingCartSlice';
const shoppingCart = '/housoku-images/shopping-bag.png'


export default function Navbar() {
    const navbarContainerRef = useRef(null)
    const navTriggerRef = useRef(null)
    const navbarRef = useRef(null)
    const [loading, setLoading] = useState(true)
    const [isDropDownActive, setIsDropDownActive] = useState(false);
    const [prevScrollPosition, setPrevScrollPosition] = useState(window.scrollY)
    const dispatch = useDispatch();
    const cartCount = useSelector(state => state.shoppingCart.shoppingCartCount);

    useEffect(() => {
        const getShoppingCart = async () => {
            try {
                await dispatch(dbGetShoppingCart())
                setLoading(prev => false)
            }
            catch (error) {
                console.log(error.message)
            }
        }
        getShoppingCart()
    }, [cartCount])

    useEffect(() => {

        const handleNavScroll = () => {

            if (navbarRef.current && navTriggerRef.current && navbarContainerRef) {
                const currentScrollPos = window.scrollY

                // User is scrolling Up - Make navbar visible

                if (prevScrollPosition > currentScrollPos) {
                    navbarRef.current.style.display = 'flex'
                }

                // User has scrolled above navbar Trigger. Ensure the navBar is absolute and top style is removed

                if (navTriggerRef.current.getBoundingClientRect().top > 0) {
                    navbarRef.current.style.position = 'absolute'
                    navbarRef.current.style.top = ""
                }

                // User has scrolled below navbar Trigger. Ensure the navBar is fixed and at the top of webpage

                else if (navTriggerRef.current.getBoundingClientRect().top < 0) {
                    navbarRef.current.style.position = 'fixed'
                    navbarRef.current.style.top = 0

                    // Make navbar disappear only if: 1. User has scrolled below the navbar Trigger. 2. There is no drop down menu active. 3. User is scrolling down  

                    if (!isDropDownActive && prevScrollPosition < currentScrollPos) {
                        navbarRef.current.style.display = 'none'

                    }

                }
                setPrevScrollPosition(prev => currentScrollPos)
            }



        }

        window.addEventListener('scroll', handleNavScroll)

        return () => {
            window.removeEventListener('scroll', handleNavScroll)
        }

    }, [prevScrollPosition, isDropDownActive])


    const blurBackground = () => { dispatch(setBlur(true)); setIsDropDownActive(prev => true) }
    const unBlurBackground = () => { dispatch(setBlur(false)); setIsDropDownActive(prev => false) }

    return (
        <>

            {loading ? (<></>)

                :

                (

                    <>


                        <div className='navbar' ref={navbarContainerRef}>
                            <div className='navTrigger' ref={navTriggerRef}></div>

                            <nav className='nav' ref={navbarRef}>


                                {/* 1st element in flexbox row: navbar brand (Housoku)  */}

                                <div className='navbar-brand'>
                                    <a href='/'><span id='brand'>Housoku</span></a>
                                </div>

                                {/* 2nd element in flexbox row: list of links <- also a flexbox (row direction)  */}


                                <div className='navbar-list' >

                                    <ul>
                                        <li onMouseOver={blurBackground} onMouseLeave={unBlurBackground}><a className='link' id="tops" href='/apparel/browse-products/tops'>Tops</a>
                                            <div className='dropDownMenu' id='topsDropDownMenu'>
                                                <div className='dropDownColumn'>
                                                    <ul>
                                                        <li className='dropDownHeader'><a href='/apparel/browse-products/tops'>All Tops</a></li>
                                                        <li className='dropDownLink'><a href='/apparel/browse-products/tops/t-shirt'>T-Shirts</a></li>
                                                        <li className='dropDownLink'><a href='/apparel/browse-products/tops/sweater'>Sweaters</a></li>
                                                        <li className='dropDownLink'><a href='/apparel/browse-products/tops/t-shirt'>Dress Shirts</a></li>
                                                    </ul>
                                                </div>
                                                <div className='dropDownColumn'>
                                                    <ul >
                                                        <li className='dropDownHeader'>Placeholder Title</li>
                                                        <li className='dropDownLink'><a>Placeholder</a></li>
                                                        <li className='dropDownLink'><a>Placeholder</a></li>
                                                        <li className='dropDownLink'><a>Placeholder</a></li>
                                                    </ul>
                                                </div>

                                                <div className='dropDownColumn'>
                                                    <ul >
                                                        <li className='dropDownHeader'>Placeholder Title</li>
                                                        <li className='dropDownLink'><a>Placeholder</a></li>
                                                        <li className='dropDownLink'><a>Placeholder</a></li>
                                                        <li className='dropDownLink'><a>Placeholder</a></li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </li>



                                        <li onMouseOver={blurBackground} onMouseLeave={unBlurBackground}><a className='link' href='/apparel/browse-products/pants' >Pants</a>

                                            <div className='dropDownMenu' id='pantsDropDownMenu'>
                                                <div className='dropDownColumn'>
                                                    <ul >
                                                        <li className='dropDownHeader'><a href='/apparel/browse-products/pants'>Pants</a></li>
                                                        <li className='dropDownLink'><a href='/apparel/browse-products/pants/sweats'>Sweats</a></li>
                                                        <li className='dropDownLink'><a href='/apparel/browse-products/pants/jean'>Jeans</a></li>
                                                        <li className='dropDownLink'><a href='/apparel/browse-products/pants/cargo'>Cargo</a></li>
                                                    </ul>
                                                </div>
                                                <div className='dropDownColumn'>
                                                    <ul >
                                                        <li className='dropDownHeader'>Placeholder Title</li>
                                                        <li className='dropDownLink'><a>Placeholder</a></li>
                                                        <li className='dropDownLink'><a>Placeholder</a></li>
                                                        <li className='dropDownLink'><a>Placeholder</a></li>
                                                    </ul>
                                                </div>

                                                <div className='dropDownColumn'>
                                                    <ul >
                                                        <li className='dropDownHeader'>Placeholder Title</li>
                                                        <li className='dropDownLink'><a>Placeholder</a></li>
                                                        <li className='dropDownLink'><a>Placeholder</a></li>
                                                        <li className='dropDownLink'><a>Placeholder</a></li>
                                                    </ul>
                                                </div>
                                            </div>

                                        </li>


                                        <li onMouseOver={blurBackground} onMouseLeave={unBlurBackground}><a className='link' href='/apparel/browse-products/shoes' >Shoes</a>

                                            <div className='dropDownMenu' id='shoesDropDownMenu'>
                                                <div className='dropDownColumn'>
                                                    <ul >
                                                        <li className='dropDownHeader'><a href='/apparel/browse-products/shoes'>Shoes</a></li>
                                                        <li className='dropDownLink'><a href='/apparel/browse-products/shoes/sneaker'>Sneakers</a></li>
                                                        <li className='dropDownLink'><a href='/apparel/browse-products/shoes/combat-boots'>Combat Boots</a></li>
                                                    </ul>
                                                </div>
                                                <div className='dropDownColumn'>
                                                    <ul >
                                                        <li className='dropDownHeader'>Placeholder Title</li>
                                                        <li className='dropDownLink'><a>Placeholder</a></li>
                                                        <li className='dropDownLink'><a>Placeholder</a></li>
                                                        <li className='dropDownLink'><a>Placeholder</a></li>
                                                    </ul>
                                                </div>

                                                <div className='dropDownColumn'>
                                                    <ul >
                                                        <li className='dropDownHeader'>Placeholder Title</li>
                                                        <li className='dropDownLink'><a>Placeholder</a></li>
                                                        <li className='dropDownLink'><a>Placeholder</a></li>
                                                        <li className='dropDownLink'><a>Placeholder</a></li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </li>




                                        <li onMouseOver={blurBackground} onMouseLeave={unBlurBackground}><a className='link' href='/apparel/browse-products/shoes' >Accessories</a>

                                            <div className='dropDownMenu' id='accessoriesDropDownMenu' >
                                                <div className='dropDownColumn'>
                                                    <ul >
                                                        <li className='dropDownHeader'><a>Accessories</a></li>
                                                        <li className='dropDownLink'><a>Placeholder</a></li>
                                                        <li className='dropDownLink'><a>Placeholder</a></li>
                                                    </ul>
                                                </div>
                                                <div className='dropDownColumn'>
                                                    <ul >
                                                        <li className='dropDownHeader'>Placeholder Title</li>
                                                        <li className='dropDownLink'><a>Placeholder</a></li>
                                                        <li className='dropDownLink'><a>Placeholder</a></li>
                                                        <li className='dropDownLink'><a>Placeholder</a></li>
                                                    </ul>
                                                </div>

                                                <div className='dropDownColumn'>
                                                    <ul >
                                                        <li className='dropDownHeader'>Placeholder Title</li>
                                                        <li className='dropDownLink'><a>Placeholder</a></li>
                                                        <li className='dropDownLink'><a>Placeholder</a></li>
                                                        <li className='dropDownLink'><a>Placeholder</a></li>
                                                    </ul>
                                                </div>
                                            </div>

                                        </li>
                                    </ul>
                                </div>

                                {/* 3rd element in flexbox row: searchbar  */}
                                <div className='searchbar'>
                                    <div className='searchQuery'>
                                        <span>Search</span>
                                    </div>
                                </div>

                                {/* 5th element in flexbox row: shopping cart  */}

                                <div id='shoppingCart'>
                                    <a href='/cart'><img src={shoppingCart} alt='Flaticon' height='26px' />
                                        {cartCount > 0 && !loading ? <span id='cartCount'>{cartCount}</span> : <span id='cartCount' style={{ color: 'white' }}>99</span>}
                                    </a>
                                </div>

                            </nav>


                            <div className='prespacer'></div>

                        </div>
                    </>
                )}
        </>
    )
} 