import React, { Component } from 'react';
import getData from '../../common/getData';
class First extends Component {
  constructor(props) {
    super(props);
     console.log("super",this.props)
      this.state = props.context || props.initialData
     

    // console.log(this.state)
  }
  //数据预取方法 静态 异步 方法
  static  async getInitialProps() {
    const user = await getData("/");
  
    return {user}
  }
  
  async componentDidMount() {
    if (!this.props.context) { //非服务端渲染需要自身进行数据获取
 
      Index.getInitialProps(this.props.krsOpt).then(data => {
       
        this.setState({
        
        ...data
        
        }, () => {
        
        //可有的一些操作
        
        });
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
    const { user } = this.state;
    return (
      <div>
        <p  onClick={this.changeRouter}>First</p>
        <p>{user && user.userId}</p>
                <p>{user && user.name}</p>
                <p>{user && user.gender}</p>
                <p>{user && user.age}</p>
      </div>
    );
  }
}

export default First;