import qs from 'qs';
import axios from 'axios';
import isNode from 'isnode';
import configureStore from '../redux/configureStore';
const { persistor, store } = configureStore()
import reduxTypes from '@app/redux/types';
import Alert from "@app/UI/alert";
axios.interceptors.request.use(
    config => {
        var user =  JSON.parse(localStorage.getItem('persist:root')).user
       
        if(user){
            user = JSON.parse(user)
            if(user) config.headers.Authorization = user.token
        }
      return config
    },
    err => {
      return Promise.reject(err)
    }
)
axios.interceptors.response.use(res=> {
  
    return res;
  }, err=> {
     if (err.response.status == 404) {
      
        
    }else {
       
    }
    return Promise.resolve(err);
  })
class Request {
    constructor() {
        this.base = {
            type: 'get',
            meta: isNode ? 'http://127.0.0.1:5200' : 'http://127.0.0.1:5200'
        };
        this.options = {
            url: null,
            params: null,
            data: null
        };
    }
    config(obj) {
        this.options = obj;
      
        return this.run();
    }
    setConfig(type) {
       
        return {
            method: type || this.base.type,
            url: this.base.meta + this.options.url,
            params: this.options.params || {}, // Get的参数
            data: this.options.data ? (this.options.data.constructor === FormData ? this.options.data : qs.stringify(this.options.data)) : {} // Post的参数
        };
    }
    run() {
        return new Promise((resolve, reject) => {
            axios
                .request(this.setConfig(this.options.type))
                .then(res => {
                    resolve(res.data);
                })
                .catch(res => {
                    reject(res);
                });
        });
    }
}
export default new Request();
