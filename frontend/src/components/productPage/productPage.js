import './_productPage.scss'
import ProductDetails from './productDetails/productDetails.js'

export default function ProductPage() {
    return (
        <>
            <div className='productPage'>
                <ProductDetails width={600} height={620} />
            </div>
        </>
    )
}