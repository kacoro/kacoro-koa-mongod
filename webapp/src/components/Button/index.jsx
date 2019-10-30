/**
 * @param < Button />
 * @time 2019/1/20
 */

import React from 'react';
import classnames from 'classnames';


class Button extends React.Component {
    render() {
        const { children, className, ...others } = this.props;
        return (
            <button  {...others}>
                {children}
            </button>
        );
    }
}

export default Button;
