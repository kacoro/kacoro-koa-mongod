const quillRender = require('render-quill')
exports.quillRender =  async function quill(content){
    return  quillRender(JSON.parse(content)).then(function(result) {
        return result;
    });
}

exports.getPostData = function(ctx){
    //获取数据 异步
    return new Promise(function(resolve,reject){
        try{
            let str = '';
            ctx.req.on("data",function(chunk){
                str+=chunk;
            })
            ctx.req.on("end",function(chunk){
                resolve(str)
            })
        }catch(err){
            reject(err)
        }
    })
}

