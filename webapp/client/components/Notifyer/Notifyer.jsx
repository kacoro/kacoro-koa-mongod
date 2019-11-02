/**
 * Created with WebStorm
 * User: Doordu.Shawn
 * Date: 2016-08-31
 * Time: 10:47
 *
 */


import React ,{Component} from 'react'



import {showNotifyBox} from '../../lib/DDTransition'

class Notifyer extends  BaseDDComponent {
    constructor(props) {
        super(props)
        super.initSuperGBES({
            name:EVENT_SHOWNOTIFY,
            subscribe : (topic ,msgObj) => this.changeContent(msgObj)
        })
        this.state = {
            text: '',
            isShow: 0,
            type: 'tip',
            showBg: 0,
            handler: null,
            title: null
        }
    }

    changeContent(obj) {
        console.log(obj)
        this.setState({
            text:obj.text,
            isShow: obj.isShow === undefined ? 1 : obj.isShow,
            type:!obj.type ? 'tip' : obj.type,
            showBg: !obj.showBg ? 0 : obj.showBg,
            handler:obj.handler,
            btnText : obj.btnText,
            title : obj.title
        })
    }

    componentDidUpdate() {
        showNotifyBox(this ,this.refs.notify , this.state.type )
    }

    closeNotifyer (e , hanleOrNot) {
        const {handler} = this.state
        !hanleOrNot ?  '' : (handler ? handler() : '')
        cancelAnimationFrame(this.animateId)
        this.setState({
            isShow:0
        })
    }

    renderConfirmBox() {
        const {text,title} = this.state

        return (
            <div className="notify-notice-inner">
                <div className="handle-msg " >
                    {
                        !title ? '' : <div className="handle-title">{title}</div>
                    }
                    <div className='textNormal'>{text}</div>
                </div>
                <div className="handle-btn" data-flex="box:mean">
                    <span className="cancel" onClick={::this.closeNotifyer}>取消</span>
                    <span className="confirm" onClick={(e)=>this.closeNotifyer(e,1)}>确定</span>
                </div>
            </div>
        )
    }

    renderCustomConfrimBox() {
        const {text,title ,handler ,btnText} = this.state
        return (
            <div className="notify-notice-inner">
                <div className="handle-msg " >
                    {
                        !title ? '' : <div className="handle-title">{title}</div>
                    }
                    <div className='textNormal'>{text}</div>
                </div>
                <div className="handle-btn" data-flex="box:mean">
                    <span className="cancel" onClick={(e)=> {
                        handler.cancel()
                        this.closeNotifyer(e , 0)
                    }}>{btnText[0]}</span>
                    <span className="confirm" onClick={(e)=>{
                        handler.confirm()
                        this.closeNotifyer(e , 0)
                    }}>{btnText[1]}</span>
                </div>
            </div>
        )
    }

    renderNoticeBox () {

        return (
            <div className="notify-notice-inner">
                <div className="handle-msg">{this.state.text}</div>
                <div className="handle-btn " data-flex="box:mean" onClick={(e)=>this.closeNotifyer(e,1)}><span>知道了</span></div>
            </div>
        )
    }

    renderTipBox () {
        return (
            <div className="notify-tip-inner">{this.state.text}</div>
        )
    }

    render() {
        const {isShow , showBg,type} = this.state
        if (!isShow) return <div></div>
        console.log('render*********************Notifyer')

        let innerContent
        switch (type) {
            case 'notice':
                innerContent = this.renderNoticeBox()
                break
            case 'confirm':
                innerContent = this.renderConfirmBox()
                break
            case 'custom-confirm':
                innerContent = this.renderCustomConfrimBox()
                break
            case 'tip':
                innerContent = this.renderTipBox()
            default:
                break
        }
        return (
            <div ref="notify" className={"notify-wrap " + (showBg ? ' addBg' : '')} data-flex="main:center cross:center">
                <div  className="animated displayHide" >
                    {innerContent}
                </div>
            </div>

        )
    }
}

export default Notifyer
