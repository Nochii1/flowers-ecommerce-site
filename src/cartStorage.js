/**
 * Get from localStorage the products cart list
 * @returns Products cart list
 */
export const getCartProducts = () => {
    const cartProducts = localStorage.getItem('cartProducts')
        ? JSON.parse(localStorage.getItem('cartProducts'))
        : [];

    return cartProducts;
};

/**
 * Set a new products cart list
 * @param {Products[]} cartProducts New products cart list 
 */
export const setCartProducts = (cartProducts) => {
    localStorage.setItem('cartProducts', JSON.stringify(cartProducts))
}

/**
 * Get a product cart list quantity
 * @returns Products cart list quantity
 */
export const getCartProductsQuantity = () => {
    const quantity = localStorage.getItem('cartProducts')
        ? JSON.parse(localStorage.getItem('cartProducts')).length
        : 0
        
    return quantity
}

/**
 * Clean products cart list
 */
export const cleanCart = () => {
    localStorage.removeItem('cartProducts')
}