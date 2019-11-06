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
        const { children,icon, color,className,fontSize,type, ...others } = this.props;
        if(type=='ion'){
            return(
                <i className={classnames(styles.Ion,'icon',`${type}-${icon}`,color?stylesColor[color]:null, className ? className : null)} {...others} aria-hidden="true">{children}
                </i>
            )
        }
        return (
            <span className={classnames(styles.Icon,color?stylesColor[color]:null, className ? className : null)} {...others} aria-hidden="true">{icon}{children}</span>
        );
    }
}

export default index;
