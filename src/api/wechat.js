import * as base64 from "base-64"
import * as utf8 from "utf8" 
import Vue from 'vue'
function getQyConfig() {
    return new Promise(function (resolve, reject) {
        Vue.http.post('/mobile/api/qyconfig').then(data => {
            data.ok && resolve(data.body)
            !data.ok && reject()
        }, error => { reject() });
    })
}
function getQyConfig2() {
    return new Promise(function (resolve, reject) {
        resolve({
            corpid: 'a6d6015b-847e-43b3-9bb9-752e78b09392',
            accesstoken: 'cE0-feXge32c-fjo'
        })
    })
}

function getJssdk(qyconfig) {
    let weChatUrlBase = 'http://qy.mgcc.com.cn/WeChatService/wxapi/jssdkjsonp?corpid='
        + qyconfig.corpid + '&accesstoken=' + qyconfig.accesstoken + '&callurl=';
    let weChatUrl = weChatUrlBase + base64.encode(utf8.encode(location.href.split('#')[0]));
    return new Promise(function (resolve, reject) {
        Vue.http.jsonp(weChatUrl).then(data => {
            if (data.ok) {
                var config_obj = data.body;
                wx.config({
                    debug: false,
                    appId: config_obj.appId,
                    timestamp: config_obj.timestamp,
                    nonceStr: config_obj.nonceStr,
                    signature: config_obj.signature,
                    jsApiList: [
                        // 所有要调用的 API 都要加到这个列表中
                        'hideOptionMenu',
                        'getLocation',
                        'chooseImage',
                        'uploadImage',
                    ]
                });
                wx.ready(function () {
                    resolve()
                });
                wx.error(function (res) {
                    reject({
                        type: 'wxerror',
                        data: res
                    })
                });
            }
            else {
                reject({
                    type: 'ajaxerror',
                    data: data
                })
            }
        }, error => {
            reject({
                type: 'ajaxerror',
                data: error
            })
        });
    })
}

export { getQyConfig2 as getQyConfig, getJssdk }