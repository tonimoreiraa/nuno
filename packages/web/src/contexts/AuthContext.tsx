import { createContext, useContext } from "react";
import {useLocalStorage} from 'react-use'
import { v4 as uuid } from 'uuid'
import CryptoJS from "crypto-js";

interface UserType {
    name: string,
    email: string,
}

type AuthContextType = {
     authenticated: boolean,
     userData?: UserType,
     token?: string,
     signIn: (userData: object, token: string) => void,
     signOut: () => void,
}

export const AuthContext = createContext<AuthContextType>({} as AuthContextType)

export function AuthProvider(props: any) {

    const [k] = useLocalStorage<string>('@a-k', uuid())

    // @ts-ignore
    const serializer = (v: any) => CryptoJS.AES.encrypt(JSON.stringify(v), k).toString()
    const deserializer = (v: string) => {
        // @ts-ignore
        const bytes = CryptoJS.AES.decrypt(v, k)
        return JSON.parse(bytes.toString(CryptoJS.enc.Utf8))
    }

    const [token, setToken] = useLocalStorage<string|undefined>('@auth-token', undefined, {raw: false, serializer, deserializer})
    const [userData, setUserData] = useLocalStorage<UserType|undefined>('@auth-user-data', undefined, {raw: false, serializer, deserializer})

    function signIn(user: UserType|any, t: string) {
        setToken(t)
        setUserData(user)
        window.location.href = '/'
    }

    function signOut() {
        window.localStorage.removeItem('@auth-token')
        window.localStorage.removeItem('@auth-user-data')
        window.location.href = '/'
    }

    const authenticated = Boolean(token)

    return <AuthContext.Provider value={{token, userData, authenticated, signIn, signOut}}>
        {props.children}
    </AuthContext.Provider>
}

export const useAuth = () => useContext(AuthContext)