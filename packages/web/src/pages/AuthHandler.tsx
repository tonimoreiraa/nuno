import { useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";

function AuthHandler()
{
    const auth = useAuth()

    useEffect(() => {
        const urlSearchParams = new URLSearchParams(window.location.search)
        const token = urlSearchParams.get('token')
        if (token) {
            auth.signIn({}, token)
        } else {
            window.location.href = '/admin/document'
        }
    }, [])

    return <>Autenticando</>
}

export default AuthHandler;