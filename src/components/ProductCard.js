const ProductCard = {
    render: ({id, name,url_image, price, discount, category }) => {
        const totalDiscount = discount > 0 ? price-((price*discount)/100) : 0
        return `
            <li class="shadow-md p-3 border border-gray-300">
                <img src="${url_image != '' ? url_image : 'http://owen.tuzitio.com/assets/camaleon_cms/image-not-found-4a963b95bf081c3ea02923dceaeb3f8085e1a654fc54840aac61a57a60903fef.png'}" alt="${name}" />
                <div class="flex flex-col py-2 justify-between space-y-2 border-t border-gray-300">
                    <div class="flex flex-col">
                        <label class="truncate font-semibold">${name}</label>
                        <label class="text-sm ${discount > 0 ? 'line-through' : ''}">${price.toLocaleString('es-CL', { style: 'currency', currency: 'CLP' })}</label>
                    </div>
                    <div class="flex flex-row justify-between">
                        ${
                            discount > 0 ? `
                                <label class="text-red-700 text-sm">
                                    ${totalDiscount.toLocaleString('es-CL', { style: 'currency', currency: 'CLP' })} ${discount}% Off
                                </label>
                            ` : '<label></label>'
                        }
                        
                        <label 
                            data-id="${id}" 
                            data-name="${name}" 
                            data-image="${url_image}" 
                            data-price="${price}" 
                            data-discount="${discount}" 
                            data-category="${category}" 
                            class="add-cart pb-2 text-gray-800 hover:text-gray-400 cursor-pointer"
                        >
                            <svg class="h-6 w-6" fill="currentColor" stroke="currentColor" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg">
                                <path d="M469.333333 384h85.333334v-128h128V170.666667h-128V42.666667h-85.333334v128h-128v85.333333h128v128z m-170.666666 384c-47.146667 0-84.906667 38.186667-84.906667 85.333333s37.76 85.333333 84.906667 85.333334 85.333333-38.186667 85.333333-85.333334-38.186667-85.333333-85.333333-85.333333z m426.666666 0c-47.146667 0-84.906667 38.186667-84.906666 85.333333s37.76 85.333333 84.906666 85.333334 85.333333-38.186667 85.333334-85.333334-38.186667-85.333333-85.333334-85.333333z m-419.2-138.666667c0-1.92 0.426667-3.626667 1.28-5.12l38.4-69.546666h317.866667c32 0 59.946667-17.706667 74.666667-43.946667l164.693333-299.093333L828.373333 170.666667h-0.213333l-47.146667 85.333333-117.546666 213.333333H364.16l-5.546667-11.52L262.826667 256l-40.533334-85.333333-40.32-85.333334H42.666667v85.333334h85.333333l153.6 323.626666-57.813333 104.533334c-6.613333 12.373333-10.453333 26.24-10.453334 41.173333 0 47.146667 38.186667 85.333333 85.333334 85.333333h512v-85.333333H316.8c-5.973333 0-10.666667-4.693333-10.666667-10.666667z"  />
                            </svg>
                        </label>
                    </div>
                </div>
            </li>
        `
    },
}

export default ProductCard