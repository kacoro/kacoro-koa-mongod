import React, { Component } from 'react';
import { Link } from "react-router-dom";
import getData from '@app/common/getData';
import BasePage from '@app/components/BasePage';
import Pagination from '@app/UI/Pagination';
import qs from 'qs';
import dayjs from 'dayjs'
import { Flex, FlexItem } from '@app/UI/Layout';
import Styles from '@app/UI/Styles'
import classnames from 'classnames'
import http from '@app/redux/action'

class Index extends BasePage {
  constructor(props, context) {
    super(props, context);
    this.getCurrentPage = this.getCurrentPage.bind(this)
  }

  //数据预取方法 静态 异步 方法
  static async getInitialProps(opt) {
    const { search, params } = opt
    var url = "news"
    if (JSON.stringify(params) !== "{}") url += '/' + params.id
    if (search) url += search
    
    const res = await http.get({url,token:opt.token});
     return { data: res.data,pagination:res.pagination }
  }
  
  async componentDidMount() {
    // let checkInit = JSON.stringify(this.props.initialData) === "{}"
    const { location,user } = this.props
    if (!this.isSSR && !this.hasSpaCacheData) { //非服务端渲染需要自身进行数据获取
      const res = await Index.getInitialProps({ params: this.props.match.params, search: location.search })
      this.setState({
        data: res.data,
        pagination:res.pagination
      })
    }
  }

  async UNSAFE_componentWillMount() {
    // this.setState({ user: await getData('/') });
  }
  UNSAFE_componentWillReceiveProps = async(nextProps) => {
    if (this.props.history.location !== this.props.location) {
      const res = await Index.getInitialProps({ params: this.props.match.params, search: this.props.history.location.search })
      this.setState({
        data: res.data,
        pagination:res.pagination
      })
    }
  }
  async getCurrentPage(currentPage) {
    const { location } = this.props;
    var obj = qs.parse(location.search.replace('?', ''));
    var obj = Object.assign(obj, { page: currentPage })

    // this.props.history.replace(`/news?${qs.stringify(obj)}`)
    // const res = await Index.getInitialProps({ params: this.props.match.params, search:`?`+ qs.stringify(obj) })
    // this.setState({
    //   data: res.data
    // })
    this.props.history.push(`/news?${qs.stringify(obj)}`)

  }
  creatList(){
    const { data } = this.state;
    const listItems = data.map((item, index) =>
    <article className="postShorten" key={index} >
     <div className="post-header text-left" >
         <h1>{item.title}</h1>
          <Flex  >
            <FlexItem align="baseline" className={classnames('post-meta')}>
              <time>{dayjs(item.addTime).format('YYYY-MM-DD ')}</time>
              <Link className="categorLink" to={`/news`}>新闻</Link> /&nbsp;
              <Link className="categorLink" to={`/news?catename=${item.cate_name}`}>{item.cate_name}</Link>
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
      return  listItems
  }
  render() {

    if (!this.state) {
      return (<div className="postShorten-group main-content-wrap">loading...</div>)
    }
    const { data,pagination } = this.state;
    if (!data) {
      return (<div className="postShorten-group main-content-wrap">loading...</div>)
    }
   
    
    return (
      <section className="postShorten-group main-content-wrap">
        {this.creatList()}
        <Pagination className={classnames(Styles['my-20'])} data={pagination} onItemClick={this.getCurrentPage} location={this.props.location}/>
      </section>
    );
  }
}

export default Index;