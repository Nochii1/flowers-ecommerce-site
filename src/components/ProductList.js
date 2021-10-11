import { getProducts } from '../api/products'
import Pagination from './Pagination'
import ProductCard from './ProductCard'
import CartProductsCounter from './CartProductsCounter'
import { getRequestUrl } from '../utils/request-url'
import { getCartProducts, setCartProducts } from '../cartStorage'
import { showLoading, hideLoading } from '../utils/loading'

/**
 * Contains products list cards
 */
const ProductList = {
    render: async () => {
        const urlParams = getRequestUrl()
        const {items,meta, links} = await getProducts(urlParams)
        const {totalPages,currentPage} = meta
        return `
            <div id="products-container">
                ${
                    items.length > 0 ? `
                        <ul class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 grid-rows-auto gap-4 mt-3">
                            ${items.map( (product) => `
                                ${ProductCard.render(product)}
                            `).join('\n')}
                        </ul>`
                    : `<span>Products not found.</span>`
                }
                
                ${items.length > 0 ? Pagination.render({ totalPages, currentPage, links }) : ''}
            </div>
            `
    },
    after_render: async () => {
        /** Add event listener to the pagination numbers elements and when execute change or add page url param */
        document
            .getElementById('pagination-numbers')
            .addEventListener('click', async (e) => {
                e.preventDefault()
                const pageNumber = e.target.id != "next" && e.target.id != "previous" ? e?.target?.innerText : e.target.dataset.page
                if(parseInt(pageNumber) != 0){
                    const currentUrlHash = document.location.search
                    const searchRegex = /page=[^&]+/i
                    showLoading(true)
                    if(searchRegex.test(currentUrlHash)){
                        history.replaceState({}, "", currentUrlHash.replace(searchRegex,`page=${pageNumber}`))
                    }else{
                        history.pushState({}, "", currentUrlHash != '' ? `${currentUrlHash}&page=${pageNumber}` :  `/?page=${pageNumber}`)
                    }
                    await ProductList.rerender()
                    window.scrollTo(0, 0)
                    hideLoading(true)
                }
            })
        
        /** Add event listener to the add product cart icon and when running add product to the cart */
        document.querySelectorAll('.add-cart').forEach(icon => {
            icon.addEventListener('click', e => {
                showLoading(true)
                e.preventDefault()
                const dataset = icon?.dataset
                const product = {
                    ...dataset
                }
                let cartProducts = getCartProducts()
                const existProduct = cartProducts.find((item) => item === product)
                if (existProduct) {
                    cartProducts = cartProducts.map((item) =>
                        item === existProduct ? item : product
                    )
                } else {
                    cartProducts = [...cartProducts, product]
                }
                setCartProducts(cartProducts)
                CartProductsCounter.rerender()
            })
        })  
    },
    rerender: async () => {
        document
            .getElementById('products-container').outerHTML = await ProductList.render()

        await ProductList.after_render()
    },
}

export default ProductList