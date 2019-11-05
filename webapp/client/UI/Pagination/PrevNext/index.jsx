/**
 * @param < Button />
 * @time 2019/1/20
 */

import React from 'react';
import classnames from 'classnames';
import styles from './index.scss';
import { Flex,FlexItem } from '@app/UI/Layout';
import Button from '@app/UI/Buttons';

class PrevNext extends React.Component {
    constructor(props) {
        super(props)
       
        this.state = {
            prev: null, //当前页码
            next: null, //页码分组，显示7个页码，其余用省略号显示
        }
    }
    //页码点击
    pageClick(current) {
        const getCurrentPage = this.props.onItemClick;
       
        //将当前页码返回父组件
        getCurrentPage(current._id)
    }
        createPage() {
            // const {prev, next} = this.state;
            const {prev,next} = this.props
            let pages = []
            console.log(prev,next)
            if(prev){
                //上一页
                pages.push(<Button  onClick={this.pageClick.bind(this,prev)} key={prev._id}>
                上一页</Button>)
            }
           
            if(next){
                //下一页
                pages.push(<Button onClick={this.pageClick.bind(this,next)} key={next._id}>下一页</Button>)
                
            }
            return pages;
        }
    
    render() {
        console.log(this.props)
        const { data, children, className, ...others } = this.props;
        const pageList = this.createPage();
        return (
            <div  className={classnames(styles.root, className ? styles[className] : null)} {...others}>
            <ul className="PrevNext">
            <Flex justify="center">
              {pageList}
            </Flex>
            </ul>
          </div>
        );
    }
}

export default PrevNext;
