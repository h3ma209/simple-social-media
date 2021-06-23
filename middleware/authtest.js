import axios from 'axios'

function AuthAx (token) {
    return axios.create({
        baseURL: 'http://localhost:4000/',
        headers: {
            Authorization: token
        }
    })
}

export { AuthAx }
