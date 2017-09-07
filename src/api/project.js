import Vue from 'vue'
function getDashBoardData(param) {
    return new Promise(function (resolve, reject) {
        Vue.http.post("/Project/Mobile/ProjectMacArea/GetDashBoardData", param).then(data => {
            data.ok && resolve(data.body)
            !data.ok && reject()
        }, error => { reject() });
    })
}
function getMacMachineList(param) {
    return new Promise(function (resolve, reject) {
        Vue.http.post("/Project/Mobile/ProjectMacMachine/GetList", param).then(data => {
            data.ok && resolve(data.body)
            !data.ok && reject()
        }, error => { reject() });
    })
}

export default { getDashBoardData, getMacMachineList }