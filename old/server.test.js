require('regenerator-runtime/runtime')

const server = require('./server')

describe('server', () => {
    afterAll(() => {
        server.close()
    })

    it('app should start', () => {
        expect(server.listening).toBeTruthy()
        const {port} = server.address()
        expect(port).toEqual(3000)
    })
})