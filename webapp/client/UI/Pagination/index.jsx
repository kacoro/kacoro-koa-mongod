/**
 * @param < Button />
 * @time 2019/1/20
 */

import React from 'react';
import classnames from 'classnames';
import styles from './index.scss';
import { Flex,FlexItem } from '@app/UI/Layout';
import Button from '@app/UI/Buttons';

class Pagination extends React.Component {
    constructor(props) {
        super(props)
        const {data} = props
        const {page,hasMore,num,size,total} = data
        this.state = {
            currentPage: page || 1, //当前页码
            groupCount: 5, //页码分组，显示7个页码，其余用省略号显示
            startPage: page,  //分组开始页码
            totalPage:num || 1 ,//总页数
            hasMore:hasMore
        }
    }
    //页码点击
    pageClick(currentPage) {
        const {groupCount} = this.state
        const getCurrentPage = this.props.onItemClick;
        //当 当前页码 大于 分组的页码 时，使 当前页 前面 显示 两个页码
        if (currentPage >= groupCount) {
            this.setState({
                startPage: currentPage - 2,
            })
        }
        if (currentPage < groupCount) {
            this.setState({
                startPage: 1,
            })
        }
        //第一页时重新设置分组的起始页
        if (currentPage === 1) {
            this.setState({
                startPage: 1,
            })
        }
        this.setState({
            currentPage
        })
        //将当前页码返回父组件
        getCurrentPage(currentPage)
    }
        //上一页事件
        prePageHandeler() {
            let {currentPage} = this.state
            if (--currentPage === 0) {
                return false
            }
            this.pageClick(currentPage)
        }

        //下一页事件
        nextPageHandeler() {
            let {currentPage,totalPage} = this.state
        // const {totalPage} = this.props.pageConfig;
            if (++currentPage > totalPage) {
                return false
            }
            this.pageClick(currentPage)
        }

        createPage() {
            const {currentPage, groupCount, startPage,totalPage} = this.state;
            let pages = []
            //上一页
            pages.push(<Button className={currentPage === 1 ? "nomore" : null} onClick={this.prePageHandeler.bind(this)}
                           key={0}>
                上一页</Button>)
    
            if (totalPage <= 10) {
                /*总页码小于等于10时，全部显示出来*/
                for (let i = 1; i <= totalPage; i++) {
                    pages.push(<Button key={i} onClick={this.pageClick.bind(this, i)}
                                   className={currentPage === i ? "active" : null}>{i}</Button>)
                }
            } else {
                /*总页码大于10时，部分显示*/
    
                //第一页
                pages.push(<Button className={currentPage === 1 ? "active" : null} key={1}
                               onClick={this.pageClick.bind(this, 1)}>1</Button>)
    
                let pageLength = 0;
                if (groupCount + startPage > totalPage) {
                    pageLength = totalPage
                } else {
                    pageLength = groupCount + startPage;
                }
                //前面省略号(当当前页码比分组的页码大时显示省略号)
                if (currentPage >= groupCount) {
                    pages.push(<Button className="" key={-1}>···</Button>)
                }
                //非第一页和最后一页显示
                for (let i = startPage; i < pageLength; i++) {
                    if (i <= totalPage - 1 && i > 1) {
                        pages.push(<Button className={currentPage === i ? "active" : null} key={i}
                                       onClick={this.pageClick.bind(this, i)}>{i}</Button>)
                    }
                }
                //后面省略号
                if (totalPage - startPage >= groupCount + 1) {
                    pages.push(<Button className="" key={-2}>···</Button>)
                }
                //最后一页
                pages.push(<Button className={currentPage === totalPage ? "active" : null} key={totalPage}
                               onClick={this.pageClick.bind(this, totalPage)}>{totalPage}</Button>)
            }
            //下一页
            pages.push(<Button className={currentPage === totalPage ? "nomore" : null}
                           onClick={this.nextPageHandeler.bind(this)}
                           key={totalPage + 1}>下一页</Button>)
            return pages;
    
        }
    
    render() {
        console.log(this.props)
        const { data, children, className, ...others } = this.props;
        const pageList = this.createPage();
        return (
            <div  className={classnames(styles.root, className ? styles[className] : null)} {...others}>
            <ul className="pagination">
            <Flex justify="center">
              {pageList}
            </Flex>
            </ul>
          </div>
        );
    }
}

export default Pagination;
