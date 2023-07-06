import { useEffect } from "react";
import api from "../services/api";

function GoogleLogin()
{
    useEffect(() => {
        api.get('/auth/google')
        .then(({data}) => {
            window.location.href = data.url
        })
    }, [])

    return <>Redirecionando...</>
}

export default GoogleLogin;