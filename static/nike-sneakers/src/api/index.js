import http from './helper'
import {
    catelog,
    STATUS,
    sneakers
} from './debugApi'

const getAll = async (isDebug) => {
    console.log('calling getAll API*****************')
    if (isDebug) {
        return sneakers
    }

    const list = await http.get('/api/sneakers/getAll')
    return list
}

export {
    getAll,
}