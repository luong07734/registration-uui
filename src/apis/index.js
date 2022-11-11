import axios from 'axios'

console.log(process.env.REACT_APP_BASE_URL_API);
const instance = axios.create({
    baseURL: process.env.REACT_APP_BASE_URL_API
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