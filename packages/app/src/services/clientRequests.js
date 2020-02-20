import { BASE_URL } from './util';

export const makeClientRequest = requestData => {
    return fetch(`${BASE_URL}/api/clientrequests`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(requestData)
    }).then(response => {
        if (response.ok) {
            return response.json();
        }
    });
};
