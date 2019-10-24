import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Button from '@material-ui/core/Button';
class App extends Component {
  render() {
    return (
      <div className="App">
          App: 如果有每个页面都需要展示的东西，例如自定义的title导航栏
          <ul>
            <li>
              <Link to="/">First</Link>
            </li>
            <li>
              <Link to="/second">Second</Link>
            </li>
            <li>
              <Link to="/third">Third</Link>
            </li>
          </ul>
          <Button variant="contained" color="primary">
            Hello World
          </Button>
          {this.props.children}
      </div>
    );
  }
}

export default App;