import axios from "axios"

const ENV = process.env.EXPO_PUBLIC_API_URL

export const getPosts = () => {
    return axios.get(ENV + "posts")
}

export const updatePost = (data) => {
    return axios.patch(ENV + "posts/" + data.id, data, {
        headers: {
            "Content-Type": 'application/json',
        }
    })
}