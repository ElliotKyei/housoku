import './_filterContainer.scss'
import { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { useLocation, useNavigate } from 'react-router-dom';
import { slice } from 'lodash';


export default function FilterContainer(props) {

    const location = useLocation();
    const [toggleFilter, setToggleFilter] = useState(false)
    const [filterOptionSelected, setFilterOptionsSelected] = useState(() => {
        let filters = {}
        props.filterOptions.map((f, ind) => filters[f] = { id: ind, isChecked: false })
        return filters
    })

    const handleFilterOption = (e = null, f, ind) => {


        if (filterOptionSelected) {
            if (!filterOptionSelected[f].isChecked) {
                setFilterOptionsSelected(prev => ({ ...prev, [f]: { id: ind, isChecked: true } }));
                props.addFilter(f)
            }

            if (filterOptionSelected[f].isChecked && e !== null) {
                setFilterOptionsSelected(prev => ({ ...prev, [f]: { id: ind, isChecked: false } }));
                props.removeFilter(f)
            }
        }
    }

    useEffect(() => {
        const selectValidQueryParams = () => {

            let priceFilterTmp = []
            let colorFilterTmp = []
            let sizeFilterTmp = []

            const currentQueryParams = new URLSearchParams(location.search)

            for (const [key, values] of currentQueryParams.entries()) {
                switch (key) {
                    case "pmin":
                        priceFilterTmp.push(Number(values))
                        break

                    case "pmax":
                        priceFilterTmp.push(Number(values))
                        break;

                    case "filterByColor":
                        colorFilterTmp.push(values.toLowerCase())
                        break;
                    case "filterBySize":
                        sizeFilterTmp.push(values.toLowerCase())
                        break;

                    default:
                        break
                }
            }

            if (props.filterType === "price") {
                for (const [priceFilterInd, priceFilterValues] of props.filterOptions.entries()) {
                    if (priceFilterValues[0] >= priceFilterTmp[0] && priceFilterValues[1] <= priceFilterTmp[1]) {
                        handleFilterOption(null, priceFilterValues, priceFilterInd)
                    }

                }

            }

            if (props.filterType === "color") {
                for (const color of colorFilterTmp) {
                    if (props.filterOptions.includes(color)) {
                        const colorInd = props.filterOptions.findIndex(f => f === color)
                        if (colorInd !== -1)
                            handleFilterOption(null, color, colorInd)
                    }
                }
            }

            if (props.filterType === "size") {
                for (const size of sizeFilterTmp) {
                    if (props.filterOptions.includes(size)) {
                        const sizeInd = props.filterOptions.findIndex(f => f === size)
                        if (sizeInd !== -1)
                            handleFilterOption(null, size, sizeInd)
                    }
                }
            }
        }

        selectValidQueryParams()
    }, [location.search])


    return (
        <div className='filterContainer' >


            <div className='toggleFilter' onClick={() => toggleFilter ? setToggleFilter(prev => false) : setToggleFilter(prev => true)}>
                <div className='filterHeading'><h4>{props.heading}</h4></div>
                <div className='toggleFilterImg'>
                    {toggleFilter ? <img src='http://localhost:8080/housoku-images/icons/up-arrow.png' alt="down arrow by th studio (flaticon)" style={{ height: '20px', width: '20px' }} />
                        : <img src='http://localhost:8080/housoku-images/icons/down-arrow.png' alt="down arrow by th studio (flaticon)" style={{ height: '20px', width: '20px' }} />}
                </div>


            </div>

            {toggleFilter && (
                <div className='filterOptionsContainer'>
                    {props.filterOptions.map((f, ind) => {
                        return (
                            <>
                                <button className='filterOptions' key={ind} onClick={(e) => handleFilterOption(e, f, ind)}  >
                                    <div className={filterOptionSelected && filterOptionSelected[f].isChecked ? 'filterCheckbox isChecked' : 'filterCheckbox'} ></div>
                                    {props.filterType === "price" && <span className='filterCheckboxLabel'>${f[0]} - ${f[1]}</span>}
                                    {props.filterType === "color" && <span className='filterCheckboxLabel'>{f[0].toUpperCase() + f.slice(1)}</span>}
                                    {props.filterType === "size" && <span className='filterCheckboxLabel'>{f.toUpperCase()}</span>}

                                </button >

                            </>
                        )
                    })}
                </div>
            )

            }
        </div >
    )
}

FilterContainer.defaultProps = {
    heading: 'Price',
    filterOptions: [[0, 30], [30, 50], [50, 70]],
    filterType: "price"
}

FilterContainer.propTypes = {
    heading: PropTypes.string,
    filterOptions: PropTypes.array,
    filterType: PropTypes.string,
}