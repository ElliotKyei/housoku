import './_productPage.scss'
import Product from './product/product.js'

export default function ProductPage() {
    return (
        <>
            <div className='productPage'>
                <Product width={600} height={620} />
            </div>
        </>
    )
}