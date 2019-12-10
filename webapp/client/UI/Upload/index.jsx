import React, { Component } from 'react';
import ReactDOM from 'react-dom'
import { handlePost } from '@app/redux/action'
import Button from '@app/UI/Buttons';
class Upload extends Component {
    constructor(props) {
        super(props)
        this.state = {
            src: "",
            uploadUrl: 'admin/upload'
        }
    }
    //组件中定义选择图片的方法
    selectImage() {
        this.refs.uploadInput.click();//点击modal的html结构中的input标签
    }
    uploadForImage(url, data, callback, token) {//data是数据列表
        console.log('post-请求接口:' + url);
        console.log('请求参数:' + data);
        let this_ = this;
        if (!data) {
            console.log('未选择文件');
            return;
        }
        this_.props.onChange(this_.state.url);
        let xhr = new XMLHttpRequest();
        let form = new FormData();
        form.append('file', data);
        // xhr.addEventListener('readystatechange',function(e){
        //     console.log(e);
        //     let response=e.target.response?JSON.parse(e.target.response):null;
        //     console.log(response);
        //     if (e.target.readyState===4&&response) {
        //         callback(response);
        //     }
        // },false);
        // xhr.open('POST', url, true);  // 第三个参数为async?，异步/同步
        // xhr.setRequestHeader("token",token);
        // xhr.send(form);
    }
    /*开始上传图片*/
    async handleUpload(uploadUrl, file) {
        // let this_=this;
        let form = new FormData();
        form.append('file', file)
        /*调用上传图片的封装方法*/
        const res = await handlePost.bind(this)({ url: uploadUrl, data: form })
        if(res){
            console.log(res)
            this.props.onChange(res)
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
            file: file
        })

    }
    render() {
        const { accept = "image/*", type = "image", text = "选择图片" } = this.props
        return (
            <div>
                <Button onClick={this.selectImage.bind(this)} style={{ background: "#18ade4", border: "none", color: "#fff" }}>
                    {text}
                </Button>
                <input ref="uploadInput" type='file' accept={accept}
                    style={{ width: "100px", border: "none", visibility: "hidden" }}
                    onChange={this.changeImageBeforeUpload.bind(this)}
                />
                <div style={{ textAlign: "center", margin: "10px 0" }}>
                    {this.state.src ?
                        type === "image" ?
                            <img src={this.state.src} alt="" style={{ maxWidth: "100%", height: "300px" }} />
                            :
                            <video src={this.state.src} alt="" style={{ maxWidth: "100%", height: "300px" }}></video>
                        :
                        <div style={{ background: "#f2f2f2", width: "250px", height: "250px" }}>
                        </div>
                    }
                </div>
                <Button onClick={this.handleUpload.bind(this, this.state.uploadUrl, this.state.file)}>上传</Button>
            </div>

        )
    }
}

export default Upload;