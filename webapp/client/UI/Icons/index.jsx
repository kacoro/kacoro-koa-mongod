/**
 * @param < Button />
 * @time 2019/1/20
 */

import React from 'react';
import classnames from 'classnames';
import styles from './index.scss';
import stylesColor from '@app/UI/Styles/index.scss';
class index extends React.Component {
    render() {
        const { children, color,className,fontSize, ...others } = this.props;
        return (
         
            <span className={classnames(styles.Root,styles.Icon,color?stylesColor[color]:null, className ? className : null)} {...others} aria-hidden="true">
            {children}</span>
        );
    }
}

export default index;
