import { BASE_URL } from './util';

export const getItemsForUser = userId => {
    return fetch(`${BASE_URL}/api/items?submittedBy=${userId}`, {
        method: 'GET',
        credentials: 'include'
    }).then(response => {
        if (response.ok) {
            return response.json();
        }
    });
};

export const addNoteToItem = (itemId, postBody) => {
    return fetch(`${BASE_URL}/api/items/${itemId}/notes`, {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(postBody)
    }).then(response => {
        if (response.ok) {
            return response.json();
        }
    });
};
