/**
 * @param < Button />
 * @time 2019/1/20
 */

import React from 'react';
import classnames from 'classnames';
import styles from './index.scss';

class Index extends React.Component {
    render() {
        const { children, className, ...others } = this.props;
        return (
            <input className={classnames(styles.Input, className ? className : null)} {...others} />
        );
    }
}

export default Index;
