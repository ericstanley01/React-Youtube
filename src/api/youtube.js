import axios from 'axios'

const KEY = process.env.REACT_APP_YOUTUBE_API_KEY

export default axios.create({
    baseURL: process.env.REACT_APP_YOUTUBE_BASE_URL,
    params: {
        part: 'snippet',
        maxResults: 5,
        key: KEY
    }
})