module.exports = {
    css: {
        loaderOptions: {
            postcss: {
                plugins: [
                    // 把px单位换算成rem单位
                    require("postcss-pxtorem")({
                        rootValue: 136, // 换算的基数(设计图750的根字体为32，设计图是1920*1080，则为192;现在电脑是1366的，设置为136，方便)
                        selectorBlackList: [".van"],// 要忽略的选择器并保留为px。
                        propList: ["*"], //可以从px更改为rem的属性。
                        minPixelValue: 2 // 设置要替换的最小像素值。
                    })
                ]
            }
        }
    }
}