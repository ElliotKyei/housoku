import { useEffect, useState } from 'react'
import axios from 'axios'
import PropTypes from 'prop-types'
import './_filter.scss'
import FilterContainer from './filterContainer.js'
import CreatePriceFilterQuery from '../../../customHooks/filterToQuery/price/createPriceFilterQuery.js'
import CreateColorFilterQuery from '../../../customHooks/filterToQuery/color/createColorFilterQuery.js'
import CreateSizeFilterQuery from '../../../customHooks/filterToQuery/size/createSizeFilterQuery.js'
import _ from 'lodash';
import { useLocation, useNavigate } from 'react-router-dom';

export default function Filter(props) {
    const location = useLocation();
    const navigate = useNavigate();
    const [queryParams, setQueryParams] = useState(() => location.search.toString())
    const [activeFilters, setActiveFilters] = useState([])
    const [activeFiltersCount, setActiveFiltersCount] = useState(0)
    const [subcategoryFilter, setSubCategoryFilter] = useState([])
    const [priceFilter, setPriceFilter] = useState({
        allFilters: [[0, 30], [30, 50], [50, 70]],
        price: []
    })
    const [colorFilter, setColorFilter] = useState({
        allFilters: ["black", "blue", "red", "grey", "white"],
        color: []
    })
    const [sizeFilter, setSizeFilter] = useState({
        allFilters: ["s", "m", "l"],
        size: []
    })

    let currentCategory = props.filterCategory.toLowerCase()
    const ignoreSubcategoryHyphen = [
        "t-shirt"
    ]
    let subcategoryList = props.filterSubcategories.map(sc => {
        if (ignoreSubcategoryHyphen.includes(sc.toLowerCase())) {
            return sc
        }
        else {
            return sc.replace('-', ' ')
        }

    })


    useEffect(() => {
        let searchParams = new URLSearchParams(location.search)

        if (activeFiltersCount === 0) {
            setQueryParams(null)
            return
        }

        setQueryParams(prev => searchParams.toString())
    }, [location.search, activeFiltersCount])


    useEffect(() => {

        let searchParams = new URLSearchParams()
        let activeFiltersCount = 0;

        for (const activeFilter of activeFilters) {
            if (activeFilter === "price") {

                if (priceFilter.price.length !== 0) {
                    const pmin = Math.min(...priceFilter.price.flat())
                    const pmax = Math.max(...priceFilter.price.flat())
                    searchParams.append('pmin', pmin)
                    searchParams.append('pmax', pmax)
                    activeFiltersCount++
                }
                else {
                    let activeFilterTmp = activeFilters.filter(f => f !== "price")
                    setActiveFilters(prev => activeFilterTmp)
                }
            }

            if (activeFilter === "color") {
                if (colorFilter.color.length !== 0) {
                    for (const c of colorFilter.color) {
                        searchParams.append('filterByColor', c)
                    }
                    activeFiltersCount++
                }

                else {
                    let activeFilterTmp = activeFilters.filter(f => f !== "color")
                    setActiveFilters(prev => activeFilterTmp)
                }
            }

            if (activeFilter === "size") {

                if (sizeFilter.size.length !== 0) {
                    for (const s of sizeFilter.size) {
                        searchParams.append('filterBySize', s)
                    }
                    activeFiltersCount++
                }
                else {
                    let activeFilterTmp = activeFilters.filter(f => f !== "size")
                    setActiveFilters(prev => activeFilterTmp)
                }
            }
        }

        setActiveFiltersCount(activeFiltersCount)
        navigate({
            search: searchParams.toString()
        })

    }, [priceFilter, colorFilter, sizeFilter])

    return (
        <>
            <div className='filter'>
                <div className='subcategoryFilter'>
                    {
                        props.filterSubcategories.map((s, ind) => (<p onClick={() => { setSubCategoryFilter(prev => s); navigate({ pathname: `/apparel/browse-products/${currentCategory}/${s.toLowerCase()}`, search: location.search }) }} key={ind}>

                            {ignoreSubcategoryHyphen.includes(s.toLowerCase()) ? s : s.replaceAll('-', ' ')}

                        </p >))
                    }
                </div>

                <hr className='filterBorder' />

                <FilterContainer heading='Price' filterType='price' filterOptions={priceFilter.allFilters}
                    addFilter={(filter) => {
                        setPriceFilter(prev => ({ ...prev, price: [...(new Set([...prev.price, filter]))] }))

                        if (!activeFilters.includes("price"))
                            setActiveFilters(prev => [...(new Set([...prev, "price"]))])
                    }}

                    removeFilter={(filter) => {

                        let priceFilterTmp = priceFilter.price.filter(f => JSON.stringify(f) !== JSON.stringify(filter))
                        setPriceFilter(prev => ({ ...prev, price: priceFilterTmp }))
                    }}
                />

                <hr className='filterBorder' />

                <FilterContainer heading='Color' filterType='color' filterOptions={colorFilter.allFilters}

                    addFilter={(filter) => {

                        setColorFilter(prev => ({ ...prev, color: [...(new Set([...prev.color, filter.toLowerCase()]))] }))

                        if (!activeFilters.includes("color"))
                            setActiveFilters(prev => [...(new Set([...prev, "color"]))])
                    }
                    }

                    removeFilter={(filter) => {
                        let colorFilterTmp = colorFilter.color.filter(f => JSON.stringify(f) !== JSON.stringify(filter))
                        setColorFilter(prev => ({ ...prev, color: colorFilterTmp }))
                    }}
                />

                <hr className='filterBorder' />


                <FilterContainer heading='Size' filterType='size' filterOptions={sizeFilter.allFilters}
                    addFilter={(filter) => {

                        setSizeFilter(prev => ({ ...prev, size: [...(new Set([...prev.size, filter.toLowerCase()]))] }))

                        if (!activeFilters.includes("size"))
                            setActiveFilters(prev => [...(new Set([...prev, "size"]))])
                    }
                    }

                    removeFilter={(filter) => {

                        let sizeFilterTmp = sizeFilter.size.filter(f => JSON.stringify(f) !== JSON.stringify(filter))
                        setSizeFilter(prev => ({ ...prev, size: sizeFilterTmp }))
                    }}
                />

                <hr className='filterBorder' />


            </div>
        </>
    )
}

Filter.defaultProps = {
    filterCategory: 'Tops',
    filterSubcategories: ["T-Shirt", "Sweater", "Placeholder", "Placeholder", "Placeholder", "Placeholder", "Placeholder"]
}

Filter.propTypes = {
    filterCategory: PropTypes.string,
    filterSubcategories: PropTypes.arrayOf(PropTypes.shape({ subcategory: PropTypes.string }))
}