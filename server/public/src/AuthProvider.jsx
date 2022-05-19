// UserDetailsProvider.js

import { createContext, useState } from 'react';

//create a context, with createContext api
export const AuthContext = createContext({});

const AuthProvider = ({children}) => {

    const [auth, setAuth] = useState({isAuth : false});

    return (
        <AuthContext.Provider value={{auth, setAuth}}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider
