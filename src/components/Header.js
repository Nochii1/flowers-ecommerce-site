import { getRequestUrl } from '../utils/request-url'
import ProductList from './ProductList'
import CartProductsCounter from './CartProductsCounter'
import CategoriesDropdown from './CategoriesDropdown'
import { showLoading, hideLoading } from '../utils/loading'

/**
 * Contains the navbar of the application
 */
const Header = {
    render: async () => {
        const { search } = getRequestUrl()
        return ` 
            <nav class="z-10 flex flex-row justify-around space-x-2 bg-white shadow-md px-3 items-center w-screen text-gray-600">
                <div class="">
                    <a href="/#/" class="text-2xl align-top">Flowers</a>
                </div>
                ${await CategoriesDropdown.render()}
                <div class="w-2/3 flex flex-row justify-end">  
                    <div class="w-full flex flex-row justify-center items-center space-x-2"  id="search-form">
                        <input type="text" name="search-input" class="w-5/6 focus:border-gray-400 rounded-xl px-3 py-0.5" id="search-input" value="${search || ''}" /> 
                        <label class="items-center cursor-pointer text-gray-800 hover:text-gray-400" for="search-input">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                        </label>
                    </div>
                    <a class="py-4 px-1 relative border-2 border-transparent text-gray-800 rounded-full hover:text-gray-400 focus:outline-none focus:text-gray-500 transition duration-150 ease-in-out" aria-label="Cart">
                        <svg class="h-6 w-6" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" stroke="currentColor">
                            <path d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"></path>
                        </svg>
                        ${CartProductsCounter.render()}
                    </a>
                    
                </div>
            </nav>
        `
    },
    after_render: async () => {
        /** Initial load categories dropdown event listeners */
        await CategoriesDropdown.after_render()

        /** Add event listener to the search products input and when execute change or add search url param */
        document
            .getElementById('search-input')
            .addEventListener('change', async (e) => {
                showLoading(true)
                e.preventDefault()
                const searchKeyword = e.target.value
                history.pushState({}, "", `/?search=${searchKeyword}`)
                await ProductList.rerender()
                window.scrollTo(0, 0)
                document.getElementById('sales-filter').checked = false
                hideLoading(true)
            })
    },
}

export default Header