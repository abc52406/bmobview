import * as types from '../mutation-types'
import * as bmobext from '../../components/bmobext'
const state = {
    //项目列表
    projects: [
        {
            name: '听写宝', id: '8adb5906ee603ea417e5f9ec880e5d75', key: '462c43c4e3c9cd88358550a2df0ffab5', tables: [
                {
                    name: '反馈', code: 'feedback', fields: [
                        { name: '创建日期', code: 'createdAt', type: 'date', title: 1 },
                        { name: 'openid', code: 'openid', type: 'input' },
                        { name: '内容', code: 'content', type: 'textarea', subtitle: 1},
                        { name: '图片', code: 'images', type: 'imagesArray' },
                    ]
                },
                {
                    name: '用户', code: 'personinfo', fields: [
                        { name: '昵称', code: 'nickname', type: 'input', title: 1 },
                        { name: '创建日期', code: 'createdAt', type: 'date', subtitle: 1 },
                        { name: 'openid', code: 'openid', type: 'input' },
                        { name: '头像', code: 'headimgurl', type: 'imageurl' },
                    ]
                },
                {
                    name: '听写本', code: 'personbook', fields: [
                        { name: '名称', code: 'name', type: 'input', title: 1 },
                        { name: '创建日期', code: 'createdAt', type: 'date', subtitle: 1 },
                        { name: 'openid', code: 'openid', type: 'input' },
                        { name: '内容', code: 'content', type: 'textarea' },
                        { name: '教材', code: 'categoryname', type: 'input' },
                        { name: '科目', code: 'subject', type: 'enum', enum: [{ value: 'en', text: '英语' }, { value: 'ch', text: '语文' }] },
                        { name: '分类', code: 'type', type: 'enum', enum: [{ value: 0, text: '标准教材' }, { value: 1, text: '自制听写本' }] },
                        { name: '所属专辑', code: 'sharename', type: 'input' },
                        { name: '浏览次数', code: 'viewcount', type: 'input' },
                        { name: '复制次数', code: 'copycount', type: 'input' },
                    ]
                },
                {
                    name: '专辑', code: 'personsharelist', fields: [
                        { name: '名称', code: 'name', type: 'input', title: 1 },
                        { name: '创建日期', code: 'createdAt', type: 'date', subtitle: 1 },
                        { name: 'openid', code: 'openid', type: 'input' },
                        { name: '封面', code: 'imgurl', type: 'imageurl' },
                    ]
                },
            ]
        },
        {
            name: '单位换算', id: 'e8f957e61b16c05a9e88e1d106ceb295', key: '3bf73dfed04123e99862f9d46bb34942', tables: [
                {
                    name: '反馈', code: 'feedback', fields: [
                        { name: '创建日期', code: 'createdAt', type: 'date', title: 1 },
                        { name: 'openid', code: 'openid', type: 'input' },
                        { name: '内容', code: 'content', type: 'textarea', subtitle: 1 },
                        { name: '图片', code: 'images', type: 'imagesArray' },
                    ]
                },
            ]
        },
        {
            name: '单位换算2', id: '6d3ff236507be776a6fb142e95036b4f', key: '2f5aaeb512b947c6a7a21aad57a83e8e', tables: [
                {
                    name: '反馈', code: 'feedback', fields: [
                        { name: '创建日期', code: 'createdAt', type: 'date', title: 1 },
                        { name: 'openid', code: 'openid', type: 'input' },
                        { name: '内容', code: 'content', type: 'textarea', subtitle: 1 },
                        { name: '图片', code: 'images', type: 'imagesArray' },
                    ]
                },
            ]
        },
    ],
    currentproject: {},
    currenttable: {},
    records: [],
    pagesize: 0,
    pageindex: 0,
    sortfield: '',
    sorttype: 'desc',
}

const getters = {
    projecttitle: state => state.currentproject.name,
    tabletitle: state => state.currentproject.name + '-' + state.currenttable.name
}

