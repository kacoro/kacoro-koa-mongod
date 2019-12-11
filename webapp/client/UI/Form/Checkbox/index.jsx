/**
 * @param < Button />
 * @time 2019/1/20
 */

import React from 'react';
import classnames from 'classnames';
import styles from './index.scss';

class Index extends React.Component {
   
    render() {
        const { data,children, itemText= 'name',itemValue = '_id',className, ...others } = this.props;
        return (
            <input type="checkbox" className={classnames(styles.checkbox, className ? className : null)} {...others}  />
              
           
        );
    }
}

export default Index;
