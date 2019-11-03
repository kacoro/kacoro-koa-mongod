import request from './request';

async function getData(path) {
    var data = {};
        await request.config({ url: `/api/${path}` }).then(res => {
           data = res;
     });
     return data;
}
export const postData =  async (path,data) => {
    var data = {};
        await request.config({type:'post', url: `/api/${path}`,data:data }).then(res => {
           data = res;
     });
     return data;
}



export default getData;
