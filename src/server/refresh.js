import api, { resetRetry } from '../api/'

export default async function refresh({ rtoken }) {

    resetRetry()

    return api.post('/refresh', {rtoken: rtoken})

}