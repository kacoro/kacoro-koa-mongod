import React from 'react';
import ReactDOM from 'react-dom';
import Router from './router/client'
import { loadableReady } from '@loadable/component'

function renderUI(initialData,initPath){
    loadableReady(() => {
        const root = document.getElementById('root')
        ReactDOM.hydrate(<Router  initialData={initialData} initPath={initPath}  />, root)
    })
}

//函数执行入口
function entryIndex() {
    let APP_INIT_DATA = {};
    let state = true;
    //取得数据
    let stateText = document.getElementById('krs-server-render-data-BOX');
    if (stateText) {
    APP_INIT_DATA = JSON.parse(stateText.value || '{}');
    }
    if (APP_INIT_DATA) {//客户端渲染
    let APP_INIT_PATH = location.pathname + location.search
    renderUI(APP_INIT_DATA,APP_INIT_PATH);
    }
}
//入口执行
entryIndex();
