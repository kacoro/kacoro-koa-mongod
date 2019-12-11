import React, { Component, PureComponent } from 'react';
import ReactQuill, { Quill, Mixin, Toolbar } from 'react-quill';
import Button from '@app/UI/Buttons';
import 'react-quill/dist/quill.snow.css'; // ES6
import Styles from './index.scss'
import Modal from '@app/UI/Modal';
import Upload from '@app/UI/Upload/noSSR';

import ImageResize from 'quill-image-resize-module';
import VideoResize,{Resize,BaseModule } from 'quill-video-resize-module';

//自定义视频
const Video = Quill.import('formats/video');
const Link = Quill.import('formats/link');

class CoustomVideo extends Video {
    static create(value) {
      const node = super.create(value);
      
      const video = document.createElement('video')
      video.setAttribute('controls', true);
      video.setAttribute('type', "video/mp4");
      video.setAttribute('style', "height: auto; max-width: 100%");
      video.setAttribute('src', this.sanitize(value));
      node.appendChild(video);
     
      return node;
    }
    static sanitize(url) {
      return Link.sanitize(url);
    }
  };
  CoustomVideo.blotName = 'video';
  CoustomVideo.className = 'ql-video';
  CoustomVideo.tagName = 'DIV';
  
  Quill.register('formats/video', CoustomVideo);
  Quill.register('modules/imageResize', ImageResize);
 Quill.register('modules/videoResize', VideoResize);
class Index extends Component {
    constructor(prop) {
        super(prop)
        this.state = {
            content: prop.content
        }
    }
    modules = {
        toolbar: {
            container: [
                [{ 'font': [] }],
                [{ 'header': [1, 2, , 3, 4, 5, 6, false] }],
                ['bold', 'italic', 'underline', 'strike', 'blockquote'],
                [{ 'color': [] }, { 'background': [] }], 
                [{ 'list': 'ordered' }, { 'list': 'bullet' }],
                [{ 'script': 'sub'}, { 'script': 'super' }], 
                [{ 'indent': '-1'}, { 'indent': '+1' }], 
                [{ 'align': [] }],
                ['link','image','video'],
                
                ['code','code-block','clean'],
            ],
            handlers: {
                'image':this.showUploadBox.bind(this,),
                'video':this.showUploadVideoBox.bind(this)
            }
        },
        imageResize:  {},
        videoResize:{}

    }
    formats = [
        'font','header',
        'bold', 'italic', 'underline', 'strike', 'blockquote','color','background',
        'list', 'bullet','script', 'indent',
        'align','link', 'image','video','code','code-block'
    ]
   
    //react组件中定义方法
    showUploadBox(){
        this.setState({
            showModal:true,
            src:''
        });
    }
    showUploadVideoBox(){
        this.setState({
            showVideoModal:true,
            src:''
        });
    }
    handleCloseModal =(e)=>{
        this.setState({
            showModal:false
        });
    }
    handleCloseVideoModal =(e)=>{
        this.setState({
            showVideoModal:false
        });
    }
    /*处理图片插入*/
    imageHandler = ({url}) =>{
        let quill=this.refs.reactQuillRef.getEditor();//获取到编辑器本身
        const cursorPosition =quill.getSelection().index;//获取当前光标位置
        quill.insertEmbed(cursorPosition, "image",url, Quill.sources.USER);//插入图片
        quill.setSelection(cursorPosition + 1);//光标位置加1
        this.handleCloseModal()
    }
    videoHandler = ({url})=>{
        let quill=this.refs.reactQuillRef.getEditor();//获取到编辑器本身
        const cursorPosition =quill.getSelection().index;//获取当前光标位置
        quill.insertEmbed(cursorPosition, "video",url, Quill.sources.USER);//插入视频
        quill.setSelection(cursorPosition + 1);//光标位置加1
        this.handleCloseVideoModal()
    }
    UNSAFE_componentWillReceiveProps(nextProps) {
        this.setState({ content: nextProps.content })
    }
    handleChange = (value) => {
        this.props.onChange(value)
    }
    componentWillUnmount(){
        var html=document.querySelector("html");
        html.style.userSelect = "" //修复html
    }
    render() {
        const { content } = this.state;
        return (
            <div>
                <ReactQuill className={Styles.Editor}  ref="reactQuillRef" value={content} onChange={this.handleChange} modules={this.modules} formats={this.formats} />
                <Modal
                    title="上传图片"
                    dispatch={this.props.dispatch}
                    isOpen={this.state.showModal}
                    contentLabel="Minimal Modal Example"
                    onIconClose={this.handleCloseModal}
                    onRequestClose={this.handleCloseModal}
                    width="300"
                >
                <Upload  onChange={this.imageHandler}  dispatch={this.props.dispatch} />
                </Modal>
                <Modal
                    title="选择视频"
                    dispatch={this.props.dispatch}
                    isOpen={this.state.showVideoModal}
                    contentLabel="Minimal Modal Example"
                    onIconClose={this.handleCloseVideoModal}
                    onRequestClose={this.handleCloseVideoModal}
                    width="300"
                >
                <Upload text="上传视频" type="video" accept='video/*' onChange={this.videoHandler} dispatch={this.props.dispatch}/>
                </Modal>
            </div>

        )
    }
}

export default Index;
