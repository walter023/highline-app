import axios from "axios";
import * as constans from "./constans";

const instance = axios.create({
  baseURL: constans.BASE_URL,
});
/*instance.interceptors.request.use(request => {
    const token = localStorage.getItem('token');    
    if (token) {
        request.headers.common['Authorization'] = 'Bearer ' + token;
    }
    return request
})*/
export default instance;
