import React, { Component, PureComponent } from 'react';
import ReactQuill, { Quill, Mixin, Toolbar } from 'react-quill';
import Button from '@app/UI/Buttons';
import 'react-quill/dist/quill.snow.css'; // ES6
import Styles from './index.scss'
import Modal from '@app/UI/Modal';
class Index extends Component {
    constructor(prop) {
        super(prop)
        this.state = {
            content: prop.content,
            src:''
        }
    }
    modules = {
        toolbar: {
            container: [
                [{ 'header': [1, 2, , 3, 4, 5, 6, false] }],
                ['bold', 'italic', 'underline', 'strike', 'blockquote'],
                [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'indent': '-1' }, { 'indent': '+1' }],
                ['link','image','video'],
                ['code','code-block','clean'],
            ],
            handlers: {
                'image':this.showUploadBox.bind(this),
                'video':this.showUploadBox.bind(this)
            }
        },

    }
    formats = [
        'header',
        'bold', 'italic', 'underline', 'strike', 'blockquote',
        'list', 'bullet', 'indent',
        'link', 'image','code','code-block'
    ]
   
    //react组件中定义方法
    showUploadBox(){
        this.setState({
            showModal:true
        });
    }
    //组件中定义选择图片的方法
    selectImage(){
        this.refs.uploadInput.click();//点击modal的html结构中的input标签
    }
    handleCloseModal =(e)=>{
        this.setState({
            showModal:false
        });
    }
    
    // shouldComponentUpdate = async (nextProps, nextState, nextContext) => {
    //     if(this.prop.content!=this.nextProps.content){
    //         this.setState({content:nextProps.content})
    //     }
    // }
    changeImageBeforeUpload(e){
        const file = e.target.files[0];
        if (!file) {
            return;
        }
        let src;
        // 匹配类型为image/开头的字符串
        if (file.type==="image/png"||file.type==="image/jpeg") {
            src = URL.createObjectURL(file);
        }else{
            message.error("图片上传只支持JPG/PNG格式,请重新上传！");
            return;
        }
        if (file.size/1024/1024>5) {
            message.error("图片上传大小不要超过5MB,请重新上传！");
            return;
        }
        this.setState({
            src:src,
            file:file
        })
       
    }
    /*处理图片插入*/
    imageHandler(url){
        let quill=this.refs.reactQuillRef.getEditor();//获取到编辑器本身
        const cursorPosition =quill.getSelection().index;//获取当前光标位置
        quill.insertEmbed(cursorPosition, "image",url, Quill.sources.USER);//插入图片
        quill.setSelection(cursorPosition + 1);//光标位置加1
    }
    uploadForImage(url,data,callback,token) {//data是数据列表
        console.log('post-请求接口:' + url);
        console.log('请求参数:' + data);
        let this_=this;
        if (!data) {
            console.log('未选择文件');
            return;
        }
        this_.imageHandler(this_.state.url);
        let xhr = new XMLHttpRequest();
        let form = new FormData();
        form.append('file', data);
        xhr.addEventListener('readystatechange',function(e){
            console.log(e);
            let response=e.target.response?JSON.parse(e.target.response):null;
            console.log(response);
            if (e.target.readyState===4&&response) {
                callback(response);
            }
        },false);
        xhr.open('POST', url, true);  // 第三个参数为async?，异步/同步
        xhr.setRequestHeader("accessToken",token);
        xhr.send(form);
    }
    /*开始上传图片*/
    handleUpload(uploadUrl,file){
        let this_=this;
        /*调用上传图片的封装方法*/
        this.uploadForImage(
            uploadUrl,
            file,
            function (response) {//回调函数处理进度和后端返回值
                if (response&&response.code === 200) {
                    message.success("上传成功！");
                    this_.handleCloseModal();//隐藏弹框
                    this_.imageHandler(response.data.url);//处理插入图片到编辑器
                }else if (response && response.code !== 200) {
                    message.error(response.msg)
                    
                }
            },
            localStorage.getItem("access_token"));
    }
    UNSAFE_componentWillReceiveProps(nextProps) {
        this.setState({ content: nextProps.content })
    }
    handleChange = (value) => {
        this.props.onChange(value)
    }
    render() {
        const { content } = this.state;
        return (
            <div>
                <ReactQuill className={Styles.Editor}  ref="reactQuillRef" value={content} onChange={this.handleChange} modules={this.modules} formats={this.formats} />
                <Modal
                    title="上传图片"
                    {...this.props}
                    isOpen={this.state.showModal}
                    contentLabel="Minimal Modal Example"
                    onIconClose={this.handleCloseModal}
                    onRequestClose={this.handleCloseModal}
                    width="300"
                >
                <Button onClick={this.selectImage.bind(this)} style={{background:"#18ade4",border:"none",color:"#fff"}}>
                        选择图片
                </Button>
                    <input ref="uploadInput" type='file' accept='image/*'
                               style={{width:"100px",border:"none",visibility:"hidden"}}
                               onChange={this.changeImageBeforeUpload.bind(this)}
                    />
                    <div style={{textAlign:"center",margin:"10px 0"}}>
                    {this.state.src?
                                <img src={this.state.src} alt="" style={{maxWidth:"100%",height:"300px"}}/>
                                :
                                <div style={{background:"#f2f2f2",width:"100%",height:"300px"}}>

                                </div>
                     }
                     <div>
                     <Button onClick={this.handleUpload.bind(this,this.state.uploadUrl,this.state.file)}>上传</Button>
                     </div>
                     
                    </div>
                   
                </Modal>
            </div>

        )
    }
}

export default Index;
