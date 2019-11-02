import React from 'react';
import './index.scss';
import request from '@app/common/request';
export default class Index extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            username: '', //账号
            password: '' // 密码
        }
        this.handleInputChange = this.handleInputChange.bind(this);
    }
    
    handleSignUp=async(e)=>{
        console.log(this.state)
        const {password,username} = this.state
        if(password!="" && username!="")
        var data = await request.config({type:'post', url: '/api/signup' ,data:{username,password}})
        console.log(data)
    }
    handleInputChange(e){
        const target = e.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    }

    render(){
        return <div className="login-layout">
            用户：<input type="text" name="username" value={this.state.value} onChange={this.handleInputChange}></input>
            密码：<input type="password" name="password" value={this.state.password} onChange={this.handleInputChange}></input>
            <button type="button" onClick={this.handleSignUp}>注 册</button>
        </div>
    }
}