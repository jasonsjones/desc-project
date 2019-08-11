const getBaseUrl = () => {
    if (process.env.NODE_ENV !== 'production') {
        return 'http://localhost:3000';
    } else {
        return 'https://desc-api.herokuapp.com';
    }
};

const BASE_URL = `${getBaseUrl()}`;

export const login = creds => {
    return fetch(`${BASE_URL}/api/auth/login`, {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(creds)
    }).then(response => {
        if (response.status === 200) {
            return response.json();
        }
        if (response.status === 401) {
            return {
                success: false,
                message: 'unauthorized'
            };
        }
    });
};

export const logout = () => {
    return fetch(`${BASE_URL}/api/auth/logout`, {
        method: 'GET',
        credentials: 'include'
    }).then(response => response.json());
};

export const fetchSessionUser = () => {
    return fetch(`${BASE_URL}/api/users/me`, {
        method: 'GET',
        credentials: 'include'
    }).then(response => response.json());
};
