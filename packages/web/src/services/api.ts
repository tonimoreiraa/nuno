import axios from "axios";
import CryptoJS from "crypto-js";

const deserializer = (v: string) => {
    // @ts-ignore
    const bytes = CryptoJS.AES.decrypt(v, JSON.parse(window.localStorage.getItem('@a-k')))
    const plain = bytes.toString(CryptoJS.enc.Utf8)
    return plain ? JSON.parse(plain) : plain
}

const rawToken = window.localStorage.getItem('@auth-token')
const authToken = rawToken ?  deserializer(rawToken) : undefined

const api = axios.create({
    baseURL: import.meta.env.VITE_APP_API_BASE_URL,
    headers: authToken ? { Authorization: 'Bearer ' + authToken } : {}
})

export function catchApiErrorMessage(error: any) {
    console.error(error)
    if (!error.response) return error.message
    const res = error.response.data
    if (!res) {
        return 'Falha ao se conectar.'
    }
    if (res.message) {
        return res.message
    }
    if (res.errors) {
        return res.errors
        .map((e: any) => !!e.field && (e.field + ': ') + e.message)
        .reduce((x: string, y: string) => x + ' ' + y, [])
    }
    return res
}

export default api;