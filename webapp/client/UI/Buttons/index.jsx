/**
 * @param < Button />
 * @time 2019/1/20
 */

import React from 'react';
import classnames from 'classnames';
import styles from './index.scss';

class Button extends React.Component {
    render() {
        const { children,color, className, ...others } = this.props;
        return (
            <button className={classnames(styles.button, className ? className : null,color ? styles[color]:null )} {...others}>
                {children}
            </button>
        );
    }
}

export default Button;
