import React, { Component } from 'react';

const WindowsInitDataKey ='_initialData_';
class BasePage extends Component {
  constructor(props) {
    super(props);
    console.log('base constructor');
    this.state = this.getInitialData(props)
    console.log('this.isssr', this.isSSR);
}

  
    //获得初始化数据 有数据则表示为服务端渲染
    getInitialData = (props) => {
      console.log(props)
      const contextData = props.context 
      const initPath = props.initPath
      console.log(initPath)
      this.isSSR = false;
      this.hasSpaCacheData = false;//单页数据是否保存
      // 根据入口的url和当前的url判断。是否一直

      if (contextData) {
          this.isSSR = true;//表示服务端渲染的首屏
          return contextData;
      }else{
          if(__CLIENT__){
              
              return props.initialData;
          }
          return null;
      }
  }
  componentDidMount(){
      console.log('father did mount');
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