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
    }
    // UNSAFE_componentWillReceiveProps = (nextProps) => {
    //     const check = Object.is(this.props.location, nextProps.location)
    //     const check2 = Object.is(this.props.data, nextProps.data)
    //     if(!(check&&check2)){
    //         const {page,hasMore,num,size,total} = nextProps.data
    //         this.setState({
    //             currentPage: page || 1, //当前页码
    //             groupCount: 5, //页码分组，显示7个页码，其余用省略号显示
    //             startPage: page,  //分组开始页码
    //             totalPage:num || 1 ,//总页数
    //             hasMore:hasMore
    //         })    
    //     }
    //   }
  
    //页码点击
    pageClick(currentPage) {
        const getCurrentPage = this.props.onItemClick;
        getCurrentPage(currentPage)
    }
        //上一页事件
        prePageHandeler() {
            let {currentPage} = this.props
            if (--currentPage === 0) {
                return false
            }
            this.pageClick(currentPage)
        }

        //下一页事件
        nextPageHandeler() {
            let {currentPage,totalPage} = this.props
        // const {totalPage} = this.props.pageConfig;
            if (++currentPage > totalPage) {
                return false
            }
            this.pageClick(currentPage)
        }

        createPage() {
            const {currentPage, groupCount, startPage,totalPage} = this.props;
            
            let pages = []
            //上一页
            pages.push(<Button className={styles.Button} color={currentPage === 1 ? "nomore" : null} onClick={this.prePageHandeler.bind(this)}
                           key={0}>
                上一页</Button>)
    
            if (totalPage <= 10) {
                /*总页码小于等于10时，全部显示出来*/
                for (let i = 1; i <= totalPage; i++) {
                    pages.push(<Button className={styles.Button} key={i} onClick={this.pageClick.bind(this, i)}
                    color={currentPage === i ? "active" : null}>{i}</Button>)
                }
            } else {
                /*总页码大于10时，部分显示*/
    
                //第一页
                pages.push(<Button className={styles.Button} color={currentPage === 1 ? "active" : null} key={1}
                               onClick={this.pageClick.bind(this, 1)}>1</Button>)
    
                let pageLength = 0;
                if (groupCount + startPage > totalPage) {
                    pageLength = totalPage
                } else {
                    pageLength = groupCount + startPage;
                }
                //前面省略号(当当前页码比分组的页码大时显示省略号)
                if (currentPage >= groupCount) {
                    pages.push(<Button className={styles.Button} key={-1}>···</Button>)
                }
                //非第一页和最后一页显示
                for (let i = startPage; i < pageLength; i++) {
                    if (i <= totalPage - 1 && i > 1) {
                        pages.push(<Button className={styles.Button} color={currentPage === i ? "active" : null} key={i}
                                       onClick={this.pageClick.bind(this, i)}>{i}</Button>)
                    }
                }
                //后面省略号
                if (totalPage - startPage >= groupCount + 1) {
                    pages.push(<Button className={styles.Button}  key={-2}>···</Button>)
                }
                //最后一页
                pages.push(<Button className={styles.Button} color={currentPage === totalPage ? "active" : null} key={totalPage}
                               onClick={this.pageClick.bind(this, totalPage)}>{totalPage}</Button>)
            }
            //下一页
            pages.push(<Button className={styles.Button} color={currentPage === totalPage ? "nomore" : null}
                           onClick={this.nextPageHandeler.bind(this)}
                           key={totalPage + 1}>下一页</Button>)
            return pages;
    
        }
    
    render() {
        const { data, children, className } = this.props;
        const pageList = this.createPage();
        return (
            <div  className={classnames(styles.root, className ? className : null)} >
            <ul className="pagination">
            <Flex flex="wrap" justify="center">
              {pageList}
            </Flex>
            </ul>
          </div>
        );
    }
}

Pagination.defaultProps = {
    currentPage:1,
    groupCount:5,
    startPage:1,
    totalPage:1
  }
  
export default Pagination;
