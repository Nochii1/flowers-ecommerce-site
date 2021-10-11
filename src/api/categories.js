import { apiUrl } from './config'

/**
 * Get all categories from the Flowers Ecommerce API
 * @returns Categories list and metadata
 */
export const getCategories = async () => {
    try {
        const response = await fetch(`${apiUrl}/categories`)
        const data = await response.json()

        if (data.error) {
            throw new Error(data.message)
        }
        return data
    } catch (err) {
        console.error(err.message)
        return { error: err.data.message || err.message }
    }
}