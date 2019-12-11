import React, { Component } from 'react';
import { Link } from "react-router-dom";
import BasePage from '@app/components/BasePage';
import Pagination from '@app/UI/Pagination';
import qs from 'qs';
import dayjs from 'dayjs'
import { Flex, FlexItem } from '@app/UI/Layout';
import Styles from '@app/UI/Styles'
import classnames from 'classnames'
import http from '@app/redux/action'
import Button from '@app/UI/Buttons';
class Index extends Component {
  constructor(props, context) {
    super(props, context);
    this.getCurrentPage = this.getCurrentPage.bind(this)
  }
  async componentDidMount() {
    // let checkInit = JSON.stringify(this.props.initialData) === "{}"
      const res = await http.get.bind(this)({url:`admin/news${this.props.location.search}`})
      this.setState({
        data: res.data,
        pagination: res.pagination
      })
  }

  handleDelete =async(index)=>{
    
    let list = this.state.data
    const id = list[index]._id
    list.splice(index,1)
    const res = await http.delete.bind(this)({url:`admin/news/${id}`})
    if(res){
      this.setState({data:list})
      if(list.length<1){
        this.props.history.replace(this.props.location)
      }
    }
  }
  UNSAFE_componentWillReceiveProps = async(nextProps) => {
    if (nextProps.location !== this.props.location) {
      const res = await http.get.bind(this)({url:`admin/news${nextProps.location.search}`})
      if(res){
        this.setState({
          data: res.data,
          pagination:res.pagination
        })
      }
    }
  }
  async getCurrentPage(currentPage) {
    const { location } = this.props;
    var obj = qs.parse(location.search.replace('?', ''));
    var obj = Object.assign(obj, { page: currentPage })
    this.props.history.push(`/admin/news?${qs.stringify(obj)}`)

  }
  creatList(){
    const { data,pagination } = this.state;
    const listItems = data.map((item, index) =>
        <tr key={index+(pagination.page-1)*10+1}>
        
          <td>{index+(pagination.page-1)*10+1}</td>
          <td><img width="100px" height="100px" src={item.cover} /></td>
          <td><Link to={`/admin/news/edit/${item._id}`}>{item.title}</Link></td>
          <td> 
              <Link className="categorLink" to={`/admin/news?catename=${item.cate_name}`}>{item.cate_name}</Link></td>
         
          <td className="hidden-xs">{dayjs(item.addTime).format('YYYY-MM-DD ')}</td>
          <td className="hidden-xs">{item.status?'是':'否'}</td>
          <td>
        
             <Button type="link"  to={`/news/${item._id}`} target="_blank" >预览</Button>
             <Button  color="warning" onClick={this.handleDelete.bind(this,index)}>删除</Button>
          </td>
        </tr>
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
        <Button type="link" color="primary" to={`/admin/news/create`}>添加</Button>
        <table className="table table-striped">
        <thead>
          <tr>
            <th>#</th>
            <th width="100px">封面</th>
            <th width="200px">标题</th>
            <th>分类</th>
            <th >发布时间</th>
            <th >状态</th>
            <th style={{textAlign:'center'}} >操作</th>
          </tr>
        </thead>
        <tbody>
        {this.creatList()}
        </tbody>
        </table>
        <Pagination className={classnames(Styles['my-20'])} data={pagination} onItemClick={this.getCurrentPage} location={this.props.location}/>
      </section>
    );
  }
}

export default Index;