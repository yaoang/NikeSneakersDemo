import axios from 'axios'
const instatnce = axios.create({
    timeout: 10,
})

instatnce.interceptors.request.use(function(config) {
    console.log(config)
    return config
}, function(err) {
    return Promise.reject(err)
})

export default instatnce
