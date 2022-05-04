const {getIdParam} = require('./helper')

describe('routes/helper', () => {
    it('helper should can get id parameter', () => {
        const id = getIdParam({
            params: {
                id: 1234
            }
        })
        expect(id).toEqual(1234)
    })

    it('should get error', () => {
        try {
            const id = getIdParam({
                params: {
                    id: 'asdfsdafiwe'
                }
            })
        } catch(ex) {
            expect(ex.message).toContain('Invalid \':id\' param: "asdfsdafiwe"')
        }
    })
})