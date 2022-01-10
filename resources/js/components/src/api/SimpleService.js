import { apiUrl } from "../constants";
var axios = require('axios');
var request = axios.create({
    baseURL: apiUrl,
    headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}`, 'Content-Type': 'application/json' }
})
export default class SimpleService {
    constructor(model){
        this.model = model;
    }
    getAll() {
        return request.get(`/${this.model}`);
    }

    get(id) {
        return request.get(`/${this.model}/${id}`);
    }


    create(data) {
        return request.post(`/${this.model}/store`, data);
    }

}
