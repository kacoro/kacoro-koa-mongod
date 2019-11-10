import React from 'react';
import './index.scss';
import Signup from '@app/components/Signup'
import request from '@app/common/request';
import {
    Link
  } from "react-router-dom";
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
        const {password,username} = this.state
        if(password!="" && username!="")
        var data = await request.config({type:'post', url: '/api/signup' ,data:{username,password}})
      
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
        return <Signup  {...this.props} />
    }
}