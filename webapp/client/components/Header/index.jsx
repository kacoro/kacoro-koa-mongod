import React, { Component } from 'react';
import classnames from 'classnames';


import styles from './index.scss';
import { Flex,FlexItem } from '@app/UI/Layout';
import reduxTypes from '@app/redux/types';
import Icon from '@app/UI/Icons';
class Index extends Component {
  constructor(props) {
    super(props);
     this.state = {
        showModal: false
    };
  }
  componentDidMount(){
   
  }
  changeMenu= () => {
    this.props.dispatch({
      type: reduxTypes.CHANGE_MENU
     });
  }
  render() {
    return (
      <div  data-pushed={this.props.menu}  className={classnames(styles.header,this.props.menu?styles.pushed:null)} >
        <div className={styles.content}>
        <div className={styles.left}>
        <Icon  className={classnames(styles.Close)} onClick={this.changeMenu} >menu</Icon>
        </div>
          <div className={styles.title}>
            <a className={styles.link} href="/">Kacoro 's blog</a>
          </div>
          <div className={styles.right}>
             {/* <Signin {...this.props} /> */}
          </div>
          </div>
      
      </div>
    );
  }
}

export default Index;