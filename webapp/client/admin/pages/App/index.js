import React, { Component } from 'react';

import  Header  from "@app/admin/components/Header";
import  Nav  from "@app/admin/components/Nav";
import  Meta  from "@app/components/Meta.tsx";
import classnames from 'classnames'
import  "@app/UI/Styles/Global";
import Styles  from './index.scss'
import {
  Link
} from "react-router-dom";
class App extends Component {
  
  render() {
    const match = this.props.location.pathname.match('/admin')
    if(match && match.index===0){
      return (
        <div className={classnames(Styles.App)} data-pushed={this.props.menu}>
            <Meta title="后台管理系统" keywords="kacoro,前端,网站,全栈,网页设计,kacoro博客,陈卫杰,Kacoro's blog" desc="Kacoro's blog" />
            <Header {...this.props} />
            <Nav {...this.props} />
            <div className={classnames(Styles.main)} data-pushed={this.props.menu} data-behavior="1">
               {this.props.children}
            </div>
          
        </div>
      );
    }
    return null
    
  }
}

export default App;