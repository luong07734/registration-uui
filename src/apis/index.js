import axios from 'axios'
import config from '../config/index'

console.log(process.env.REACT_APP_BASE_URL_API);
const instance = axios.create({
    // baseURL: process.env.REACT_APP_BASE_URL_API
    baseURL: config.BASEURL
  });

instance.interceptors.request.use(config =>{
    const accessToken = localStorage.getItem("accessToken");
    if(accessToken){
        config.headers['Authorization'] = `Bearer ${accessToken}`;
    }
    return config;
});

export const signup = async ({ fullname, email, password }) => {
    return await instance.post('users/register', {
        fullname, email, password
    });
}

export const signin = async ({email, password}) => {
    return await instance.post('users/login',{
        email, password
    })
}

export const getProfile = async () =>{
    return await instance.get('users/profile');
}

