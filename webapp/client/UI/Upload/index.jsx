import React, { Component } from 'react';
import PropTypes from 'prop-types'
import http from '@app/redux/action'
import Button from '@app/UI/Buttons';
import classnames from 'classnames'
class Upload extends Component {
    constructor(props) {
        super(props)
        this.state = {
            src: '',
            uploadUrl: 'admin/upload',
            uploaded:false,
        }
    }
    
    //组件中定义选择图片的方法
    selectImage() {
        this.refs.uploadInput.click();//点击modal的html结构中的input标签
    }
   
    /*开始上传图片*/
     handleUpload = async(uploadUrl, file) => {
        // let this_=this;
        let form = new FormData();
        form.append('file', file)
        /*调用上传图片的封装方法*/
        console.log(this)
        const res = await http.post.bind(this)({ url: uploadUrl, data: form })
        if(res){
           this.setState({selected:false})
            this.props.onChange(res)
        }else{
            this.props.onChange({url:''})
        }
    }
    changeImageBeforeUpload(e) {
        const file = e.target.files[0];
        if (!file) {
            return;
        }
        let src;
        src = URL.createObjectURL(file);
        // // 匹配类型为image/开头的字符串
        // if (file.type==="image/png"||file.type==="image/jpeg") {
        //     src = URL.createObjectURL(file);
        // }else{
        //     message.error("图片上传只支持JPG/PNG格式,请重新上传！");
        //     return;
        // }
        // if (file.size/1024/1024>5) {
        //     message.error("图片上传大小不要超过5MB,请重新上传！");
        //     return;
        // }
        this.setState({
            src: src,
            file: file,
            selected:true
        })
        if(this.props.preview){
            this.props.onChange({url:''})
        }
        

    }
    render() {
        const { accept , type, text ,className,preview} = this.props
        const {src,selected} = this.state
        var showSrc = src
        if(preview){
            showSrc  = preview
        }
        return (
            <div className={classnames( className ? className : null)} >
                
                <input ref="uploadInput" type='file' accept={accept}
                    style={{ width: "100px", border: "none", visibility: "hidden" }}
                    onChange={this.changeImageBeforeUpload.bind(this)}
                />
                <div style={{ textAlign: "center", margin: "10px 0", width: "250px", height: "250px" }}>
                    {showSrc ?
                        type === "image" ?
                            <img src={showSrc} alt="" style={{ maxWidth: "100%", height: "250px" }} />
                            :
                            <video src={showSrc} controls="true" alt="" style={{ maxWidth: "100%", height:  "250px"}}></video>
                        :
                        <div style={{ background: "#f2f2f2", width: "250px", height: "250px" }}>
                        </div>
                    }
                </div>
                <Button color="primary" onClick={this.selectImage.bind(this)} >
                    {text}
                </Button>
                <Button disabled={selected?null:"disabled"}onClick={this.handleUpload.bind(this, this.state.uploadUrl, this.state.file)}>上传</Button>
            </div>

        )
    }
}

Upload.propTypes ={
    type:PropTypes.number.isRequired,
    accept:PropTypes.number.isRequired,
    text:PropTypes.number.isRequired,
    onChange:PropTypes.number.isRequired
}

Upload.defaultProps ={
    accept: "image/*",
    type:"image",
    text:"选择图片" 
  
}

export default Upload;