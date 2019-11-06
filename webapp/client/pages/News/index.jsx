import React, { Component } from 'react';
import { Link } from "react-router-dom";
import getData from '@app/common/getData';
import BasePage from '@app/components/BasePage';
import Pagination from '@app/UI/Pagination';
import qs from 'qs';
import dayjs from 'dayjs'
import { Flex, FlexItem } from '@app/UI/Layout';
import classnames from 'classnames'
class Index extends BasePage {
  constructor(props, context) {
    super(props, context);
    // console.log(this.state)
    this.getCurrentPage = this.getCurrentPage.bind(this)
  }

  //数据预取方法 静态 异步 方法
  static async getInitialProps(opt) {
    const { search, params } = opt
    var url = "news"
    if (JSON.stringify(params) !== "{}") url += '/' + params.id
    if (search) url += search

    const res = await getData(url);
    return { data: res.data }
  }

  async componentDidMount() {
    // let checkInit = JSON.stringify(this.props.initialData) === "{}"
    // console.log(checkInit)
    const { location } = this.props

    console.log("Mount", this.isSSR, this.hasSpaCacheData)
    if (!this.isSSR && !this.hasSpaCacheData) { //非服务端渲染需要自身进行数据获取
      const res = await Index.getInitialProps({ params: this.props.match.params, search: location.search })
      this.setState({
        data: res.data
      })
    }

  }

  async UNSAFE_componentWillMount() {
    // this.setState({ user: await getData('/') });
  }

  changeRouter = async(search) => {

    // this.props.history.push({
    //   pathname: path
    // });
    this.props.history.replace(`/news${search}`)
    const res = await Index.getInitialProps({ params: this.props.match.params, search: search })
    this.setState({
      data: res.data
    })
  }
  componentWillReceiveProps = async(nextProps) => {
    if (this.props.history.location !== this.props.location) {
      const res = await Index.getInitialProps({ params: this.props.match.params, search: this.props.history.location.search })
      this.setState({
        data: res.data
      })
    }
  }
  async getCurrentPage(currentPage) {
    // console.log(this, this.props)
    const { location } = this.props;
    var obj = qs.parse(location.search.replace('?', ''));
    console.log(obj)
    var obj = Object.assign(obj, { page: currentPage })

    // this.props.history.replace(`/news?${qs.stringify(obj)}`)
    // const res = await Index.getInitialProps({ params: this.props.match.params, search:`?`+ qs.stringify(obj) })
    // this.setState({
    //   data: res.data
    // })
    this.props.history.push(`/news?${qs.stringify(obj)}`)

  }
  render() {

    if (!this.state) {
      return (<div>news1</div>)
    }
    const { data } = this.state;
    if (!data) {
      return (<div>news2</div>)
    }
    if (!data.list) {
      return (<div>news2</div>)
    }
    
    const listItems = data.list.map((item, index) =>
    <article className="postShorten">
     <div className="post-header text-left" key={index} >
         <h1>{item.title}</h1>
          <Flex  >
            <FlexItem align="baseline" className={classnames('post-meta')}>
              <time>{dayjs(item.addTime).format('YYYY-MM-DD ')}</time>发布在：
              <Link className="postShorten-excerpt_link link" to={`/news`}>新闻</Link>
              <Link className="postShorten-excerpt_link link" to={`/news?catename=${item.cate_name}`}>{item.cate_name}</Link>
              {/* <a onClick={this.changeRouter.bind(this,``)} className='categorLink' to="">新闻</a>
               / 
              < a className='categorLink'  onClick={this.changeRouter.bind(this,`?catename=${item.cate_name}`)}>{item.cate_name}</a> */}
            </FlexItem>
          </Flex>
          <div className="postShorten-excerpt">
            <div className="text-break">{item.note}</div>
            <Link className="postShorten-excerpt_link link" to={`/news/${item._id}`}>阅读全文</Link>
          </div>
        </div>
        </article>
    );
    return (
      <section className="postShorten-group main-content-wrap">
       
        {listItems}
        <Pagination data={data.pagination} onItemClick={this.getCurrentPage} location={this.props.location}/>
      </section>
    );
  }
}

export default Index;