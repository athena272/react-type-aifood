import axios from "axios";

const baseHttp = axios.create({
    baseURL: 'http://localhost:8000/api/'
})

export default baseHttp