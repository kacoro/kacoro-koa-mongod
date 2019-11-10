import ReactModal from "./components/Modal";
import React from 'react';
import styles from './index.scss';
import classnames from 'classnames';
import Icon from '@app/UI/Icons';
ReactModal.setAppElement("#root")
class Modal extends React.Component {
    constructor(props) {
        super(props);
    }
    render(){
        const { children, className,overlayClassName, ...others } = this.props;
        return <ReactModal overlayClassName={classnames(styles.Overlay, overlayClassName ? overlayClassName : null)} className={classnames(styles.Modal, className ? className : null)} {...others}>
             <div className={classnames(styles.Content)} >
                <Icon color="primary" className={classnames(styles.Close)} onClick={this.props.onIconClose} >cancel</Icon>
                 {children}
             </div>
        </ReactModal>
    }
}
export default Modal;