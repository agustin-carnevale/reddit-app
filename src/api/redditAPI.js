import axios from 'axios'

const instance =  axios.create({
    // baseURL:'https://reddit.com/r',
    baseURL:'https://oauth.reddit.com',
})

instance.interceptors.request.use(
    async (config)=>{ 
        config.headers.Authorization = `Bearer -4ojrARKyTXFzeyAFIUOVe74dahY`
        return config
    },
    (err)=>{
        return Promise.reject(err)
     },
)

export default instance