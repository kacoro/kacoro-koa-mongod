import React, { Component } from 'react';
import {Link} from "react-router-dom";
import getData from '../../common/getData';
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
     console.log(data)
        this.setState({
        ...data
        })
      
    }
  }

  async UNSAFE_componentWillMount () {
    // this.setState({ user: await getData('/') });
  }
  
  changeRouter = () => {
    
    this.props.history.push({
      pathname: '/second',
      state: {
        text: 'from first'
      }
    });
  }
  render() {
    console.log('first',this.state)
    if(!this.state){
      return (<div>news1</div>)
    }
    const { data } = this.state;
    if(!data){
      return (<div>news2</div>)
    }
    const listItems = data.list.map((item,index) =>
    <div key={index} >
     
        <Link to={`/news/${item._id}`}>{item.title}</Link>
        <span>{item.addTime}</span>
        <p>{item.note}</p>
     </div>

    );
    return (
      <div>
        <p  onClick={this.changeRouter}>First</p>
         {listItems}
      </div>
    );
  }
}

export default Index;