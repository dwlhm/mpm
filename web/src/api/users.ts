import axios from "axios";

export interface Login {
    username: string,
    password: string
}

export async function doLogin({username, password}: Login) {
    const data = new URLSearchParams()
    data.append("username", username)
    data.append("password", password)

    const config = {
        method: 'post',
        headers: { 
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        data : data
    };
    const res = await axios(`${import.meta.env.VITE_BACKEND_URL}/token`, config)

    return res
}