import qs from 'qs';
import axios from 'axios';
import isNode from 'isnode';
import config from '../config'
// axios.defaults.withCredentials=true
const {localhost,localport,prdhost,prdport} = config

class Request {
    constructor() {
        this.base = {
            type: 'get',
            meta: isNode ? `${localhost}:${localport}` :`${prdhost}:${prdport}`
        };
        this.options = {
            url: null,
            params: null,
            data: null
        };
    }
    config(obj) {
        this.options = Object.assign(this.options,obj);
        // console.log(obj.url)
        return this.run();
    }
    setConfig(type) {
       
        return {
            method: type || this.base.type,
            // url: this.base.meta + this.options.url,
            url: this.base.meta + this.options.url,
            params: this.options.params || {}, // Get的参数
            data: this.options.data ? (this.options.data.constructor === FormData ? this.options.data : qs.stringify(this.options.data)) : {}, // Post的参数
        };
    }
    run() {
        if(this.options.token){//服务端处理token
            axios.interceptors.request.use(
                config => {
                  config.headers.Authorization = this.options.token
                  return config
                },
                err => {
                  return Promise.reject(err)
                }
            )
        }else{// 客户端自动处理token
            axios.interceptors.request.use(
                config => {
                    if(typeof localStorage=='object'){
                        var user =  JSON.parse(localStorage.getItem('persist:root')).user
                        if(user){
                            user = JSON.parse(user)
                            if(user) config.headers.Authorization = user.token
                        }
                    }
                    return config
                },
                err => {
                    return Promise.reject(err)
                }
            )
        }
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
