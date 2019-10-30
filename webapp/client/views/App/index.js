import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect
} from "react-router-dom";

import  {Hello}  from "@app/components/Hello.tsx";
console.log(Hello)
class App extends Component {
  render() {
    return (
      <div className="App">
          <Hello compiler="TypeScript" framework="React" />
          App5: 如果有每个页面都需要展示的东西，例如自定义的title导航栏
          {this.props.children}
      </div>
    );
  }
}

export default App;