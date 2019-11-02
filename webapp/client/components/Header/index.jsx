import React, { Component } from 'react';
import classnames from 'classnames';

import Signin from './Signin';
import styles from './index.scss';
class Index extends Component {
  constructor(props) {
    super(props);
     this.state = {
        showModal: false
    };
    
  }
 
  render() {
   
    return (
      <div>
          <Signin {...this.props} />
      </div>
    );
  }
}

export default Index;