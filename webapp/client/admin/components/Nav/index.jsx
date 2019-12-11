import React, { Component } from 'react';
import classnames from 'classnames';
import Button from '@app/UI/Buttons';
import styles from './index.scss';
import Icon from '@app/UI/Icons';
import Lazyload from '@app/components/Lazyload';
import {
  Link
} from "react-router-dom";
import { Flex,FlexItem } from '@app/UI/Layout';
import bg from '@app/assets/images/bg.jpg'
import logo from '@app/assets/images/logo.png'
import reduxTypes from '@app/redux/types';
class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      buttons:[
        {href:'/admin/',icon:'home',text:'首页'},
        {href:'/admin/news',icon:'md-pricetags',text:'文章管理',type:"ion"},
        {href:'/admin/comment',icon:'md-pricetags',text:'分类管理',type:"ion"},
        {href:'/admin/comments',icon:'md-pricetags',text:'评论管理',type:"ion"},
        {href:'/admin/users',icon:'md-pricetags',text:'用户管理',type:"ion"},
        // {href:'/',icon:'archive',text:'归档'},
        {href:'/admin/comment',icon:'account_circle',text:'系统管理'},
        
      ]
    };
  }
  handleLogout  = () => {
    this.props.dispatch({
        type: reduxTypes.USER_LOGOUT
    });
}
 componentDidMount(){
  Lazyload(this.refs)
 }
  creatButton(){
    let buttons = []
    this.state.buttons.map((item,i)=>{
      let flex = () =>{
        return (<Flex align="center">
        <Icon type={item.type} icon={item.icon} className={classnames(styles.icon)} onClick={this.props.onIconClose} ></Icon>
        <span className={styles.title}>{item.text}</span>
      </Flex>)
      }
     if(item.target){
      buttons.push(<a className={styles.button} target={item.target} href={item.href} key={i}  type="text" >
      {flex()}
    </a>)
     }else{
      buttons.push(<Link className={styles.button} to={item.href} key={i}  type="text" >
      {flex()}
    </Link>)
     }
     
    })
      
    return buttons
  }
  render() {
    return (
        <nav data-behavior="1" data-pushed={this.props.menu} className={classnames(styles.sidebar)} >
        <img className={styles.bg} ref="bg"  data-src={bg} src="data:image/gif;base64,R0lGODdhAQABAPAAAMPDwwAAACwAAAAAAQABAAACAkQBADs="  />
          <div className={styles.container}>
            <div className={styles.profile}>
              <a href="/about">
                <img className={styles.picture} data-src={logo} ref="logo" src="data:image/gif;base64,R0lGODdhAQABAPAAAMPDwwAAACwAAAAAAQABAAACAkQBADs=" alt="kacoro's blog" />
              </a>
             
            </div>
            <ul className="sidebar-buttons">
              {this.creatButton()}
              
            </ul>
            <Flex align="center" justify="center" ><a onClick={this.handleLogout}>退出</a></Flex>
          </div>
      
        </nav>
    );
  }
}

export default Index;