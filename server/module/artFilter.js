const defaults = require('art-template/lib/defaults'),
moment = require("moment"),
quillRender = require('render-quill')

/**
 * 
 * case:
 * {{ addTime | dateFormat 'YYYY-MM-DD HH:mm:ss'}}
 * {{ $value.note | slice 60}}
 */
//封装art-template的过滤器
class ArtFilter{
    static getInstance(){  //单例 多次实例化，实例不共享的问题
        if(!ArtFilter.instance){
            ArtFilter.instance = new ArtFilter()
        }
        return Db.instance
    }
    constructor(){
        this.dbClient='' //属性 放DBClient
        this.imports()
    }
    imports(){
        const that = this
        defaults.imports.dateFormat = function(date, fmt){ 
            return moment(date).format(fmt);   
        };
        defaults.imports.slice = function(str,length){ 
          if(str.length>length){
            //   console.log(`${str}`)
            return str.replace(/\ +/g,"").replace(/[\r\n]/g,"").slice(0,length) + '...'
          }
          return str;   
        };
       
    }
    
   
}



 async function quill(content){
        return   quillRender(JSON.parse(content)).then(function(val) {
            return val;
        });
}





module.exports = ArtFilter;