import { getCartProductsQuantity } from '../cartStorage'

/**
 * Red circle on cart icon its show the products quantity
 */
const CartProductsCounter = {
    render: () => {
        const quantity = getCartProductsQuantity()
        return `
            <span id="counter" class="absolute inset-0 object-right-top -mr-6">
                <div class="inline-flex items-center px-1.5 py-0.5 border-2 border-white rounded-full text-xs font-semibold leading-4 bg-red-500 text-white">
                    ${quantity}
                </div>
            </span>
        `
    },
    rerender: () => {
        document
            .getElementById('counter').outerHTML = CartProductsCounter.render()
    },
}

export default CartProductsCounter