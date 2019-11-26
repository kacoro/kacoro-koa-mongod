import React from 'react';
import './index.scss';
import request from '@app/common/request';
import {
    Link,withRouter
  } from "react-router-dom";
  import reduxTypes from '@app/redux/types';
 class Index extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            username: '', //账号
            password: '' // 密码
        }
        this.handleInputChange = this.handleInputChange.bind(this);
    }
    
     handleLogin=async()=>{
        const {password,username} = this.state
        if(password!="" && username!=""){
         
            let { from } = this.props.location.state || { from: { pathname: "/" } };
            var res = await request.config({type:'post', url: '/api/signin' ,data:{username,password}})
            if(res.data){
                await this.props.dispatch({
                    type: reduxTypes.USER_LOGIN,payload:res
                   });
                   this.props.history.replace(from)
            }
        }
    }
    componentDidMount(){
        console.log(this.props)
    }
    handleInputChange(e){
        const target = e.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
        this.setState({
            [name]: value
        });
    }
    changeRouter = () => {
        this.props.history.push({
          pathname: '/signup'
        });
      }
    render(){
        return <div className="login-layout">
            <form>
            <div>
            用户：<input type="text" name="username" value={this.state.value} onChange={this.handleInputChange}></input>
            </div>
           <div>
           密码：<input type="password" name="password" value={this.state.password} onChange={this.handleInputChange}></input>
           </div>
            <div>
                <button type="button" onClick={this.handleLogin}>登 录</button>
            </div>
            </form>
            {/* <button onClick={this.changeRouter}>注 册</button>
            <Link to="/signup">注 册</Link> */}
        </div>
    }
}
export default withRouter(Index)