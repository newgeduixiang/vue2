import Vue from 'vue'
import Router from 'vue-router'
import Home from '../views/Home'
import Main from '../views/Main'

Vue.use(Router)



// let router = new Router({
// 	routes: [
// 		{
// 			path: '/',
// 			component: Home,
// 			children: [
// 				// 员工模块
// 				{ path: '/staff/create', component: () => import('../views/staff/Create') },
// 				{ path: '/staff/list/:page', component: () => import('../views/staff/List') },
// 				// 部门模块
// 				{ path: '/department/create', component: () => import('../views/department/Create') },
// 				{ path: '/department/list', component: () => import('../views/department/List') },
// 				// 测试模块
// 				{ path: '/exam/create', component: () => import('../views/exam/Create') },
// 				{ path: '/exam/list/:page', component: () => import('../views/exam/List') },
// 				{ path: '/exam/edit/:id', component: () => import('../views/exam/Edit') },
// 				{ path: '/exam/score/:id', component: () => import('../views/exam/Score') },
// 				{ path: '/exam/statics/:id', component: () => import('../views/exam/Statics') },
// 				// 个人中心
// 				{ path: '/user/info', component: () => import('../views/user/Info') },
// 				{ path: '/user/password', component: () => import('../views/user/Password') },
// 				{ path: '/user/avatar', component: () => import('../views/user/Avatar') },
// 				// 默认页面
// 				{ path: '*', component: Main }
// 			]
// 		}
// 	]
// })


// 定义公共路由规则
const routes = [
	{
		path: '/',
		component: Home,
		children: [
			// 个人中心
			{ path: '/user/info', component: () => import('../views/user/Info.vue'), name: '首页/信息管理/个人中心' },
			{ path: '/user/password', component: () => import('../views/user/Password'), name: '首页/信息管理/修改密码' },
			{ path: '/user/avatar', component: () => import('../views/user/Avatar'), name: '首页/信息管理/修改头像' },
			// 默认页面
			{ path: '*', name: '首页,重要信息', component: Main }
		]
	}
]

// 床架路由实例
let router = new Router();

// 设置路由方法， 根据store 数据内的用户权限返回对应的路由。
export function addRoutes(level) {
	// 根据权限添加路由
	switch (level) {
		case 1:
			routes[0].children.unshift(
				// 员工模块
				{ path: '/staff/create', name: '首页,员工管理,添加员工', component: () => import('../views/staff/Create') },
				{ path: '/staff/list/:page', name: '首页,员工管理,员工列表', component: () => import('../views/staff/List') },
				// 部门模块
				{ path: '/department/create', name: '首页,部门管理,添加部门', component: () => import('../views/department/Create') },
				{ path: '/department/list', name: '首页,部门管理,部门列表', component: () => import('../views/department/List') },
				// 测试模块
				{ path: '/exam/list/:page', name: '首页,测试管理,测试列表', component: () => import('../views/exam/List') },
				{ path: '/exam/edit/:id', name: '首页,测试管理,编辑测试', component: () => import('../views/exam/Edit') },
				{ path: '/exam/score/:id', name: '首页,测试管理,测试上分', component: () => import('../views/exam/Score') },
				{ path: '/exam/statics/:id', name: '首页,测试管理,测试统计', component: () => import('../views/exam/Statics') }
			)
			break;
		case 2:
			routes[0].children.unshift(
				// 员工模块
				{ path: '/staff/create', name: '首页,员工管理,添加员工', component: () => import('../views/staff/Create') },
				{ path: '/staff/list/:page', name: '首页,员工管理,员工列表', component: () => import('../views/staff/List') },
				// 测试模块
				{ path: '/exam/create', name: '首页,测试管理,添加测试', component: () => import('../views/exam/Create') },
				{ path: '/exam/list/:page', name: '首页,测试管理,测试列表', component: () => import('../views/exam/List') },
				{ path: '/exam/edit/:id', name: '首页,测试管理,编辑测试', component: () => import('../views/exam/Edit') },
				{ path: '/exam/score/:id', name: '首页,测试管理,测试上分', component: () => import('../views/exam/Score') },
				{ path: '/exam/statics/:id', name: '首页,测试管理,测试统计', component: () => import('../views/exam/Statics') }
			)
			break;
		case 3:
			routes[0].children.unshift(
				// 员工模块
				{ path: '/staff/list/:page', name: '首页,员工管理,员工列表', component: () => import('../views/staff/List') },
				// 测试模块
				{ path: '/exam/list/:page', name: '首页,测试管理,测试列表', component: () => import('../views/exam/List') },
				{ path: '/exam/statics/:id', name: '首页,测试管理,测试统计', component: () => import('../views/exam/Statics') }
			)
	}
	router.addRoutes(routes);
}

// 暴漏路由
export default router
