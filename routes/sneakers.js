const data = require('../data/data')
const {STATUS} = require("../data/data");
const {getIdParam} = require('./helper')

function getAll(req, res) {
    const {sneakers} = data

    sneakers.forEach(sneaker => {
        const priceObj = getRandomPrice(sneaker)
        Object.assign(sneaker, priceObj)
    })

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
    const sneaker = getFromId(id)
    const priceObj = getRandomPrice(sneaker)
    Object.assign(sneaker, priceObj)
    console.log(sneaker)
    res.status(200).json(sneaker)
}

function remove(req, res) {
    const id = getIdParam(req)
    const index = data.sneakers.findIndex(s => s.id === id)
    data.sneakers.splice(index, 1)
    // return Promise.resolve()
    res.status(200)
}

function getStatus(sneaker, discounted) {
    const {maxPrice, minPrice} = sneaker
    if(discounted >= maxPrice) {
        return STATUS.WAIT_FOR_DISCOUNT
    }

    if(discounted > minPrice && discounted < maxPrice) {
        return STATUS.MODERATE_STATE
    }

    if(discounted <= minPrice) {
        return STATUS.TIME_TO_BUY
    }
}

function getRandomPrice(sneaker) {
    const rnd = Math.random()
    if (rnd > 0.7) {
        // greater
        const price = (sneaker.maxPrice + 10 * Math.random()).toFixed(2) * 1.0
        return {
            price,
            status: getStatus(sneaker, price)
        }
    }
    if (rnd > 0.35) {
        // between
        const price = (sneaker.maxPrice - (sneaker.maxPrice - sneaker.minPrice) * Math.random()).toFixed(2) * 1.0
        return {
            price,
            status: getStatus(sneaker, price)
        }
    }
    // less
    const price = (sneaker.minPrice - sneaker.minPrice * Math.random()).toFixed(2) * 1.0
    return {
        price,
        status: getStatus(sneaker, price)
    }
}

// function getPrice(req, res) {
//     const id = getIdParam(req)
//     const sneaker = getFromId(id)
//     if (!sneaker) {
//         return res.status(404).end()
//     }
//
//     const priceObject = getRandomPrice(sneaker)
//     return res.status(200).json(priceObject)
// }

function getDiscountedAndOriginal(sneaker) {
    const priceObject = getRandomPrice(sneaker)
    const originPrice = (priceObject.price / 0.6).toFixed(2) * 1.0
    return {
        id: sneaker.id,
        discounted: priceObject.price,
        original: originPrice,
        status: priceObject.status,
    }
}

function getPrices(req, res) {
    const id = getIdParam(req)
    const sneaker = getFromId(id)
    if (!sneaker) {
        return res.status(404).end()
    }

    return res.status(200).json(getDiscountedAndOriginal(sneaker))
}

module.exports = {
    get,
    getAll,
    remove,
    getPrices,
    getStatus
}
