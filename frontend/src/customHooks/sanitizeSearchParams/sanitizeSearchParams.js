export default function sanitizeSearchParams(searchParams) {
    for (const [key, val] of searchParams.entries()) {
        if (val.length >= 80) {
            searchParams.delete(key, val)
        }
    }

}