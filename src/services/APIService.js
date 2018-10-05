import axios from 'axios';

export const getHeaders = () => {
    let requestsHeader = {
        'Content-Type': 'application/json',
        'Key': 'bitbookdev',
    }

    if (localStorage.getItem("sessionId")) {
        requestsHeader['SessionId'] = localStorage.getItem("sessionId");
    }

    return requestsHeader;
}

export const get = (url) => {

    return axios.get(url, {
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: getHeaders(),
        method: 'GET',
        mode: 'cors'
    })
        .then(response => response.data);
}

export const post = (url, newContent) => {

    const postData = {
        method: 'POST',
        body: JSON.stringify(newContent),
        headers: getHeaders(),
        mode: 'cors'
    }
    return fetch(url, postData);
}

export const put = (url, data) => {

    return fetch(url, {
        method: 'PUT',
        body: JSON.stringify(data),
        headers: getHeaders(),
    });
}

export const deleteData = (url) => {

    return axios(url, {
        method:'DELETE',
        headers: getHeaders()
    });
}

