const sneakers = require('./sneakers')
describe('test sneakers', () => {
    const req = {
        params: {
            id: 1,
        }
    }

    let myReturnPrices = {}
    const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(function (obj) {
            myReturnPrices = obj
            console.log('result = ', myReturnPrices)
            return this
        })
    }

    it('test get sneaker', () => {
        sneakers.get(req, res)
        expect(myReturnPrices.name).toEqual('Nike Air Max 95 SE')
        expect(myReturnPrices.maxPrice).toEqual(150.00)
        expect(myReturnPrices.minPrice).toEqual(120.00)
    })

    it('test get random price and discounted, original price', () => {
        sneakers.get(req, res)
        const sneaker = myReturnPrices

        sneakers.getPrices(req, res)
        const {discounted} = myReturnPrices
        const status = sneakers.getStatus(sneaker, discounted)

        expect(res.status).toBeCalledWith(200)
        expect(res.json).toBeCalledWith({
            id: 1,
            discounted,
            original: (discounted / 0.6).toFixed(2) * 1.0,
            status
        })
    })
})