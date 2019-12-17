import React, { Component } from 'react';
import PropTypes from 'prop-types'
import http from '@app/redux/action'
import Button from '@app/UI/Buttons';
import classnames from 'classnames'
import exif from 'exif-js';

function readFile(file) {
  return new Promise(resolve => {
    var reader = new FileReader();
    reader.onload = e => resolve(e.target.result);
    reader.readAsDataURL(file);
  });
};

function createImage(data) {
  return new Promise(resolve => {
    const img = document.createElement('img');
    img.onload = () => resolve(img);
    img.src = data;
  })
}

function rotate(type, maxWidth, img) {
  return new Promise(resolve => {
    const canvas = document.createElement('canvas');

    exif.getData(img, function () {
      var orientation = exif.getAllTags(this).Orientation;
      let ratio = img.width / img.height;
      let width = img.width > maxWidth ? maxWidth : img.width;
      let height = width / ratio
      if ([5, 6, 7, 8].indexOf(orientation) > -1) {
        canvas.width = height;
        canvas.height = width;
      } else {
        canvas.width = width;
        canvas.height = height;
      }

      var ctx = canvas.getContext("2d");

      switch (orientation) {
        case 2:
          ctx.transform(-1, 0, 0, 1, width, 0);
          break;
        case 3:
          ctx.transform(-1, 0, 0, -1, width, height);
          break;
        case 4:
          ctx.transform(1, 0, 0, -1, 0, height);
          break;
        case 5:
          ctx.transform(0, 1, 1, 0, 0, 0);
          break;
        case 6:
          ctx.transform(0, 1, -1, 0, height, 0);
          break;
        case 7:
          ctx.transform(0, -1, -1, 0, height, width);
          break;
        case 8:
          ctx.transform(0, -1, 1, 0, 0, width);
          break;
        default:
          ctx.transform(1, 0, 0, 1, 0, 0);
      }

      ctx.drawImage(img, 0, 0, width, height);
      ctx.canvas.toBlob(resolve, type);
      // ctx.canvas.toDataURL()
      // console.log(ctx)
      // resolve(ctx.canvas.toDataURL())
    });
  })
}

class Upload extends Component {
  constructor(props) {
    super(props)
    this.state = {
      src: '',
      uploadUrl: 'admin/upload',
      uploaded: false,
    }
  }

  //组件中定义选择图片的方法
  selectImage() {
    this.refs.uploadInput.click();//点击modal的html结构中的input标签
  }

  /*开始上传图片*/
  handleUpload = async (uploadUrl, file) => {
    // let this_=this;
    let form = new FormData();
    form.append('file', file)
    /*调用上传图片的封装方法*/
    console.log(this)
    const res = await http.post.bind(this)({ url: uploadUrl, data: form })
    if (res) {
      this.setState({ selected: false })
      this.props.onChange(res)
    } else {
      this.props.onChange({ url: '' })
    }
  }
  changeImageBeforeUpload(e) {
    const file = e.target.files[0];
    if (!file) {
      return;
    }
    if (this.props.type == "video") {
      let src;
      src = URL.createObjectURL(file);
      this.setState({
        src: src,
        file: file,
        selected: true
      })
    } else {
      readFile(file)
        .then(createImage)
        .then(rotate.bind(undefined, file.type, this.props.maxWidth))
        .then(blob => {
          blob.name = file.name;
          let src;
          src = URL.createObjectURL(blob);
          this.setState({
            src: src,
            file: blob,
            selected: true
          })
        })
    }

    // var reg=/image\/*/;
    // console.log(reg.test(file.type));


    // console.log(blod)



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
    if (this.props.preview) {
      this.props.onChange({ url: '' })
    }
  }
  render() {
    const { accept, type, text, className, preview } = this.props
    const { src, selected } = this.state
    var showSrc = src
    if (preview) {
      showSrc = preview
    }
    return (
      <div className={classnames(className ? className : null)} >

        <div style={{ textAlign: "center",border:"1px solid #ccc",boxSizing:'border-box', margin: "10px 0",lineHeight: 1, width: "250px", height: "250px" ,display:"table-cell" ,verticalAlign:'middle',position: 'relative', overflow: 'hidden'}}>
          {showSrc ?
            type === "image" ?
              <img src={showSrc} alt="" style={{ maxWidth: "100%", maxHeight: "100%" }} />
              :
              <video src={showSrc} controls={true} alt="" style={{ maxWidth: "100%", height: "250px" }}></video>
            :
            <div style={{ background: "#f2f2f2", width: "250px", height: "250px" }}>
            </div>
          }
        </div>
        <div style={{paddingTop:'20px'}}>
          <input ref="uploadInput" type='file' accept={accept}
            style={{ width: "1px", border: "none", visibility: "hidden" }}
            onChange={this.changeImageBeforeUpload.bind(this)}
          />
          <Button color="primary" onClick={this.selectImage.bind(this)} >
            {text}
          </Button>
          <Button disabled={selected ? null : "disabled"} onClick={this.handleUpload.bind(this, this.state.uploadUrl, this.state.file)}>上传</Button>
        </div>
       
      </div>

    )
  }
}

Upload.propTypes = {
  type: PropTypes.number.isRequired,
  accept: PropTypes.number.isRequired,
  text: PropTypes.number.isRequired,
  onChange: PropTypes.number.isRequired,

}

Upload.defaultProps = {
  accept: "image/*",
  type: "image",
  text: "选择图片",
  maxWidth: 750
}

export default Upload;