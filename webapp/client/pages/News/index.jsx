import React, { Component } from 'react';
import { Link } from "react-router-dom";
import getData from '@app/common/getData';
import BasePage from '@app/components/BasePage';
import Pagination from '@app/UI/Pagination';
import qs from 'qs';
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

  changeRouter = () => {

    this.props.history.push({
      pathname: '/second',
      state: {
        text: 'from first'
      }
    });
  }
  async getCurrentPage(currentPage) {
    console.log(this, this.props)
    const { location } = this.props;
    var obj = qs.parse(location.search.replace('?', ''));
    console.log(obj)
    var obj = Object.assign(obj, { page: currentPage })

    this.props.history.replace(`/news?${qs.stringify(obj)}`)
    const res = await Index.getInitialProps({ params: this.props.match.params, search: '?' + qs.stringify(obj) })
    this.setState({
      data: res.data
    })

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
      <div key={index} >

        <Link to={`/news/${item._id}`}>{item.title}</Link>
        <span>{item.addTime}</span>
        <p>{item.note}</p>
      </div>

    );
    return (
      <div>
        <p onClick={this.changeRouter}>First</p>
        {listItems}
        <Pagination data={data.pagination} onItemClick={this.getCurrentPage} />
      </div>
    );
  }
}

export default Index;