import React, { Component } from 'react';

import  Header  from "@app/components/Header";
import  Meta  from "@app/components/Meta.tsx";
import classnames from 'classnames'
import  Styles  from "@app/UI/Styles";
import {
  Link
} from "react-router-dom";
class App extends Component {
 
  render() {
 
    return (
      <div className={classnames(Styles.App)}>
          <Meta title="kacoro" keywords="kacoro,前端,网站,全栈,网页设计,kacoro博客,陈卫杰,Kacoro's blog" desc="Kacoro's blog" />
          <Header {...this.props} />
        
          {this.props.children}
      </div>
    );
  }
}

export default App;