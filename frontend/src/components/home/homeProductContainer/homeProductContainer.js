import './_homeProductContainer.scss'
import { useEffect, useRef, useState } from "react"
import Product from './homeProduct/homeProduct.js';
import PropTypes from 'prop-types'

export default function HomeProductContainer(props) {
    const { products, title } = props
    const [currentSnapPoint, setCurrentSnapPoint] = useState(0);
    const [userInnerWidth, setUserInnerWidth] = useState(0);
    const [isScrollAtStart, setIsScrollAtStart] = useState(true);
    const [isScrollAtEnd, setIsScrollAtEnd] = useState(false);
    const sliderRef = useRef(null);
    const rightScrollButtonRef = useRef(null);
    const leftScrollButtonRef = useRef(null);
    let productCount = 0;

    useEffect(() => {

        if (!sliderRef.current || !leftScrollButtonRef.current || !rightScrollButtonRef.current) {
            return;
        }

        const watchWindowInnerWidth = () => setUserInnerWidth(prev => window.innerWidth)


        const handleScrollDisable = () => {

            setCurrentSnapPoint(prev => sliderRef.current.scrollLeft)

            if (sliderRef.current.scrollLeft === 0) {
                leftScrollButtonRef.current.className = "scrollButtonDisabled"
                setIsScrollAtStart(prev => true)
            }
            else {
                leftScrollButtonRef.current.className = "leftScrollButton"
                setIsScrollAtStart(prev => false)
            }

            if (sliderRef.current.scrollLeft >= (sliderRef.current.scrollWidth - sliderRef.current.clientWidth)) {
                rightScrollButtonRef.current.className = "scrollButtonDisabled"
                setIsScrollAtEnd(prev => true)
            }
            else {
                rightScrollButtonRef.current.className = "rightScrollButton"
                setIsScrollAtEnd(prev => false)
            }
        }
        handleScrollDisable()

        sliderRef.current.addEventListener('scroll', handleScrollDisable);
        window.addEventListener('resize', watchWindowInnerWidth)

        return () => {
            sliderRef.current.removeEventListener('scroll', handleScrollDisable);
            window.removeEventListener('resize', watchWindowInnerWidth)
        };

    }, [sliderRef.current, leftScrollButtonRef.current, rightScrollButtonRef.current, isScrollAtStart, isScrollAtEnd, products])

    const scrollLeft = () => {
        if (!sliderRef.current)
            return;

        if (!isScrollAtStart) {
            rightScrollButtonRef.current.className = "leftScrollButton"
            sliderRef.current.scrollLeft -= 500
        }
    }

    const scrollRight = () => {
        if (!sliderRef.current)
            return;

        if (!isScrollAtEnd) {
            rightScrollButtonRef.current.className = "rightScrollButton"
            sliderRef.current.scrollLeft += 500
        }
    }



    let productList = null;

    return (
        <>
            <div className='homeProductContainer'>

                <div className='featured' id='2259605a-551f-4d56-a56d-c967661b379e'>
                    <div className='headerLayer'>

                        <div className='title'>
                            <h4 >{title}</h4>
                        </div>

                        <div className='scrollProducts'>
                            <div className='title'>
                                <p>Discover All</p>
                            </div>

                            <button className='scrollButtonDisabled' ref={leftScrollButtonRef} onClick={scrollLeft} disabled={isScrollAtStart}>
                                <div className='icon'>
                                    <svg focusable="false" viewBox="0 0 24 24" role="img" width="24px" height="24px" fill="none" >
                                        <path stroke={isScrollAtStart ? 'rgb(179, 179, 179)' : 'black'} stroke-width="1.5" d="M15.525 18.966L8.558 12l6.967-6.967"> </path>
                                    </svg>
                                </div>
                            </button>


                            <button className='rightScrollButton' ref={rightScrollButtonRef} onClick={scrollRight} disabled={isScrollAtEnd}>
                                <div className='icon'>
                                    <svg focusable="false" viewBox="0 0 24 24" role="img" width="24px" height="24px" fill="none">
                                        <path stroke={isScrollAtEnd ? 'rgb(179, 179, 179)' : 'black'} stroke-width="1.5" d="M8.474 18.966L15.44 12 8.474 5.033"> </path>
                                    </svg>
                                </div>
                            </button>
                        </div>

                    </div>

                    <section >
                        <ul className="productContainerRow" ref={sliderRef}>
                            {products === null

                                ?

                                (
                                    <>
                                        <li className='item'><Product width={460} height={460} /></li>
                                        <li className='item'><Product width={460} height={460} /></li>
                                        <li className='item'><Product width={460} height={460} /></li>

                                    </>
                                )

                                :

                                (
                                    productList = products.map(p => {
                                        productCount++
                                        return <li className='item'><Product product={p} width={460} height={460} key={p.product_id} /></li>
                                    })

                                )

                            }
                        </ul>
                    </section>

                </div>
            </div>
        </>
    )
}

HomeProductContainer.defaultProps = {
    products: null,
    height: 460,
    width: 460,
    title: "Latest Products"
}

HomeProductContainer.propTypes = {
    products: PropTypes.arrayOf(PropTypes.shape({
        product_id: PropTypes.string,
        product_name: PropTypes.string,
        price: PropTypes.number,
        image_url: PropTypes.string,
        category_name: PropTypes.string
    })),
    height: PropTypes.number,
    width: PropTypes.number,
    title: PropTypes.string
}

