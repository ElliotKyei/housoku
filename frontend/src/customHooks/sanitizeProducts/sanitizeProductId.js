export default function sanitizedProductId(id) {
    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

    if (id.trim().length !== 36) {
        return false;
    }

    else if (!uuidRegex.test(id)) {
        return false
    }

    return true
}