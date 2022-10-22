import http from './helper'
import {
    sneakers
} from './debugApi'

const getAll = async (isDebug) => {
    if (isDebug) {
        return {data: sneakers}
    }

    const list = await http.get('/api/sneakers/getAll')
    return list
}

export {
    getAll,
}