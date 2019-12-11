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
// import Upload from '@app/UI/Upload/noSSR';
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
        title: '',
        content: '',
        keywords: '',
        addTime: new Date(),
        cate_name: "",
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
    const type = target.typ
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
    //获取分类信息
   
    const res = await http.get.bind(this)({ url: `admin/newscate?size=20` });
    if (res) {
      const data = res.data
      this.setState({ cateList: data, data: Object.assign(this.state.data, { cate_id: data[0]._id, cate_name: data[0].name }) })

    }
    if (!this.state.isNew) {
      const res = await http.get.bind(this)({ url: `admin/news/${this.state.id}` });
      if (res) {
        const { title, content, addTime, updateTime, keywords, description, cate_name } = res.data.data
        // this.setState({ content, title, keywords, description, cate_name, addTime, updateTime })
        this.setState({ data: res.data.data })
      }
    }

  }

  async UNSAFE_componentWillMount() {

  }
  UNSAFE_componentWillReceiveProps = async (nextProps) => {


  }
  getCurrentPage = async (currentPage) => {
    this.props.history.push({
      pathname: `/admin/news/${currentPage}`
    });
  }
  changeRouter = () => {

  }
  /*处理图片插入*/
  imageHandler = ({ url }) => {
    this.setState({data:{...this.state.data, cover: url} })
  }
  save = async () => {

    if (this.state.isNew) {
      const res = await http.post.bind(this)({ url: `admin/news`, data: this.state.data });
      if (res) {
        this.props.history.goBack()
      }
    } else {
      const res = await http.put.bind(this)({ url: `admin/news/${this.props.match.params.id}`, data: this.state.data });
      if (res) {
        this.props.history.goBack()
      }
    }
  }
  render() {

    const { cateList, data, id } = this.state
    const { title, content, addTime, cate_name, keywords, description, cate_id,cover } = data
    return (
      <article className="post">
        <div className="post-header main-content-wrap text-left">
          <h1>
            <Input placeholder="请输入标题" type="text" name="title" value={title} onChange={this.handleInputChange} autoComplete="off"></Input>
          </h1>
          <Input className={classnames(Styles['mt-20'])}
            name="keywords"
            id="keywords"
            placeholder="关键字以英文逗号分隔"
            autoComplete="off"
            onChange={this.handleInputChange}
            value={keywords}
          />
          <Textarea className={classnames(Styles['mt-20'])} name="description" id="description" placeholder="描述不要超过255字" value={description} onChange={this.handleInputChange}></Textarea>
          <Select data={cateList} defaultValue={cate_id} value={cate_id} name="cate_id" returntext="cate_name" onChange={this.handleInputChange} className={classnames(Styles['mt-20'])} id='category' />
          {/* <Upload onChange={this.imageHandler} className={classnames(Styles['mt-20'])} preview={cover} /> */}
        </div>
        <div className={classnames("post-content markdown main-content-wrap")}  >
          <div className={classnames(Styles['mt-20'])}>
            <Editor content={content} onChange={this.handleChange} dispatch={this.props.dispatch} />
          </div>
          <label><Checkbox name="status" className={classnames(Styles['mt-20'])} onChange={this.handleInputChange} />启用</label>
          {/* <div className={classnames(Styles['py-10'], Styles['text-pre'])} dangerouslySetInnerHTML={{ __html: content }} /> */}
          <div className={classnames(Styles['mt-20'])}>

            <Button onClick={this.save}>保存</Button>
            {/* <PrevNext justify="between" prev={prev} next={next} onItemClick={this.getCurrentPage} className={classnames(Styles['my-20'])} ></PrevNext> */}
            {/* <Comments id={this.props.match.params.id} {...this.props} className={classnames(Styles['my-20'])}></Comments> */}
          </div>
        </div>
      </article>
    );
  }
}

export default Index;