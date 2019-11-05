import React, { Component } from 'react';
import {Link} from "react-router-dom";
import getData from '@app/common/getData';
import BasePage from '@app/components/BasePage';
import  Meta  from "@app/components/Meta.tsx";
import PrevNext from '@app/UI/Pagination/PrevNext';
import { Flex,FlexItem } from '@app/UI/Layout';
import dayjs from 'dayjs'
class Index extends BasePage {
  constructor(props) {
    super(props);
    // console.log(this.state)
    this.getCurrentPage = this.getCurrentPage.bind(this)
  }
  

  //数据预取方法 静态 异步 方法
  static  async getInitialProps(opt) {
    const res = await getData(`news/${opt.params.id}`);
    return {data:res.data}
  }
  
  async componentDidMount() {
    // let checkInit = JSON.stringify(this.props.initialData) === "{}"
    // console.log("detail",this.state)

    console.log("Mount",this.isSSR,this.hasSpaCacheData)
    if (!this.isSSR && !this.hasSpaCacheData) { //非服务端渲染需要自身进行数据获取
     
     const res = await Index.getInitialProps({params:this.props.match.params})
        this.setState({data:res.data})
    }
  }

  async UNSAFE_componentWillMount () {

    
    // this.setState({ user: await getData('/') });
  }
  
  async getCurrentPage(currentPage) {

    const res = await Index.getInitialProps({ params: {id:currentPage}})
    console.log(res)
    this.setState({
      data: res.data
    })
    this.props.history.replace(`/news/${currentPage}`)
    // this.props.history.push({
    //   pathname: `/news/${currentPage}`
     
    // });

  }
  changeRouter = () => {
   
   
  }
  render() {
    console.log('detail')
    const {data} = this.state
    if(!data){
      return <div>loading</div>
    }
    const {prev,next} = data
    const {title,content,addTime,updateTime,keywords,description} = data.data
    return (
      <div>
        <Meta title={title} keywords={keywords} desc={description} />
        <Link to="/news">新闻</Link>
          <FlexItem align="baseline"> <h3>{title}</h3></FlexItem>
          <Flex justify="between" >
          <FlexItem align="baseline"><span>创建时间:{dayjs(addTime).format('YYYY-MM-DD HH:mm:ss ')}</span></FlexItem>
          <FlexItem align="baseline"><span>更新时间：{dayjs(updateTime).format('YYYY-MM-DD HH:mm:ss ')}</span></FlexItem>
        </Flex>
       <div  dangerouslySetInnerHTML={{__html:content}} />
       <PrevNext prev={prev} next={next} onItemClick={this.getCurrentPage}></PrevNext>
      </div>

    );
  }
}

export default Index;