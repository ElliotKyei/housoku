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
        price: [],
        queryString: ""
    })
    const [colorFilter, setColorFilter] = useState({
        allFilters: ["black", "blue", "red", "grey", "white"],
        color: [],
        queryString: ""
    })
    const [sizeFilter, setSizeFilter] = useState({
        allFilters: ["s", "m", "l"],
        size: [],
        queryString: ""
    })

    let currentCategory = props.filterCategory.toLowerCase()

    useEffect(() => {
        let searchParams = new URLSearchParams(location.search)

        if (activeFiltersCount === 0) {
            setQueryParams(null)
            return
        }

        setQueryParams(prev => searchParams.toString())
    }, [location.search, activeFiltersCount])


    useEffect(() => {

        let searchParams = new URLSearchParams(location.search)
        let activeFiltersCount = 0;
        for (const activeFilter of activeFilters) {

            if (activeFilter === "price") {
                searchParams.delete('pmin')
                searchParams.delete('pmax')
                if (priceFilter.price.length !== 0) {
                    const pmin = Math.min(...priceFilter.price.flat())
                    const pmax = Math.max(...priceFilter.price.flat())
                    searchParams.append('pmin', pmin)
                    searchParams.append('pmax', pmax)
                }
                else {
                    setPriceFilter(prev => ({ ...prev, queryString: "" }))
                    let activeFilterInd = activeFilters.findIndex((f) => JSON.stringify(f) === "price")
                    let activeFilterTmp = [...activeFilters]
                    activeFilterTmp.splice(activeFilterInd, 1)
                    setActiveFilters(prev => [...activeFilterTmp])
                }
            }

            if (activeFilter === "color") {

                searchParams.delete("filterByColor")
                if (colorFilter.color.length !== 0) {
                    for (const c of colorFilter.color) {
                        searchParams.append('filterByColor', c)
                    }
                }

                else {
                    setColorFilter(prev => ({ ...prev, queryString: "" }))
                    let activeFilterInd = activeFilters.findIndex((f) => JSON.stringify(f) === "color")
                    let activeFilterTmp = [...activeFilters]
                    activeFilterTmp.splice(activeFilterInd, 1)
                    setActiveFilters(prev => [...activeFilterTmp])
                }
            }

            if (activeFilter === "size") {

                searchParams.delete("filterBySize")
                if (sizeFilter.size.length !== 0) {
                    for (const s of sizeFilter.size) {
                        searchParams.append('filterBySize', s)
                    }
                }

                else {
                    setSizeFilter(prev => ({ ...prev, queryString: "" }))
                    let activeFilterInd = activeFilters.findIndex((f) => JSON.stringify(f) === "size")
                    let activeFilterTmp = [...activeFilters]
                    activeFilterTmp.splice(activeFilterInd, 1)
                    setActiveFilters(prev => [...activeFilterTmp])
                }
            }

            activeFiltersCount++
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
                        props.filterSubcategories.map((s, ind) => (<p onClick={() => { setSubCategoryFilter(prev => s); navigate({ pathname: `/apparel/browse-products/${currentCategory}/${s.toLowerCase()}`, search: location.search }) }} key={ind}>{s}</p >))
                    }
                </div>

                <hr className='filterBorder' />

                <FilterContainer heading='Shop By Price' filterType='price' filterOptions={priceFilter.allFilters}
                    addFilter={(filter) => {
                        setPriceFilter(prev => ({ ...prev, price: [...(new Set([...prev.price, filter]))] }))

                        if (!activeFilters.includes("price"))
                            setActiveFilters(prev => [...activeFilters, "price"])
                    }
                    }

                    removeFilter={(filter) => {
                        let filterInd = priceFilter.price.findIndex((f) => JSON.stringify(f) === JSON.stringify(filter))

                        if (filterInd === -1) return

                        let priceFilterTmp = [...priceFilter.price]
                        priceFilterTmp.splice(filterInd, 1)
                        setPriceFilter(prev => ({ ...prev, price: priceFilterTmp }))
                    }}
                />

                <hr className='filterBorder' />

                <FilterContainer heading='Color' filterType='color' filterOptions={colorFilter.allFilters}

                    addFilter={(filter) => {

                        setColorFilter(prev => ({ ...prev, color: [...(new Set([...prev.color, filter.toLowerCase()]))] }))

                        if (!activeFilters.includes("color"))
                            setActiveFilters(prev => [...activeFilters, "color"])
                    }
                    }

                    removeFilter={(filter) => {

                        let filterInd = colorFilter.color.findIndex((f) => { console.log("filer /type is ", filter, typeof filter, " f is ", f, typeof f); return f === filter })

                        if (filterInd === -1) return

                        let colorFilterTmp = [...colorFilter.color]
                        colorFilterTmp.splice(filterInd, 1)
                        setColorFilter(prev => ({ ...prev, color: colorFilterTmp }))
                    }}
                />

                <hr className='filterBorder' />


                <FilterContainer heading='Size' filterType='size' filterOptions={sizeFilter.allFilters}
                    addFilter={(filter) => {

                        setSizeFilter(prev => ({ ...prev, size: [...(new Set([...prev.size, filter.toLowerCase()]))] }))

                        if (!activeFilters.includes("size"))
                            setActiveFilters(prev => [...activeFilters, "size"])
                    }
                    }

                    removeFilter={(filter) => {
                        let filterInd = sizeFilter.size.findIndex((f) => JSON.stringify(f) === JSON.stringify(filter))

                        if (filterInd === -1) return

                        let sizeFilterTmp = [...sizeFilter.size]
                        sizeFilterTmp.splice(filterInd, 1)
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