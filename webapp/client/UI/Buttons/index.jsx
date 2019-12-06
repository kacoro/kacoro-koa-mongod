/**
 * @param < Button />
 * @time 2019/1/20
 */

import React,{Fragment} from 'react';
import { Link } from "react-router-dom";
import classnames from 'classnames';
import styles from './index.scss';

class Button extends React.Component {
    render() {
        const { children,type , color, className,outlined=false, ...others } = this.props;
        const classname = classnames(styles.button,
            type?styles[type]:null,
            color ? styles[color]:null,
            outlined?styles.outlined:null, 
            className ? className : null )
        return (
            <Fragment>
            { type==="link" ?
             <Link  className={classname} {...others} >{children}</Link>
            :
            <button className={classname} {...others}>
                {children}
            </button>
            }
            </Fragment>
            
        );
    }
}

export default Button;
