const data = require('../data/data')
const {STATUS} = require("../data/data");
const {getIdParam} = require('./helper')

function getAll(req, res) {
    const {sneakers} = data
    res.status(200).json(sneakers)
}

function getFromId(id) {
    const {sneakers} = data
    return sneakers.find(s => s.id === id) || null
}

function get(req, res) {
    const id = getIdParam(req)
    // const {sneakers} = data
    // return Promise.resolve({data:sneakers.find(s => s.id === id)})
    res.status(200).json(getFromId(id))
}

function remove(req, res) {
    const id = getIdParam(req)
    const index = data.sneakers.findIndex(s => s.id === id)
    data.sneakers.splice(index, 1)
    // return Promise.resolve()
    res.status(200)
}

function getPrice(req, res) {
    const id = getIdParam(req)
    const sneaker = getFromId(id)
    if (!sneaker) {
        return res.status(404).end()
    }
    const rnd = Math.random()
    if (rnd > 0.7) {
        // greater
        return res.status(200).json({
            price: (sneaker.maxPrice + 10 * Math.random()).toFixed(2) * 1.0,
            status: STATUS.WAIT_FOR_DISCOUNT
        })
    }
    if (rnd > 0.35) {
        // between
        return res.status(200).json({
            price: (sneaker.maxPrice - (sneaker.maxPrice - sneaker.minPrice) * Math.random()).toFixed(2) * 1.0,
            status: STATUS.MODERATE_STATE
        })
    }
    // less
    return res.status(200).json({
        price: (sneaker.minPrice - sneaker.minPrice * Math.random()).toFixed(2) * 1.0,
        status: STATUS.TIME_TO_BUY
    })
}

module.exports = {
    get,
    getAll,
    remove,
    getPrice
}
