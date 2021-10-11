import { apiUrl } from './config'

/**
 * Get all products from the Flowers Ecommerce AP
 * @param {String} search Search param filter
 * @param {String} orderPrice Order products ASC or DESC
 * @param {Number} category Category id
 * @param {Number} page Page number
 * @param {String} filters Filter param
 * @returns Products list and metadata
 */
export const getProducts = async ({ 
    search = null, 
    orderPrice = null, 
    category = null,
    page = null,
    filters = null,
}) => {
    try {
        let queryString = '?';
        queryString += search ? `search=${search}&` : ''
        queryString += orderPrice ? `orderPrice=${orderPrice}&` : ''
        queryString += category ? `category=${category}&` : ''
        queryString += page ? `page=${page}&` : ''
        queryString += filters ? `filters=${filters}&` : ''

        const response = await fetch(`${apiUrl}/products${queryString}`)
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