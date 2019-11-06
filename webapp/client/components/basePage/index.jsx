import React, { Component } from 'react';

const WindowsInitDataKey ='_initialData_';
class BasePage extends Component {
  constructor(props) {
    super(props);
    this.state = this.getInitialData(props)
}
    //获得初始化数据 有数据则表示为服务端渲染
    getInitialData = (props) => {
      console.log('init')
      const initPath = props.initPath
     const {context,location,initialData} = props
      this.isSSR = false;
      this.hasSpaCacheData = false;//单页数据是否保存
      // 根据入口的url和当前的url判断。是否一直

      if (context) {
          this.isSSR = true;//表示服务端渲染的首屏
          return context;
      }else{
          if(__CLIENT__){
            if(location.pathname+location.search ===this.props.initPath &&JSON.stringify(initialData) !== "{}"){
                this.hasSpaCacheData=true;
                return initialData
            }
            
            return {};
          }
          return null;
      }
  }
 
  async UNSAFE_componentWillUnmount(){
    //组件销毁前
    console.log('unmount');
    console.log(this.isSSR);
    if (!this.isSSR && this.enableSpaDataCache){
        let url =this.props.match.url;

        if (!window[WindowsInitDataKey]) window[WindowsInitDataKey]={};
        
        window[WindowsInitDataKey][url]={
            ...this.state
        }
        
    }
}
  
  
}

export default BasePage;