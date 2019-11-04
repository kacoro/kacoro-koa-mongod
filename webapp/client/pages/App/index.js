import React, { Component } from 'react';
import  {Hello}  from "@app/components/Hello.tsx";
import  Header  from "@app/components/Header";
import  Meta  from "@app/components/Meta.tsx";
import {
  Link
} from "react-router-dom";
class App extends Component {
 
  render() {
 
    return (
      <div className="App">
          <Meta title="kacoro" keywords="kacoro,前端,网站,全栈,网页设计,kacoro博客,陈卫杰,Kacoro's blog" desc="Kacoro's blog" />
          <Header {...this.props} />
          <Hello compiler="TypeScript" framework="React" />
          App6: 如果有每个页面都需要展示的东西，例如自定义的title导航栏
          {this.props.children}
      </div>
    );
  }
}

export default App;