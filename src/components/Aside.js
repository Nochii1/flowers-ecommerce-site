import ProductList from './ProductList'
import { showLoading, hideLoading } from '../utils/loading'

/**
 * Home page aside bar with the products filters
 */
const Aside = {
    render: () => {
        return ` 
            <aside id="aside-container" class="md:w-1/4">
                <h3 class="text-xl font-semibold">Filters</h3>
                <div class="mt-4">
                    <span class="text-lg">Discounts</span>
                    <div class="text-md mt-2 cursor-pointer">
                        <label class="inline-flex items-center cursor-pointer">
                            <input id="sales-filter" type="checkbox" class="form-checkbox" >
                            <span class="ml-2">Sales</span>
                        </label>
                    </div>
                </div>
            </aside>
        `
    },
    after_render: () => {
        /** Add event listener to the sales filter checkbox and when execute change or add filters url param */
        document
            .getElementById('sales-filter')
            .addEventListener('change', async (e) => {
                showLoading(true)
                e.preventDefault();
                const filter = e.target.value;
                const currentUrlHash = document.location.search
                const searchRegex = /&?filters=[^&]+/i
                if(searchRegex.test(currentUrlHash)){
                    history.replaceState({}, "", currentUrlHash.replace(searchRegex, filter ? '' : `filters=sales`))
                }else{
                    history.pushState({}, "", currentUrlHash != '' ? `${currentUrlHash}&filters=sales` :  `/?filters=sales`)
                }
                await ProductList.rerender()
                window.scrollTo(0, 0)
                hideLoading(true)
            })
    },
}

export default Aside