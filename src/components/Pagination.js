const Pagination = {
    /**
     * Render pagination elements bar 
     * @param {Number} totalPages Total pages of pagination elements
     * @param {Number} currentPage Current page number of paging elements
     * @returns {String} String html element to the render pagination
     */
    render: ({totalPages, currentPage}) => {
        const paginationList = Array.from({length: totalPages}, (v, i) => i)
        const previousPage = (currentPage-1) < 1 ? 0 : currentPage-1
        const nextPage = (currentPage+1) > totalPages ? 0 : (currentPage+1)
        return ` 
            <div class="flex flex-row space-x-2 items-center text-center pt-3 justify-center">
                <div id="pagination-numbers" class="flex flex-row space-x-3 justify-center">
                    <span id="previous" data-page="${previousPage}" class="hover:text-blue hover:underline cursor-pointer text-md">&lt</span>
                    ${paginationList.map( (page) => `
                        <span class="hover:text-blue hover:underline cursor-pointer text-md ${currentPage == page+1 ? 'underline text-blue' : ''}">${page+1}</span>
                    `).join('\n')}
                    <span id="next" data-page="${nextPage}" class="hover:text-blue hover:underline cursor-pointer text-md">&gt</span>
                </div>
            </div>
        `
    },
}

export default Pagination