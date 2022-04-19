// init all user data
const users = [
    {
        id: 1,
        name: 'Derek',
        age: 35,
    },
    // another user
    {
        id: 2,
        name: 'Semon',
        age: 39
    }
]

// fetch all users
function getAll(req, res) {
    return res.status(200).json(users)
}

// get one user
function get(req, res) {
    const id = getIdParam(req)
    return res.status(200).json(
        users.find(u => u.id === id) || null
    )
}

modal.exports = {
    get,
    getAll,
}
