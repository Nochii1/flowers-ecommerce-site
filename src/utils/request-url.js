/**
 * Get all url params request
 * @returns Json object with the url params request
 */
export const getRequestUrl = () => {
    let queryString = window.location.search.slice(1)
    let requestUrlObj = {}
    if (queryString) {
        // split our query string into its component parts
        let arr = queryString.split('&')
        for (let i = 0; i < arr.length; i++) {
            // separate the keys and the values
            let a = arr[i].split('=')
            // set parameter name and value (use 'true' if empty)
            let paramName = a[0]
            let paramValue = typeof (a[1]) === 'undefined' ? true : a[1]
            paramName = paramName
            if (typeof paramValue === 'string') paramValue = paramValue
            // if the paramName ends with square brackets, e.g. colors[] or colors[2]
            if (paramName.match(/\[(\d+)?\]$/)) {
                // create key if it doesn't exist
                let key = paramName.replace(/\[(\d+)?\]/, '')
                if (!requestUrlObj[key]) requestUrlObj[key] = []
                // if it's an indexed array e.g. colors[2]
                if (paramName.match(/\[\d+\]$/)) {
                    // get the index value and add the entry at the appropriate position
                    let index = /\[(\d+)\]/.exec(paramName)[1]
                    requestUrlObj[key][index] = paramValue
                } else {
                    // otherwise add the value to the end of the array
                    requestUrlObj[key].push(paramValue)
                }
            } else {
                // we're dealing with a string
                if (!requestUrlObj[paramName]) {
                    // if it doesn't exist, create property
                    requestUrlObj[paramName] = paramValue
                } else if (requestUrlObj[paramName] && typeof requestUrlObj[paramName] === 'string'){
                    // if property does exist and it's a string, convert it to an array
                    requestUrlObj[paramName] = [requestUrlObj[paramName]]
                    requestUrlObj[paramName].push(paramValue)
                } else {
                    // otherwise add the property
                    requestUrlObj[paramName].push(paramValue)
                }
            }
        }
    }
    return requestUrlObj
}

/**
 * Get the current page resource
 * @returns Json object with the current page resource
 */
export const parseRequestUrl = () => {
    const address = document.location.hash.slice(1).split('?')[0]
    const queryString =
        document.location.hash.slice(1).split('?').length === 2
            ? document.location.hash.slice(1).split('?')[1]
            : ''

    const url = address.toLowerCase() || '/'
    const resource = url.split('/')
    const query = queryString.split('=')
    return {
        resource: resource[1],
        id: resource[2],
        verb: resource[3],
        name: query[0],
        value: query[1],
    }  
}