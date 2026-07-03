import axios from "axios"

const commonAPI = async (method,url,reqBody, params = {}) => {
    const reqConfig = {
        method: method,
        data: reqBody,
        url,
        params
    }

    try {
        const response = axios(reqConfig)
        return response
    } catch (error) {
        throw error
    }
}

export default commonAPI