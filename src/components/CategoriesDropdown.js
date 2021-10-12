import { getCategories } from '../api/categories'
import ProductList from './ProductList'
import { getRequestUrl } from '../utils/request-url'
import { showLoading, hideLoading } from '../utils/loading'

/**
 * Categories dropdown selector
 */
const CategoriesDropdown = {
    render: async () => {
        const {items} = await getCategories()
        const {category} = getRequestUrl()
        return ` 
            <div id="dropdown" class="dropdown" >
                <label onClick="return true" class="dropbtn flex flex-row items-center space-x-1 text-gray-800 hover:text-gray-400 cursor-pointer">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                    <span class="text-sm">Categories<span>
                </label>
                <div id="categories-dropdown" class="p-4 dropdown-content space-y-2 pt-4 shadow-md absolute flex flex-col bg-white">
                    ${items.map( ({id, name}) => `
                        <span 
                            data-id="${id}" 
                            class="hover:underline cursor-pointer text-sm ${category == id ? 'underline' : ''}"
                        >${name}</span>
                    `).join('\n')}
                </div>
            </div>
        `
    },
    after_render: async () => {
        /** Add event listener to the categories dropdown and when execute change or add category url param */
        document
            .getElementById('categories-dropdown')
            .addEventListener('click', async (e) => {
                const categoryId = e?.target?.dataset?.id
                if(categoryId){
                    showLoading(true)
                    e.preventDefault()
                    history.pushState({}, "", `/?category=${categoryId}`)
                    await CategoriesDropdown.rerender()
                    await ProductList.rerender()
                    window.scrollTo(0, 0)
                    document.getElementById('sales-filter').checked = false
                    hideLoading(true)
                }
            })
    },
    rerender: async () => {
        document.getElementById('dropdown').outerHTML = await CategoriesDropdown.render()
        await CategoriesDropdown.after_render()
    }
}

export default CategoriesDropdown