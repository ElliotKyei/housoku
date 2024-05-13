export default function CreateColorFilterQuery(colorFilter) {
    if (Array.isArray(colorFilter) && colorFilter.length !== 0) {

        let queryString = ""
        colorFilter.forEach(c => queryString += `&filterByColor=${c}`)

        return queryString
    }
}