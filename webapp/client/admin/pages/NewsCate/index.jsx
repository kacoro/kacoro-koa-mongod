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
      const res = await http.get.bind(this)({url:`admin/newscate${this.props.location.search}`})
      this.setState({
        data: res.data,
        pagination: res.pagination
      })
  }

  handleDelete =async(index)=>{
    let list = this.state.data
    const id = list[index]._id
    list.splice(index,1)
    const res = await http.delete.bind(this)({url:`admin/newscate/${id}`})
    if(res){
      this.setState({data:list})
      if(list.length<1){
        this.props.history.replace(this.props.location)
      }
    }
  }
  shouldComponentUpdate = async(nextProps) => {
    if (nextProps.location !== this.props.location) {
      const res = await http.get.bind(this)({url:`admin/newscate${nextProps.location.search}`})
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
    this.props.history.push(`/admin/newscate?${qs.stringify(obj)}`)
  }
  creatList(){
    const { data,pagination } = this.state;
    const listItems = data.map((item, index) =>
        <tr key={index+(pagination.page-1)*10+1}>
          <td>{index+(pagination.page-1)*10+1}</td>
         
          <td><Link to={`/admin/newscate/edit/${item._id}`}>{item.name}</Link></td>
  <td>{item.sort}</td>
          <td> 
            {item.note}</td>
          <td className="hidden-xs">{dayjs(item.addTime).format('YYYY-MM-DD ')}</td>
          <td className="hidden-xs">{item.status?'是':'否'}</td>
          <td>
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
      <section className="postShorten-group main-content-wrap" style={{maxWidth:'1920px'}}>
        <Button type="link" color="primary" to={`/admin/newscate/create`}>添加</Button>
        <table className="table table-striped">
        <thead>
          <tr>
            <th>#</th>
            
            <th width="200px">名称</th>
            <th width="200px">排序</th>
            <th>描述</th>
            <th >发布时间</th>
            <th >状态</th>
            <th style={{textAlign:'center'}} >操作</th>
          </tr>
        </thead>
        <tbody>
        {this.creatList()}
        </tbody>
        </table>
        {pagination&&<Pagination currentPage={pagination.page} groupCount={5} startPage={pagination.page} totalPage={pagination.num} className={classnames(Styles['my-20'])}  onItemClick={this.getCurrentPage} location={this.props.location}/>}
      </section>
    );
  }
}

export default Index;