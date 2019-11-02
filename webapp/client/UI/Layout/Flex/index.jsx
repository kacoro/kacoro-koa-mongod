/**
 * @param < Button />
 * @time 2019/1/20
 */

import React from 'react';
import classnames from 'classnames';
import styles from './index.scss';

class Index extends React.Component {
    render() {
        const { children, className,direction,wrap,align,justify, ...others } = this.props;
        return (
            <div className={
                classnames(
                    styles.Flex,
                    align?styles['align-'+align]:null, 
                    justify?styles['justify-'+justify]:null, 
                    className ? className : null)
                } {...others} >
                {children}
            </div>
        );
    }
}

export default Index;
