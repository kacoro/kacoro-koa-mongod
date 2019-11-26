import React, { Component } from 'react';
import { Link } from "react-router-dom";

import BasePage from '@app/components/BasePage';
import Meta from "@app/components/Meta.tsx";
import { Flex, FlexItem } from '@app/UI/Layout';
import classnames from 'classnames'
import dayjs from 'dayjs'
import Styles from '@app/UI/Styles'

import Button from '@app/UI/Buttons';
import Editor from '@app/UI/Editor';
import {handleGet,handlePut} from '@app/redux/action'

class Index extends BasePage {
  constructor(props) {
    super(props);
    this.state = { text: '' }
  }

  handleChange = (value) => {
    var data = Object.assign(this.state.data,{content:value})
    this.setState({ text: value })
  }
  async componentDidMount() {
    console.log(this.props.match.params.id)
    const res = await handleGet.bind(this)({url:`admin/news/${ this.props.match.params.id}`});
    if(res){
      console.log(res)
      this.setState({ data: res.data.data })
    }
    
  }

  async UNSAFE_componentWillMount() {


  
  }
  componentWillReceiveProps = async (nextProps) => {

  
  }
  getCurrentPage = async (currentPage) => {
    this.props.history.push({
      pathname: `/admin/news/${currentPage}`
    });
  }
  changeRouter = () => {

  }
  save = async() =>{
    const res = await handlePut.bind(this)({url:`admin/news/${ this.props.match.params.id}`,data:this.state.data});
    // if(res){
    //   this.setState({ data: res.data })
    // } 
  }
  render() {
    const { data } = this.state
    if (!data) {
      return <div className="main-content-wrap">loading</div>
    }
    const { title, content, addTime, updateTime, keywords, description, cate_name } = data
    return (
      <article className="post">
        <Meta title={title} keywords={keywords} desc={description} ></Meta>
        <div className="post-header main-content-wrap text-left">
          <h1>{title}</h1>
          <Flex  >
            <FlexItem align="baseline" className={classnames('post-meta', Styles['pr-10'])}>
              <time>{dayjs(addTime).format('YYYY-MM-DD ')}</time>发布在：<Link className={classnames(Styles.textLink)} to="/admin/news">新闻</Link> / <Link className='categorLink' to={`/admin/news?catename=${cate_name}`}>{cate_name}</Link>
            </FlexItem>
          </Flex>
        </div>
        <div className="post-content markdown main-content-wrap">
          <Editor content={content} onChange={this.handleChange}/>
          {/* <div className={classnames(Styles['py-10'], Styles['text-pre'])} dangerouslySetInnerHTML={{ __html: content }} /> */}
          <div  className={classnames( Styles['mt-10'])}>
            
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