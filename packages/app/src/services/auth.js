import jwt from 'jsonwebtoken';
import { BASE_URL } from './util';

export function login(creds) {
    return fetch(`${BASE_URL}/api/auth/login`, {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(creds)
    }).then((response) => {
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
}

export function logout() {
    return fetch(`${BASE_URL}/api/auth/logout`, {
        method: 'GET',
        credentials: 'include'
    }).then((response) => response.json());
}

export const fetchSessionUser = () => {
    return fetch(`${BASE_URL}/api/users/me`, {
        method: 'GET',
        credentials: 'include'
    }).then((response) => response.json());
};

export function getValidToken(currentToken) {
    const tokenExpires = jwt.decode(currentToken).exp;
    const now = Date.now().valueOf() / 1000;
    if (now > tokenExpires) {
        return refreshToken().then((data) => {
            if (data.payload.accessToken) {
                return data.payload.accessToken;
            } else {
                return '';
            }
        });
    }
    return Promise.resolve(currentToken);
}

export function refreshToken() {
    return fetch(`${BASE_URL}/api/auth/refreshtoken`, {
        credentials: 'include'
    }).then((res) => res.json());
}
