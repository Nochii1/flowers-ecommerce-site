export const showLoading = (productsHidden = false) => {
    // console.log('loading',document.getElementById('loading'))
    if(productsHidden){
        console.log(document.getElementById('aside-container'),document.getElementById('products-container'))
        document.getElementById('aside-container').classList.add('hidden')
        document.getElementById('products-container').classList.add('hidden')
    } 
    document.getElementById('loading').classList.remove('hidden')
}

export const hideLoading = (productsHidden = false) => {
    if(productsHidden){
        document.getElementById('aside-container').classList.remove('hidden')
        // document.getElementById('products-container').classList.add('hidden')
    }
    document.getElementById('loading').classList.add('hidden')
}