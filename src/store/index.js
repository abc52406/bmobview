import Vue from 'vue'
import Vuex from 'vuex'
import project from './modules/project'
import * as state from './state'
import * as actions from './actions'
//import createLogger from '../plugins/logger'

Vue.use(Vuex)
export default new Vuex.Store({
    actions,
    state,
    modules: { 
        project
    },
    //strict: debug,
    //plugins: debug ? [createLogger()] : []
})
