// import axios from 'axios';
// import { createContext, useEffect, useState } from 'react';

// export const UserContext = createContext({});

// export function UserContextProvider({ children }) {
//     const [user, setUser] = useState(null);

//     useEffect(() => {
//         axios.get('/dashboard')
//             .then(({ data }) => {
//                 console.log('User data:', data); // Log the user data
//                 setUser(data); // Ensure data has a name field
//             })
//             .catch((error) => {
//                 console.error('Error fetching user profile:', error);
//             });
//     }, []);

//     return (
//         <UserContext.Provider value={{ user, setUser }}>
//             {children}
//         </UserContext.Provider>
//     );
// }







// src/context/UserContext.jsx
import axios from 'axios';
import { createContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const UserContext = createContext({});

export function UserContextProvider({ children }) {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();
    const apiUrl = process.env.REACT_APP_API_BASE_URL;

    useEffect(() => {
        axios.get(`${apiUrl}/api/auth/profile`, { withCredentials: true })
            .then(({ data }) => {
                console.log('User data:', data); // Log the user data
                setUser(data); // Ensure data has a name field
            })
            .catch((error) => {
                console.error('Error fetching user profile:', error);
                setUser(null);
            });
    }, [apiUrl]);

    const login = async (email, password) => {
        try {
            const { data } = await axios.post(`${apiUrl}/api/auth/login`, { email, password }, { withCredentials: true });
            setUser(data);
        } catch (error) {
            console.error('Error logging in:', error);
        }
    };

    const logout = async () => {
        try {
            await axios.post(`${apiUrl}/api/auth/logout`, {}, { withCredentials: true });
            setUser(null);
            navigate('/login'); // Redirect to login page
        } catch (error) {
            console.error('Error logging out:', error);
        }
    };

    return (
        <UserContext.Provider value={{ user, login, logout }}>
            {children}
        </UserContext.Provider>
    );
}
