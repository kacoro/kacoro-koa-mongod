function getUrlParam(name) {
  var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
  var r = window.location.search.substr(1).match(reg); //匹配目标参数
  if (r != null) return decodeURI(r[2]);
  return null; //返回参数值
}

function quill_img_handler(quill) {
  let fileInput = this.container.querySelector('input.ql-image[type=file]');

  if (fileInput == null) {
      fileInput = document.createElement('input');
      fileInput.setAttribute('type', 'file');
      fileInput.setAttribute('accept', 'image/png, image/gif, image/jpeg, image/bmp, image/x-icon');
      fileInput.classList.add('ql-image');
      fileInput.addEventListener('change', () => {
          const files = fileInput.files;
          const range = quill.getSelection(true);

          if (!files || !files.length) {
              console.log('No files selected');
              return;
          }

          const formData = new FormData();
          formData.append('file', files[0]);
    console.log(files[0])
          quill.enable(false);
    $.ajax({  
             url: "/api/upload", 
            method: "POST",
      data: formData,
      processData : false, 
      contentType : false,
          }).done(function(response) {
      console.log(response)
            if (response.filePath) {
              quill.enable(true);
                  quill.editor.insertEmbed(range.index, 'image', response.filePath);
                  quill.setSelection(range.index + 1, Quill.sources.SILENT);
                  fileInput.value = '';
            } else {
      console.log('quill image upload failed');
              quill.enable(true);
            }
          });	   
      });
      this.container.appendChild(fileInput);
  }
  fileInput.click();
}

// 初始化Web Uploader
function uploader(id,list,thumbnails){
  
  var _uploader = WebUploader.create({
    // 选完文件后，是否自动上传。
    auto: true,
  
    // swf文件路径
    swf: '/public/js/upload/Uploader.swf',
  
    // 文件接收服务端。
    server: '/api/upload',
  
    // 选择文件的按钮。可选。
    // 内部根据当前运行是创建，可能是input元素，也可能是flash.
    pick: id,
  
    // 只允许选择图片文件。
    accept: {
        title: 'Images',
        extensions: 'gif,jpg,jpeg,bmp,png',
        mimeTypes: 'image/*'
    }
  });
  // 当有文件被添加进队列的时候
  _uploader.on( 'fileQueued', function( file,data ) {
    // $(list).append( '<div id="' + file.id + '" class="item">' +
    //     '<h4 class="info">' + file.name + '</h4>' +
    //     '<p class="state">等待上传...</p>' +
    // '</div>' );
    var $li = $(
      '<div id="' + file.id + '" class="file-item thumbnail pull-left">' +
          '<img>' +
          '<div class="info">' + file.name + '</div>' +
          '<div class="file-panel" style="height: 0px;"><span class="cancel">删除</span><span class="rotateRight">向右旋转</span><span class="rotateLeft">向左旋转</span></div>'+
      '</div>'
      ),
      $btns = $('<div class="file-panel">' +
                    '<span class="cancel">删除</span>' +
                    '<span class="rotateRight">向右旋转</span>' +
                    '<span class="rotateLeft">向左旋转</span></div>').appendTo( $li ),
      $img = $li.find('img');
      $li.on('click', '.remove-this', function() {
          uploader.removeFile( file );
      })
      // $list为容器jQuery实例
    $(list).append( $li );
    // 创建缩略图
    // 如果为非图片文件，可以不用调用此方法。
    // thumbnailWidth x thumbnailHeight 为 100 x 100
    thumbnailWidth = 100
    thumbnailHeight = 100
    _uploader.makeThumb( file, function( error, src ) {
        if ( error ) {
            $img.replaceWith('<span>不能预览</span>');
            return;
        }

        $img.attr( 'src', src );
    }, thumbnailWidth, thumbnailHeight );
  });

  // 文件上传过程中创建进度条实时显示。
  _uploader.on( 'uploadProgress', function( file, percentage ) {
    var $li = $( '#'+file.id ),
    $percent = $li.find('.progress span');

    // 避免重复创建
    if ( !$percent.length ) {
        $percent = $('<p class="progress"><span></span></p>')
                .appendTo( $li )
                .find('span');
    }

    $percent.css( 'width', percentage * 100 + '%' );
});


_uploader.on( 'uploadSuccess', function( file,data ) {
 
  $( '#'+file.id ).addClass('upload-state-done')
  $( '#'+file.id ).attr('pathName',data.filePath)
  $( '#'+file.id ).attr('fileName',data.fileName)
});

_uploader.on( 'uploadError', function( file ) {
  var $li = $( '#'+file.id ),
        $error = $li.find('div.error');

    // 避免重复创建
    if ( !$error.length ) {
        $error = $('<div class="error"></div>').appendTo( $li );
    }

    $error.text('上传失败');
});

_uploader.on( 'uploadComplete', function( file ) {
  $( '#'+file.id ).find('.progress').remove();
});


 
  return _uploader
}
  
