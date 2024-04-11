import './_footer.scss'
const facebookIcon = '/housoku-images/facebook.png'
const linkedinIcon = '/housoku-images/linkedin.png'
const youtubeIcon = '/housoku-images/youtube.png'
const instagramIcon = '/housoku-images/instagram.png'

export default function Footer() {
    return (
        <>

            {/* footer div that stretches across bottom of viewport  */}

            <footer>
                <hr className='footerBorder' />

                {/* footerContainer is a flexbox (row direction)  */}

                <div className='footerContainer'>

                    {/* 1st element in flexbox row is the brand name (Housoku)  */}

                    <div className="brandName">
                        <span>Housoku</span>
                    </div>

                    {/* 2nd element in flexbox row are the footer linkks
                        (footerLinks div is also another row flexbox) */}

                    <div className='footerLinks'>
                        <div className="column">
                            <ul>
                                <li><a href=''><h4>Tops</h4></a></li>
                                <li><a href=''>T-Shirts</a></li>
                                <li><a href=''>Sweaters</a></li>
                            </ul>
                        </div>
                        <div className="column">
                            <ul>
                                <li><a href=''><h4>Pants</h4></a></li>
                                <li><a href=''>Sweats</a></li>
                                <li><a href=''>Jeans</a></li>
                                <li><a href=''>Cargo</a></li>
                            </ul>
                        </div>
                        <div className="column">
                            <ul>
                                <li><a href=''><h4>Shoes</h4></a></li>
                                <li><a href=''>Sneakers</a></li>
                                <li><a href=''>Combat Boots</a></li>
                            </ul>
                        </div>
                    </div>


                    {/* Social media links (Not in any flexbox) */}

                    <div className="socialMedia">
                        <ul>
                            <li><a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer"><img src={facebookIcon} alt="facebook icon @riajulislam" /></a></li>
                            <li><a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer"><img src={linkedinIcon} alt="facebook icon @riajulislam" /></a></li>
                            <li><a href="https://www.youtube.com" target="_blank" rel="noopener noreferrer"><img src={youtubeIcon} alt="facebook icon @riajulislam" /></a></li>
                            <li><a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer"><img src={instagramIcon} alt="facebook icon @riajulislam" /></a></li>
                        </ul>

                    </div>

                </div>
            </footer>
        </>
    );
}