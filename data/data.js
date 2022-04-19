const catelog = {
    MAX_95: 'Nike Air Max 95 SE',
    MAX_97: 'Nike Air Max 97 SE',
    MAX_PRE: 'Nike Air Max Pre-Day',
    MAX_270: 'Nike Air Max 270',
    RENEW_RIDE: 'Nike Renew Ride 3',
    MAX_90: 'Nike Air Max 90'
}

const STATUS = {
    TIME_TO_BUY: 'Best time to buy!',
    WAIT_FOR_DISCOUNT: 'Can wait for discount.',
    MODERATE_STATE: 'Moderate state, can buy now!'
}

let index = 1

const sneakers = [{
    id: index ++,
    name: catelog.MAX_95,
    minPrice: 120.00,
    maxPrice: 150.00,
    image: 'max95.jpg'
}, {
    id: index ++,
    name: catelog.MAX_97,
    minPrice: 5.00,
    maxPrice: 150.00,
    image: 'max97.jpg'
}, {
    id: index ++,
    name: catelog.MAX_PRE,
    minPrice: 120.00,
    maxPrice: 160.00,
    image: 'maxPreDay.jpg'
}, {
    id: index ++,
    name: catelog.MAX_270,
    minPrice: 100.00,
    maxPrice: 130.00,
    image: 'max270.jpg'
}, {
    id: index ++,
    name: catelog.RENEW_RIDE,
    minPrice: 180.00,
    maxPrice: 200.00,
    image: 'renewRide3.jpg'
}, {
    id: index ++,
    name: catelog.MAX_90,
    minPrice: 120.00,
    maxPrice: 150.00,
    image: 'max90.jpg'
}]

module.exports = {
    catelog,
    STATUS,
    sneakers,
}