import React, { Component } from 'react';
import classnames from 'classnames';

import Signin from './Signin';
import styles from './index.scss';
import { Flex,FlexItem } from '@app/UI/Layout';
import Icon from '@app/UI/Icons';
class Index extends Component {
  constructor(props) {
    super(props);
     this.state = {
        showModal: false
    };
    
  }
 
  render() {
   
    return (
      <div id="header">
        <div className={styles.left}>
        <Icon  className={classnames(styles.Close)} onClick={this.props.onIconClose} >menu</Icon>
        </div>
          <div className="header-title">
            <a className="header-title-link" href="/">Kacoro 's blog</a>
          </div>
          <div className={styles.right}>
             <Signin {...this.props} />
          </div>
          
      
      </div>
    );
  }
}

export default Index;