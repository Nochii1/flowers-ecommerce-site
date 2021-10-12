/**
 * Show loading animation
 * @param {Boolean} productsHidden Specified if the product and aside container should be hidden
 */
export const showLoading = (productsHidden = false) => {
    if(productsHidden){
        document.getElementById('aside-container').classList.add('hidden')
        document.getElementById('products-container').classList.add('hidden')
    } 
    document.getElementById('loading').classList.remove('hidden')
}

/**
 * Hidden loading animation
 * @param {Boolean} productsHidden Specified if the product and aside container should be hidden
 */
export const hideLoading = (productsHidden = false) => {
    if(productsHidden){
        document.getElementById('aside-container').classList.remove('hidden')
    }
    document.getElementById('loading').classList.add('hidden')
}