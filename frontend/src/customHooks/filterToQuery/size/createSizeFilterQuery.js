export default function CreateSizeFilterQuery(sizeFilter) {
    if (Array.isArray(sizeFilter) && sizeFilter.length !== 0) {

        let queryString = ""
        sizeFilter.forEach(s => queryString += `&filterBySize=${s}`)

        return queryString
    }
}