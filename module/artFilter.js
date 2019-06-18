const defaults = require('art-template/lib/defaults'),
moment = require("moment");
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
        defaults.imports.dateFormat = function(date, fmt){ 
            return moment(date).format(fmt);   
        };
        defaults.imports.slice = function(str,length){ 
          if(str.length>length){
            return str.slice(0,length) + '...'
          }
          return str;   
        };
    }
}





module.exports = ArtFilter;