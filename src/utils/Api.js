//get, post api 구현
import axios from "axios";

//code
const baseURL = process.env.API_SERVER;
const config = {
    baseURL: baseURL,
    headers: {
        "Content-Type": "application/json",
    }
}

export const getAPI = async (url, params={}) => {
    return axios.get(`${url}`, params, config)
                .then(function (response) {
                    return response;
                }).catch((e) => {
                    return error;
                });
            };


export const postAPI = async (url, params={}) => {
    return axios.post(`${baseURL}${url}`, params, config)
                .then(function (response) {
                    return response;
                }).catch((e) => {
                    return error;
                });
            };

