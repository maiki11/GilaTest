import { apiUrl } from "../constants";
var axios = require('axios');
var request = axios.create({
    baseURL: apiUrl,
    'Content-Type': 'application/json'
})
export default class LoginApi {
    static login(email, password) {
        return request.post('login', {
            email: email,
            password: password,
        });
    }
}
