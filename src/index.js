import HomePage from './pages/HomePage'
import { showLoading, hideLoading } from './utils/loading'
import { parseRequestUrl } from './utils/request-url'
import Error404Page from './pages/Error404Page'
import Header from './components/Header'
import Footer from './components/Footer'
import '../global.css'

const routes = {
    '/': HomePage
}

/**
 * Controls the logic of the application's routes
 */
const router = async () => {
    
    const request = parseRequestUrl()
    const parseUrl =
        (request.resource ? `/${request.resource}` : '/') +
        (request.id ? '/:id' : '') +
        (request.verb ? `/${request.verb}` : '')

    const header = document.getElementById('header-container')
    header.innerHTML = await Header.render()
    await Header.after_render()
    showLoading()
    const footer = document.getElementById('footer-container')
    footer.innerHTML = await Footer.render()
    
    const page = routes[parseUrl] ? routes[parseUrl] : Error404Page
    const main = document.getElementById('main-container')
    main.innerHTML = await page.render()
    if (page.after_render) await page.after_render()

    hideLoading()
}
window.addEventListener('load', router)
window.addEventListener('hashchange', router)