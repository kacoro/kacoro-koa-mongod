import React, { Component } from 'react';
import { Link } from "react-router-dom";
import getData from '@app/common/getData';
import BasePage from '@app/components/BasePage';
import Meta from "@app/components/Meta.tsx";
import PrevNext from '@app/UI/Pagination/PrevNext';
import { Flex, FlexItem } from '@app/UI/Layout';
import classnames from 'classnames'
import dayjs from 'dayjs'
import Styles from '@app/UI/Styles'
import PostStyles from './index.scss'
import Comments from '@app/components/Comments'
class Index extends BasePage {
  constructor(props) {
    super(props);
  }


  //数据预取方法 静态 异步 方法
  static async getInitialProps(opt) {
    const res = await getData(`news/${opt.params.id}`);
    return { data: res.data }
  }

  async componentDidMount() {
    // let checkInit = JSON.stringify(this.props.initialData) === "{}"
    if (!this.isSSR && !this.hasSpaCacheData) { //非服务端渲染需要自身进行数据获取
      const res = await Index.getInitialProps({ params: this.props.match.params })
      this.setState({ data: res.data })
    }
    if (window.hljs) { hljs.initHighlightingOnLoad() }
  }

 
  shouldComponentUpdate = async (nextProps) => {
      if(this.props.location!==nextProps.location){
       const res = await Index.getInitialProps({ params: nextProps.match.params })
        this.setState({
          data: res.data
        })
        return true
      }
  }

  getCurrentPage = async (currentPage) => {
    this.props.history.push({
      pathname: `/news/${currentPage}`
    });
  }
  changeRouter = () => {

  }
  render() {
    const { data } = this.state
    if (!data) {
      return <div className="main-content-wrap">loading</div>
    }
    const { prev, next } = data
    const { _id,title, content, addTime, updateTime, keywords, description, cate_name } = data.data
    return (
      <article className="post" >
        <Meta title={title} keywords={keywords} desc={description} >
          <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/9.12.0/styles/monokai-sublime.min.css" />
          <script src="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/9.12.0/highlight.min.js"></script>
        </Meta>
        <div className="post-header main-content-wrap text-left">
          <h1>{title}</h1>
          <Flex  >
            <FlexItem align="baseline" className={classnames('post-meta', Styles['pr-10'])}>
              <time>{dayjs(addTime).format('YYYY-MM-DD ')}</time>发布在：<Link className={classnames(Styles.textLink)} to="/news">新闻</Link> / <Link className='categorLink' to={`/news?catename=${cate_name}`}>{cate_name}</Link>
            </FlexItem>
          </Flex>
        </div>
        <div className="post-content markdown main-content-wrap">
          <div className={classnames(Styles['py-10'], Styles['text-pre'])} dangerouslySetInnerHTML={{ __html: content }} />
          <div >
            <PrevNext justify="between" prev={prev} next={next} onItemClick={this.getCurrentPage} className={classnames(Styles['my-20'])} ></PrevNext>
            <Comments id={this.props.match.params.id} {...this.props} className={classnames(Styles['my-20'])}></Comments>
          </div>
        </div>
      </article>
    );
  }
}

export default Index;