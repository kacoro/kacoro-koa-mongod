import React, { Component } from 'react';
import {Link} from "react-router-dom";
import getData from '@app/common/getData';
class Index extends Component {
  constructor(props) {
    super(props);
     console.log("super",this.props)
      this.state = props.context || props.initialData
     

    // console.log(this.state)
  }
  //数据预取方法 静态 异步 方法
  static  async getInitialProps() {
    const data = await getData("news");
  
    return {data}
  }
  
  async componentDidMount() {
    let checkInit = JSON.stringify(this.props.initialData) === "{}"
    console.log(checkInit)
    if (checkInit) { //非服务端渲染需要自身进行数据获取
      
     const data = await Index.getInitialProps()
    
        this.setState({
        ...data
        })
      
    }
  }

  async UNSAFE_componentWillMount () {
    // this.setState({ user: await getData('/') });
  }
  
  changeRouter = () => {
    
   
  }
  render() {
    console.log('detail')
   
    return (
      <div>
        <p  onClick={this.changeRouter}>detail</p>
       
      </div>
    );
  }
}

export default Index;