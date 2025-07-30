import axiosInstance from './axiosInstance';

export const get = async (url, params = {}) => {
    try {
        const response = await axiosInstance.get(url, { params });
        return response.data;
    } catch (error) {
        throw error.response?.data || error.message;
    }
};

export const post = async (url, data, config = {}) => {
    try {
        const response = await axiosInstance.post(url, data, config);
        return response.data;
    } catch (error) {
        throw error.response?.data || error.message;
    }
};

export const put = async (url, data) => {
    try {
        const response = await axiosInstance.put(url, data);
        return response.data;
    } catch (error) {
        throw error.response?.data || error.message;
    }
};

export const del = async (url,data) => {
    try {
        const response = await axiosInstance.delete(url,data);
        return response.data;
    } catch (error) {
        throw error.response?.data || error.message;
    }
};
