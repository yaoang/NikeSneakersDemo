const http = require('./helper').default

describe('helper', () => {
    it('helper should can get/post http', () => {
        expect(http.get).not.toBeUndefined()
        expect(http.post).not.toBeUndefined()
    })

    it('timeout should be same with config', () => {
        expect(http.defaults.timeout).toEqual(10000)
    })
})