const actions = {
    //查询关键字
    getProject({ state }, id) {
        return new Promise((resolve, reject) => {
            var data = state.projects.filter(function (item) {
                return item.id === id
            })
            if (data.length > 0) {
                resolve(data[0])
            }
            else
                reject()
        })
    },
    //查询关键字
    getTable({ state }, { code }) {
        return new Promise((resolve, reject) => {
            var project = state.projects.filter(function (item) {
                return item.id === state.currentproject.id
            })
            if (project.length > 0) {
                var table = project[0].tables.filter(function (item) {
                    return item.code === code
                })
                if (table.length > 0) {
                    resolve(table[0])
                }
                else
                    reject()
            }
            else
                reject()
        })
    },
    getRecords({ commit, state }) {
        return new Promise((resolve, reject) => {
            var t = Bmob.Object.extend(state.currenttable.code);
            var query = new Bmob.Query(t);
            query.limit(state.pagesize || 20);
            query.skip((state.pagesize || 20) * (state.pageindex || 0));
            if (state.sortfield) {
                if (state.sorttype === 'desc')
                    query.descending(state.sortfield);
                else
                    query.ascending(state.sortfield);
            }
            query.find({
                success: function (results) {
                    if (!(state.pageindex || 0))
                        commit(types.Set_Records, { records: [] })
                    var titlefield = state.currenttable.fields.filter(function (item) {
                        return item.title
                    })
                    var descfield = state.currenttable.fields.filter(function (item) {
                        return item.desc
                    })
                    var subtitlefield = state.currenttable.fields.filter(function (item) {
                        return item.subtitle
                    })
                    for (var i = 0; i < results.length; i++) {
                        var object = results[i];
                        var r = {};
                        r.id = bmobext.GetBmobFieldString(object, 'objectId')
                        if (titlefield.length) {
                            r.title = bmobext.GetBmobFieldString(object, titlefield[0].code, titlefield[0].type, titlefield[0].enum)
                        }
                        if (descfield.length) {
                            r.desc = bmobext.GetBmobFieldString(object, descfield[0].code, descfield[0].type, descfield[0].enum)
                        }
                        if (subtitlefield.length) {
                            r.subtitle = bmobext.GetBmobFieldString(object, subtitlefield[0].code, subtitlefield[0].type, subtitlefield[0].enum)
                        }
                        commit(types.Add_Record, { record: r })
                    }
                    commit(types.Set_PageIndex, { index: state.pageindex + 1 })
                    resolve(results)
                },
                error: function (error) {
                    reject(error)
                }
            });
        })
    },
    getRecord({ commit, state }, { id }) {
        return new Promise((resolve, reject) => {
            var t = Bmob.Object.extend(state.currenttable.code);
            var query = new Bmob.Query(t);
            query.get(id, {
                success: function (model) {
                    var result = state.currenttable.fields.map(function (item) {
                        return { name: item.name, value: bmobext.GetBmobFieldString(model, item.code, item.type, item.enum), type: item.type}
                    })
                    resolve(result)
                },
                error: function (object, error) {
                    reject(object, error)
                }
            });
        })
    },
}
const mutations = {
    //设置当前项目
    [types.Set_CurrentProject](state, { project }) {
        state.currentproject = project
    },
    //设置当前表
    [types.Set_CurrentTable](state, { table }) {
        state.currenttable = table
    },
    //设置当前数据
    [types.Set_Records](state, { records }) {
        state.records = records
    },
    //追加当前数据
    [types.Add_Record](state, { record }) {
        state.records.push(record)
    },
    //追加当前数据
    [types.Add_Records](state, { records }) {
        state.records.unshift(records)
    },
    //设置页面尺寸
    [types.Set_PageSize](state, { size }) {
        state.pagesize = size
    },
    //设置页码
    [types.Set_PageIndex](state, { index }) {
        state.pageindex = index
    },
    //设置排序字段
    [types.Set_SortField](state, { field }) {
        state.sortfield = field
    },
    //设置排序类型
    [types.Set_SortType](state, { type }) {
        state.sorttype = type
    },
}
export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}
