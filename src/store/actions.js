import * as util from '../components/util'

export const adjustbody = ({ rootState }, diff) => {
    const w = rootState.winWidth
    const h = rootState.winHeight
    $(".page").width(w).height(h);
    $(".search-body").width(w).height(h - (diff || 84));
}

export const alert = ({ commit }, msg) => {
    util.alert(msg)
}

export const confirm = ({ commit }, { msg, btnA, btnB, submit_fun, cancel_fun}) => {
    util.confirm(msg, btnA, btnB, submit_fun, cancel_fun)
}
