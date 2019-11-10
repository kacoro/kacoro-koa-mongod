import React, { Component } from 'react';

import reduxTypes from '@app/redux/types';

class Second extends Component {
  constructor(props) {
    super(props);
  }

  UNSAFE_componentWillMount () {
  }

  changeRouter = () => {
    this.props.history.push({
      pathname: '/third',
      state: {
        text: 'from second'
      }
    });
  }
  handleAddClick() {
    this.props.dispatch({
        type: reduxTypes.ADD_COUNTER
    });
  }
  handleDelClick() {
      this.props.dispatch({
          type: reduxTypes.DEL_COUNTER
      });
  }
  render() {
    const { count } = this.props;
    return (
      <div className="post-header main-content-wrap text-left">
      <h1>关于我</h1>
      <div className="post-content markdown">
      <p>&nbsp;</p>
      <p>
      从事互联网多年，广告公司合伙人3年，主要负责网络建设，担任技术经理、运营经理等，2014年职于动态科技任前端开发经理，项目经理，2016年~2019年任职于多度科技，任前端开发组长。
      </p>
      <p>&nbsp;</p>
      <p>
      现在为自由职业，接外包为主。并思考如何把握自己的事业。
      </p>
      <p>&nbsp;</p>
      <p>
      以此博客来记录和分享生活，并慢慢迭代，提高技术。
      </p>
      </div>
      </div>
    );
  }
}

export default Second;