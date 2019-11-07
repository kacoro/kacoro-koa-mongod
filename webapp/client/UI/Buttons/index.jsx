/**
 * @param < Button />
 * @time 2019/1/20
 */

import React from 'react';
import classnames from 'classnames';
import styles from './index.scss';

class Button extends React.Component {
    render() {
        const { children,type , color, className, ...others } = this.props;
        return (
            <button className={classnames(styles.button,type?styles[type]:null,color ? styles[color]:null, className ? className : null )} {...others}>
                {children}
            </button>
        );
    }
}

export default Button;
