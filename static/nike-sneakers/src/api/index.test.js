import nock from "nock";

const {getAll} = require('./index')
import {
    sneakers
} from './debugApi'

function mockApi() {
    const scope = nock('http://localhost')
        .get('/api/sneakers/getAll')
        .once()
        .reply(200, sneakers)

    return scope
}

describe('api/index', () => {
    it('should get all debug list data', async () => {
        const {data} = await getAll(true)
        const length = sneakers.length
        expect(data).toHaveLength(length)
    })

    it('should get list data from api', async () => {
        mockApi()

        const response = await getAll(false)
        // console.log(response)
        const {data, status} = response
        const length = sneakers.length
        expect(data).toHaveLength(length)
        expect(status).toEqual(200)
    })
})