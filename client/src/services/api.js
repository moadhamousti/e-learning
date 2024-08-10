// client/src/services/api.js

const apiUrl = process.env.REACT_APP_API_BASE_URL;

export const fetchAuthData = () => {
    return fetch(`${apiUrl}/api/auth`)
        .then(response => response.json())
        .catch(error => {
            console.error('Error:', error);
            throw error;
        });
};
