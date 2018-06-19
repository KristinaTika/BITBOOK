import {requestsHeader, userEditProfileEndpoint, registerEndpoint } from '../shared/constants';


export const get = (url) => {

    return fetch(url, {
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: requestsHeader,
        method: 'GET',
        mode: 'cors'
    })
        .then(response => {
            return response.json()
        })
}


export const post = (url, newContent, headers = requestsHeader) => {

    const postData = {
        method: 'POST',
        body: JSON.stringify(newContent),
        headers: headers,
        mode: 'cors'
    }
    return fetch(url, postData)
     
}

export const put = (url, data) => {

    return fetch(url, {
       
        method: 'PUT',
        body: JSON.stringify(data),
        headers: requestsHeader,
    })
      
}

