import { useState } from 'react'
import PropTypes from 'prop-types'
import './_filter.scss'

export default function Filter(props) {
    const [subcategoryFilter, setSubCategoryFilter] = useState("")
    const [priceFilter, setPriceFilter] = useState(null)

    const handlePriceFilter = (e) => {
        const { name, checked } = e.target
        setPriceFilter(prev => ({
            ...prev,
            [name]: checked
        }))
    }

    return (
        <>
            <div className='filter'>
                <div className='subcategoryFilter'>
                    {
                        props.filterSubcategories.map(subcategory => <p onClick={() => setSubCategoryFilter(prev => subcategory)}>{subcategory}</p>)

                    }
                </div>

                <hr className='filterBorder' />
                <div className='priceFilter'>
                    <h4>Price</h4>

                    <input className='priceCheckbox' type='checkbox' name="0-30" onChange={handlePriceFilter} />
                    <label className='priceCheckboxLabel'>$0 - $30</label>


                    <br />

                    <input className='priceCheckbox' type='checkbox' name="30-50" onChange={handlePriceFilter} />
                    <label className='priceCheckboxLabel'>$30 - $50</label>


                    <br />

                    <input className='priceCheckbox' type='checkbox' name="50-70+" onChange={handlePriceFilter} />
                    <label className='priceCheckboxLabel'>$50 - $70+</label>


                    <br />
                </div>

            </div>
        </>
    )
}

Filter.defaultProps = {
    filterSubcategories: ["T-Shirt", "Sweater"]
}

Filter.propTypes = {
    filterSubcategories: PropTypes.array
}