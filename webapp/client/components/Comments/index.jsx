import React, { Component } from 'react';
import classnames from 'classnames';
import Button from '@app/UI/Buttons';
import RootStyles from '@app/UI/Styles'
import getData, { postData } from '@app/common/getData';
import styles from './index.scss';
import Icon from '@app/UI/Icons';
import {
    Link
} from "react-router-dom";
import { Input, Textarea } from '@app/UI/Form';
import { Flex, FlexItem } from '@app/UI/Layout';
import { DiffTime } from '@app/UI/Time';
import Website from './WebSite';
import logo from '@app/assets/images/logo.png'
import Lazyload from '@app/components/Lazyload';
import Signin from '@app/components/Header/Signin';
import reduxTypes from '@app/redux/types';

class Index extends Component {
    constructor(props) {
        super(props);
        this.state = {
            list: [],
            count: 0
        };
    }

    async componentDidMount() {
        const res = await getData(`comment/article/${this.props.id}`);
        const data = res.data.data
        let list = this.getTree(data, '', '_id', 'replyId')
        console.log(list)
        this.setState({ list: list, data: data, count: data.length })
        Lazyload(this.refs)
    }

    getTree(data, root, idTxt, pidTxt, pushTxt) {
        var idTxt = idTxt || 'id';
        var pidTxt = pidTxt || 'pid';
        var pushTxt = pushTxt || 'children';
        // 递归方法
        function getNode(id) {
            var node = []
            for (var i = 0; i < data.length; i++) {
                if (data[i][pidTxt] == id) {
                    data[i][pushTxt] = getNode(data[i][idTxt])
                    node.push(data[i])
                }
            }
            if (node.length == 0) {
                return
            } else {
                return node
            }
        }
        // 使用根节点
        return getNode(root)
    }
    replay = async (data) => {
        // var res = await postData(`comment/article/${this.props.id}`,{
        //     content:data.content
        //  })
        // this.setState(list:Object.assign(list,{}))
        //  console.log(res.data)
    }
    onReplay(obj) {
        let { data } = this.state;
        // 循环遍历 state中的 数组对象
        let newData = data.map(function (item) {
            if (item._id === obj._id) {
                // 改变值
                return {
                    ...item,
                    isReplay: !obj.isReplay
                }
            } else {
                return {
                    ...item,
                    isReplay: false
                };
            }
        });
        let list = this.getTree(newData, '', '_id', 'replyId')
        this.setState({
            data: newData,
            list: list
        })
    }
    creatComments(list) {
        if(!list) return null
        const comments = list.map((item, index) => {
            var src = '/upload/userIcon/' + item.name.toLowerCase() + '.jpg';
            return (
                <Flex key={index}>
                    <Website website={item.website} className={classnames(styles.avatar)} alt="kacoro's blog"   >
                        <img data-src={`/static${src}`} ref={`img-${item._id}`} />
                    </Website>
                    <FlexItem flex="auto">
                        <Flex direction="column" className={styles.content}>
                            <FlexItem>
                                <Website website={item.website}>{item.name}</Website> ·&nbsp;
                          <DiffTime start={item.addTime}></DiffTime>
                            </FlexItem>
                            <FlexItem>
                                <div>{item.content}</div>
                            </FlexItem>
                            <FlexItem>
                                <span onClick={this.onReplay.bind(this, item)} className={styles.action} data-active={item.isReplay}>回复</span>
                                {item.isReplay ? this.creatForm() : null}
                            </FlexItem>
                        </Flex>
                        {item.children ? this.creatComments(item.children) : null}
                    </FlexItem>
                </Flex>
            )
        })
        return comments

    }
    handleLogout  = () => {
        this.props.dispatch({
            type: reduxTypes.USER_LOGOUT
        });
    }
    creatForm = () => {
        const {user} = this.props
        return (
            <div>
                <Flex>
                    <div className={classnames(styles.avatar)} alt="kacoro's blog"   >
                        <img  />
                    </div>
                    <FlexItem flex="auto">
                        <Textarea
                            name="content"
                            id="content"
                            placeholder="评论"
                        ></Textarea>
                    </FlexItem>
                </Flex>
                <Flex justify="end" className={classnames(RootStyles['pt-10'])}>
                 {user?
                    <div>
                     <Button type="text" onClick={this.handleLogout}>退出</Button><Button color="primary">提交</Button>
                     {/* <Button>取消</Button> */}
                     </div>
                 :
                 <Signin {...this.props} />
                }
                </Flex>
            </div>

        )
    }
    render() {
        return (
            <div className={classnames(styles.comment,RootStyles['pb-20'])} >
                {this.state.count}条评论
               {this.creatForm()}
                {this.creatComments(this.state.list)}
            </div>
        );
    }
}

export default Index;