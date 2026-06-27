import axiosInstance from "./axiosInstance";

const commonAPI = async (method,url,reqBody) => {
    const reqConfig = {
        method: method,
        data: reqBody,
        url,
    }

    try {
        const response = axiosInstance(reqConfig)
        return response
    } catch (error) {
        throw error
    }
}

export default commonAPI