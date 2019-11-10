import React from 'react';
import './index.scss';
import request from '@app/common/request';
import {
    Link
  } from "react-router-dom";
import Signin from '@app/components/Signin'
export default class Index extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        return <Signin {...this.props}/>
    }
}