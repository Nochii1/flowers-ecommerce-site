import ProductList from '../components/ProductList'
import Aside from '../components/Aside'
import { showLoading, hideLoading } from '../utils/loading'

/**
 * Product page
 */
const HomePage = {
    render: async () => {
        return `
            <div class="flex flex-col md:flex-row md:justify-center h-full z-0 relative pt-20 px-4 md:px-28">
                ${Aside.render()}
                <div class="flex flex-col md:w-3/4">
                    <div class="flex flex-row justify-end">
                        <label class="block text-left">
                            <select id="order-price" class="form-select block w-full mt-1">
                                <option value="">Order by...</option>
                                <option value="ASC">Lower Price</option>
                                <option value="DESC">Higher Price</option>
                            </select>
                        </label>
                    </div>
                    ${ await ProductList.render() }
                    
                </div>
            </div>
        `
    },
    after_render: async () => {
        await ProductList.after_render()
        Aside.after_render()
        document
            .getElementById('order-price')
            .addEventListener('change', async (e) => {
                showLoading(true)
                e.preventDefault()
                const orderBy = e.target.value
                const currentUrlHash = document.location.search
                const searchRegex = /orderPrice=[^&]+/i
                if(searchRegex.test(currentUrlHash)){
                    history.replaceState({}, "", currentUrlHash.replace(searchRegex,`orderPrice=${orderBy}`))
                }else{
                    history.pushState({}, "", currentUrlHash != '' ? `${currentUrlHash}&orderPrice=${orderBy}` :  `/?orderPrice=${orderBy}`)
                }
                await ProductList.rerender()
                await ProductList.after_render()
                hideLoading(true)
            })
    },
}

export default HomePage