# novelManagerSystem
小说管理系统（练手）
自适应pc端(需要修改node_modules)：
1.下载node依赖后，找到  lib-flexible中的flexible.js
2.找到此js文件的refreshRem方法
3.将固定的540改成width
-----       if (width / dpr > 540) {
                 width = width * dpr;
             }
