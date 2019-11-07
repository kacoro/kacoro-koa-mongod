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
class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      buttons:[
        {href:'/',icon:'home',text:'首页'},
        {href:'/news',icon:'md-pricetags',text:'文章',type:"ion"},
        // {href:'/',icon:'archive',text:'归档'},
        {href:'/about',icon:'account_circle',text:'关于'},
        {href:'https://github.com/kacoro',target:"_blank",icon:'logo-github',text:'github',type:"ion"},
        {href:'https://facebook.com/kacorochan',target:"_blank",icon:'logo-facebook',text:'facebook',type:"ion"}
      ]
    };
  }
  
 componentDidMount(){
  Lazyload(this.refs)
 }
  creatButton(){
    let buttons = []
    console.log(this.props)
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
        <img className={styles.bg} ref="bg"  data-src={bg} />
          <div className={styles.container}>
            <div className={styles.profile}>
              <a href="/about">
                <img className={styles.picture} data-src={logo} ref="logo"  alt="kacoro's blog" />
              </a>
              <h4 className={styles.name}>kacoro</h4>
              <h5 className={styles.bio}>思考不止，生命不息.</h5>
            </div>
            <ul className="sidebar-buttons">
              {this.creatButton()}
            </ul>
          </div>
        </nav>
    );
  }
}

export default Index;