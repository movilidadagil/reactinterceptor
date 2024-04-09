import api, { resetRetry } from '../api/'

export default async function getData({ token }) {

    resetRetry()

    return api({
        url: '/profileinfo/mypersonelinformation',
        method: 'get',
        headers: { 'Authorization': token ? 'Bearer ' + token : '' }
    })

}