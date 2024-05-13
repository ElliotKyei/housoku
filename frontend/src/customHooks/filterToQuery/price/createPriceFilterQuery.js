export default function CreatePriceFilterQuery(priceFilter) {
    if (Array.isArray(priceFilter) && priceFilter.length !== 0) {
        const priceFilterArray = priceFilter.flat()
        const minPrice = Math.min(...priceFilterArray)
        const maxPrice = Math.max(...priceFilterArray)
        const queryString = `&pmin=${minPrice}&pmax=${maxPrice}`

        return queryString
    }
}