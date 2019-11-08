import React from 'react';
import './index.scss';
import request from '@app/common/request';
import Modal from '@app/UI/Modal';
import { Input } from '@app/UI/Form';

import { Flex,FlexItem } from '@app/UI/Layout';
import styles from '@app/UI/Styles/index.scss';
import Button from '@app/UI/Buttons';
import reduxTypes from '@app/redux/types';

import {
  Link, withRouter
} from "react-router-dom";

class Index extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '', //账号
      password: '', // 密码
      showModal: false
    }
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleOpenModal = this.handleOpenModal.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
  }
  handleOpenModal() {
    this.setState({ showModal: true });
  }

  handleCloseModal() {
    this.setState({ showModal: false });
  }
  handleLogin = async () => {
    console.log(this.props)
    const { password, username } = this.state
    if (password == "" || username == "") return false
      var data = await request.config({ type: 'post', url: '/api/signin', data: { username, password } })
      if(data){
        console.log(this.props.dispatch)
        this.props.dispatch({
          type: reduxTypes.USER_LOGIN,payload:data
         });
        this.handleCloseModal()
      }
    console.log(data)
  }
  handleInputChange(e) {
    const target = e.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;
    this.setState({
      [name]: value
    });
  }
  changeRouter = () => {
    console.log(this.props)
    this.handleCloseModal()
    this.props.history.push({
      pathname: '/signup'
    });
  }
  render() {
    return <div className="login-layout">
      <Button color="primary" onClick={this.handleOpenModal}>登录</Button>
      <Modal
        {...this.props}
        isOpen={this.state.showModal}
        contentLabel="Minimal Modal Example"
        onIconClose={this.handleCloseModal}
        // onRequestClose={this.handleCloseModal}
      >
      
          <Flex align="center" className={styles['pb-15']}>
            <label>用户：</label>
            <FlexItem flex="auto">
                <Input type="text" name="username" value={this.state.value} onChange={this.handleInputChange}></Input>
            </FlexItem>
            
          </Flex>
          <Flex align="center" className={styles['pb-15']}>
            密码：<FlexItem flex="auto">
            <Input type="password" name="password" value={this.state.password} onChange={this.handleInputChange}></Input>
            </FlexItem>
          </Flex>
          <Flex  align="center" justify="center">
          {/* <Button type="text" onClick={this.changeRouter}>忘记密码</Button>
          <Button type="text" onClick={this.changeRouter}>注 册</Button> */}
            <Button color="primary" onClick={this.handleLogin}>登 录</Button>
          
          </Flex>
          <Flex  align="center" justify="center">
            
          </Flex>
      </Modal>
    </div>
  }
}
export default withRouter(Index)