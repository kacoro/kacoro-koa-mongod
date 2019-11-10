import React, { Component } from 'react';
const threshold = [0.01] // 这是触发时机 0.01代表出现 1%的面积出现在可视区触发一次回掉函数 threshold = [0, 0.25, 0.5, 0.75]  表示分别在0% 25% 50% 75% 时触发回掉函数

const css = {
    box: {
      height: '400px',
      border: '1px solid pink',
      overflowY: 'scroll',
    },
    imageBox: {
      width: '500px',
      height: '500px',
      margin: '20px auto',
    },
  }


  var io = null
if(typeof IntersectionObserver =='function'){
   io =  new IntersectionObserver((entries)=>{ // 观察者
    entries.forEach((item)=>{ // entries 是被监听的元素集合它是一个数组
      if (item.intersectionRatio <= 0 ) return // intersectionRatio 是可见度 如果当前元素不可见就结束该函数。
    
      const {target} = item
      target.src = target.dataset.src // 将 h5 自定义属性赋值给 src (进入可见区则加载图片)
    })
  }, {
    threshold, // 添加触发时机数组
  });
}
    


  
  // onload 函数
  const LazyLoad = (refs)=>{
    if(typeof IntersectionObserver =='function'){
      Object.getOwnPropertyNames(refs).forEach(function(key){
          if(refs[key].dataset.src){
            io.observe(refs[key])
          }
     })
    }
  
    // refs.forEach( (item) => {
    //   io.observe(item.current) // 添加需要被观察的元素。
    // } )
  }

  // 定义懒加载纯函数组件
// 为了监听页面加载完毕 定义了一个img 利用 onerror 函数替代 onlaod {src需填写一个不存在图片的路径}
const LazyLoadPage = (images)=>(
    <div style={css.box}>
      {images}
      <img onError={onload} src="" />
    </div>
  )
  
  export default LazyLoad