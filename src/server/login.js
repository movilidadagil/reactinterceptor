import api, { resetRetry } from '../api/'

export default async function login({ username, phonenumber,password }) {

    resetRetry()

    return api.post('/auth/signin', { username: username, phonenumber:phonenumber,password: password })

}
