const {getHasPermission} = require('./promise')

describe('promise', () => {
    it('should get has permission', () => {
        const hasPermission = getHasPermission({})
        expect(hasPermission).toBeTruthy()
    })
})