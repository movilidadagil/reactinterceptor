import api from '../api/'

export default async function logout({ token }) {
    return api({
        url: '/auth/signout',
        method: 'post',
        headers: { 'Authorization': token ? 'Bearer ' + token : '' }
    })
}