// UserDetailsProvider.js

import { createContext, useState } from 'react';

//create a context, with createContext api
export const DarkContext = createContext({});

const DarkThemeProvider = ({children}) => {

    const [dark, setDark] = useState(true);

    return (
        <AuthContext.Provider value={{dark, setDark}}>
            {children}
        </AuthContext.Provider>
    );
};

export default DarkThemeProvider
