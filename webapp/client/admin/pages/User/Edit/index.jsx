import React, { Component } from 'react';
import { Link } from "react-router-dom";

import BasePage from '@app/components/BasePage';
import Meta from "@app/components/Meta.tsx";
import { Flex, FlexItem } from '@app/UI/Layout';
import classnames from 'classnames'
import dayjs from 'dayjs'
import Styles from '@app/UI/Styles'
import { Input, Textarea, Select, Checkbox } from '@app/UI/Form';

import Button from '@app/UI/Buttons';
import Editor from '@app/UI/Editor/noSSR';
import http from '@app/redux/action'
import Upload from '@app/UI/Upload/noSSR';
class Index extends Component {
  constructor(props) {
    super(props);
    const { match: { params: { id } } } = this.props;
    this.state = {
      text: '',
      id,
      isNew: !id,

      cateList: [],
      data: {
        content: '',
        keywords: '',
        description:'',
        addTime: new Date(),
        age: 12,
        avatar: "",
        email: "admin@kacoro.com",
        nickname: "kacoro",
        // password: "",
        sex: "男",
        status: 0,
        username: "admin@kacoro.com",
        website: "kacoro.com"
      },
      fields: {
        _id: { label: "ID" },
        name: { lable: "名称" },
        cover: { label: "封面图" }
      }
    }
    // this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleChange = (value) => {
    var data = Object.assign(this.state.data, { content: value })
    this.setState({ data: data })
  }
  handleInputChange = (e) => {
    const target = e.target;
    const type = target.type;
    const value = type === 'checkbox' ? target.checked : target.value;
    // const value =  target.value;
    const name = target.name;
    if (target.type === 'select-one') {
      const returnText = target.attributes.returntext.nodeValue
      const text = target.options[target.selectedIndex].text
      var data = Object.assign(this.state.data, { [name]: value, [returnText]: text })
    } else {
      var data = Object.assign(this.state.data, { [name]: value })
    }
    this.setState({
      data: data
    });
  }
  async componentDidMount() {
   
    if (!this.state.isNew) {
      const res = await http.get.bind(this)({ url: `admin/user/${this.state.id}` });
      if (res) {
        this.setState({ data: res.data })
      }
    }

  }

  getCurrentPage = async (currentPage) => {
    this.props.history.push({
      pathname: `/admin/user/${currentPage}`
    });
  }
  changeRouter = () => {

  }
  /*处理图片插入*/
  imageHandler = ({ url }) => {
    this.setState({ data: { ...this.state.data, avatar: url } })
  }
  save = async () => {
    if (this.state.isNew) {
      const res = await http.post.bind(this)({ url: `admin/user`, data: this.state.data });
      if (res) {
        this.props.history.goBack()
      }
    } else {
      const res = await http.put.bind(this)({ url: `admin/user/${this.props.match.params.id}`, data: this.state.data });
      if (res) {
        this.props.history.goBack()
      }
    }
  }
  render() {
    const { cateList, data, id } = this.state
    const { nickname,username, website,content, sort, avatar, keywords, description,  cover, status = false } = data
    return (
      <article className="post">
        <div className="post-header main-content-wrap text-left">
          <Flex>
            <FlexItem style={{ flex: ' 0 0 80px', textAlign: 'right' }}>
              <label htmlFor="nickname" >名称： </label>
            </FlexItem>
            <FlexItem flex="auto">
              <Input id="nickname" placeholder="请输入昵称" type="text" name="nickname" value={nickname} onChange={this.handleInputChange} autoComplete="off"></Input>
            </FlexItem>
          </Flex>
          <Flex className={classnames(Styles['mt-20'])}>
            <FlexItem style={{ flex: ' 0 0 80px', textAlign: 'right' }}>
              <label htmlFor="username" >用户名： </label>
            </FlexItem>
            <FlexItem flex="auto">
              <Input id="username" placeholder="请输入昵称" type="text" name="username" value={username} onChange={this.handleInputChange} autoComplete="off"></Input>
            </FlexItem>
          </Flex>
          <Flex className={classnames(Styles['mt-20'])}>
            <FlexItem style={{ flex: ' 0 0 80px', textAlign: 'right' }}>
              <label htmlFor="website" >网站： </label>
            </FlexItem>
            <FlexItem flex="auto">
              <Input id="website" placeholder="请输入昵称" type="text" name="website" value={website} onChange={this.handleInputChange} autoComplete="off"></Input>
            </FlexItem>
          </Flex>
          <Flex className={classnames(Styles['mt-20'])}>
            <FlexItem style={{ flex: ' 0 0 80px', textAlign: 'right' }}>
              <label htmlFor="keywords" >关键字： </label>
            </FlexItem>
            <FlexItem flex="auto">
              <Input
                name="keywords"
                id="keywords"
                placeholder="关键字以英文逗号分隔"
                autoComplete="off"
                onChange={this.handleInputChange}
                value={keywords}
              />
            </FlexItem>
          </Flex>

          <Flex className={classnames(Styles['mt-20'])}>
            <FlexItem style={{ flex: ' 0 0 80px', textAlign: 'right' }}>
              <label htmlFor="description" >描述： </label>
            </FlexItem>
            <FlexItem flex="auto" >
              <Textarea name="description" id="description" placeholder="描述不要超过255字" value={description} onChange={this.handleInputChange}></Textarea>
            </FlexItem>
          </Flex>

          
          <Flex className={classnames(Styles['mt-20'])}>
            <FlexItem style={{ flex: ' 0 0 80px', textAlign: 'right' }}>
              <label htmlFor="avatar" >头像： </label>
            </FlexItem>
            <FlexItem flex="auto" >
              <Upload id="avatar" onChange={this.imageHandler} preview={avatar} />
            </FlexItem>
          </Flex>
          <Flex className={classnames(Styles['mt-20'])}>
            <FlexItem style={{ flex: ' 0 0 80px', textAlign: 'right' }}>
              <label htmlFor="content" >内容： </label>
            </FlexItem>
            <FlexItem flex="auto" >
              <Editor content={content} id="content" onChange={this.handleChange} dispatch={this.props.dispatch} />
            </FlexItem>
          </Flex>
          <Flex className={classnames(Styles['mt-20'])}>
            <FlexItem style={{ flex: ' 0 0 80px', textAlign: 'right' }}>
              <label htmlFor="status" >状态： </label>
            </FlexItem>
            <FlexItem flex="auto">
              <Input id="status" placeholder="请输入排序" type="text" name="status" value={status} onChange={this.handleInputChange} autoComplete="off"></Input>
            </FlexItem>
          </Flex>
         
          <Flex className={classnames(Styles['mt-20'])}>
            <FlexItem style={{ flex: ' 0 0 80px', textAlign: 'right' }}>
            </FlexItem>
            <FlexItem >
              <Button onClick={this.save}>保存</Button>
            </FlexItem>
          </Flex>
        </div>
      </article>
    );
  }
}

export default Index;