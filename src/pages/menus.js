//统一报错页
import ErrorPage from './Error.html'
//其他页面
import ProjectList from './project/List.html'
import ProjectEdit from './project/Edit.html'
import TableList from './table/List.html'
import TableEdit from './table/Edit.html'
import RecordList from './record/List.html'
import RecordEdit from './record/Edit.html'
//自定义方法
import { GetQueryString } from '../components/util'

const urls = new Map()
urls.set('projectlist', '/project/list')
urls.set('projectedit', '/project/edit')
urls.set('tablelist', '/table/list')
urls.set('tableedit', '/table/edit')
urls.set('recordlist', '/record/list')
urls.set('recordedit', '/record/edit')

const paths = [
    {
        path: '*', component: ErrorPage, beforeEnter: (to, from, next) => {
            document.title = '错误'
            next()
        }
    },
    {
        path: '/error', name: 'error', component: ErrorPage, beforeEnter: (to, from, next) => {
            document.title = '错误'
            next()
        }
    },
    {
        path: '/', redirect: to => {
            //根据url参数重定向到对应的初始页面
            const url = GetQueryString('url')
            return urls.has(url) ? urls.get(url) : '/project/list'
        }
    },
    {
        path: '/project/list', name: 'projectlist', component: ProjectList, beforeEnter: (to, from, next) => {
            document.title = '项目列表'
            next()
        }
    },
    {
        path: '/project/edit/:id', name: 'projectedit', component: ProjectEdit, beforeEnter: (to, from, next) => {
            document.title = '项目详情'
            next()
        }
    },
    {
        path: '/table/list/:id', name: 'tablelist', component: TableList, beforeEnter: (to, from, next) => {
            document.title = '表格列表'
            next()
        }
    },
    {
        path: '/table/edit/:id', name: 'tableedit', component: TableEdit, beforeEnter: (to, from, next) => {
            document.title = '表格详情'
            next()
        }
    },
    {
        path: '/record/list/:id', name: 'recordlist', component: RecordList, beforeEnter: (to, from, next) => {
            document.title = '数据列表'
            next()
        }
    },
    {
        path: '/record/edit/:id', name: 'recordedit', component: RecordEdit, beforeEnter: (to, from, next) => {
            document.title = '数据详情'
            next()
        }
    },
]

export default {
    paths
}
