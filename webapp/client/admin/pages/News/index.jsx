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
import {handleGet,handleDelete} from '@app/redux/action'
import Button from '@app/UI/Buttons';
import Confirm from '@app/UI/Modal/confirm'
class Index extends BasePage {
  constructor(props, context) {
    super(props, context);
    this.getCurrentPage = this.getCurrentPage.bind(this)
  }

 
  async componentDidMount() {
    // let checkInit = JSON.stringify(this.props.initialData) === "{}"
    const { location,user } = this.props
      const res = await handleGet.bind(this)({url:`admin/news${this.props.location.search}`})
      this.setState({
        data: res.data
      })
  }

  handleDelete =async(index)=>{
    
    let list = this.state.data.list
    const id = list[index]._id
    list.splice(index,1)
    const res = await handleDelete.bind(this)({url:`admin/news/${id}`})
    if(res){
      this.setState({data:{...this.state.data,list}})
      if(list.length<1){
        this.props.history.replace(this.props.location)
      }
    }
  }
  UNSAFE_componentWillReceiveProps = async(nextProps) => {
    if (nextProps.location !== this.props.location) {
   
      const res = await handleGet.bind(this)({url:`admin/news${nextProps.location.search}`})
      if(res){
        this.setState({
          data: res.data
        })
      }
      
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
    this.props.history.push(`/admin/news?${qs.stringify(obj)}`)

  }
  creatList(){
    const { data } = this.state;
    const listItems = data.list.map((item, index) =>
    <article className="postShorten" key={index} >
     <div className="post-header text-left" >
          <Flex  >
          <FlexItem >
          <h1>{item.title}</h1>
            </FlexItem>
            <FlexItem >
            <time>{dayjs(item.addTime).format('YYYY-MM-DD ')}</time>
            </FlexItem>
            <FlexItem  >
              <Link className="categorLink" to={`/admin/news`}>新闻</Link> /&nbsp;
              <Link className="categorLink" to={`/admin/news?catename=${item.cate_name}`}>{item.cate_name}</Link>
              {/* <a onClick={this.changeRouter.bind(this,``)} className='categorLink' to="">新闻</a>
               / 
              < a className='categorLink'  onClick={this.changeRouter.bind(this,`?catename=${item.cate_name}`)}>{item.cate_name}</a> */}
            </FlexItem>
            <FlexItem >
            <div className="text-break">{item.note}</div>
            </FlexItem>
            <FlexItem  >
              <Button type="link" color="primary"  to={`/admin/news/edit/${item._id}`}>编辑</Button>
              <Button type="link"  to={`/news/${item._id}`} target="_blank" >预览</Button>
              <Button  color="warning" onClick={this.handleDelete.bind(this,index)}>删除</Button>
            </FlexItem>
          </Flex>
          <div className="postShorten-excerpt">
            
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
    const { data } = this.state;
    if (!data) {
      return (<div className="postShorten-group main-content-wrap">loading...</div>)
    }
    if (!data.list) {
      return (<div className="postShorten-group main-content-wrap">loading...</div>)
    }
    
    return (
      <section className="postShorten-group main-content-wrap">
        <Button type="link" color="primary" to={`/admin/news/create`}>添加</Button>
        {this.creatList()}
        <Pagination className={classnames(Styles['my-20'])} data={data.pagination} onItemClick={this.getCurrentPage} location={this.props.location}/>
      </section>
    );
  }
}

export default Index;