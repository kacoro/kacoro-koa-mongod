/**
 * @param < Button />
 * @time 2019/1/20
 */

import React from 'react';
import classnames from 'classnames';
import rootStyles from '../index.scss';
import styles from './index.scss';
class Index extends React.Component {
    render() {
        const { children, className, ...others } = this.props;
        return (
            <textarea className={classnames(rootStyles.Control,styles.Control, className ? className : null)} {...others} >{children}</textarea>
        );
    }
}

export default Index;
