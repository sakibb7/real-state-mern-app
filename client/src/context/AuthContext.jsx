import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext()

export const AuthContextProvider = ({children})=> {

    const [currestUser, setCurrentUser] = useState(JSON.parse(localStorage.getItem("user")) || null)

    const updateUser = (data)=> {
        setCurrentUser(data)
    }

    useEffect(()=> {
        localStorage.setItem("user",JSON.stringify(currestUser))
    },[currestUser])

    return(
        <AuthContext.Provider value={{currestUser,updateUser}}>
            {children}
        </AuthContext.Provider>
    )
}