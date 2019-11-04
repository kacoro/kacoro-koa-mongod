import React, { Component } from 'react';
import {Link} from "react-router-dom";
import getData from '@app/common/getData';
import BasePage from '@app/components/BasePage';
class Index extends BasePage {
  constructor(props) {
    super(props);
    // console.log(this.state)
  }
  

  //数据预取方法 静态 异步 方法
  static  async getInitialProps(opt) {
    const res = await getData(`news/${opt.path}`);
    return {data:res.data}
  }
  
  async componentDidMount() {
    console.log()
    console.log(this)
    // let checkInit = JSON.stringify(this.props.initialData) === "{}"
    // console.log("detail",this.state)

   
    if (this.props.match.url!=this.props.initPath) { //非服务端渲染需要自身进行数据获取
     
     const res = await Index.getInitialProps({path:this.props.match.params.id})
        this.setState({data:res.data})
    }
  }

  async UNSAFE_componentWillMount () {

    
    // this.setState({ user: await getData('/') });
  }
  
  changeRouter = () => {
    
   
  }
  render() {
    console.log('detail')
    const {data} = this.state
    const {title,content} = data
    return (
      <div>
        <Link to="/news">新闻</Link>
        <h3>{title}</h3>
       <div dangerouslySetInnerHTML={{__html:content}} />
      </div>
    );
  }
}

export default Index;