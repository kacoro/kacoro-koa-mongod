/**
 * @param < Button />
 * @time 2019/1/20
 */

import React from 'react';
import classnames from 'classnames';
import styles from './index.scss';

class Index extends React.Component {
    render() {
        const { children, className,align,flex,order,shrink,justify, ...others } = this.props;
        return (
            <div className={
                classnames(
                    styles.FlexItem,
                    align?styles['align-'+align]:null, 
                    flex?styles['flex-'+flex]:null, 
                    className ? className : null)
                } {...others}  >
                {children}
            </div>
        );
    }
}

export default Index;
