import ajaxs from './ajaxs';

const dynamic = {
	data: {
		namespace: 'dynamic',

		state: {
			total: 100,        // 一共多少条数据
			list: [
				// { // 所有动态的数据 
				// 	whichGroup: { // 这条动态所属分组的信息
				// 		id: 0,
				// 		name: '',
				// 	},
				// 	title: '',
				// 	content: '',
				// 	approved: 0,
				// 	read: 0,
				// 	timestamp: 0,
				// }
			],

			group: [
				// { // 所有分组的数据
				// 	id: 0,
				// 	name: '',
				// 	children: [{
				// 		whichGroup: {
				// 			id: 0,
				// 			name: '',
				// 		},
				// 		title: '',
				// 		content: '',
				// 		approved: 0,
				// 		read: 0,
				// 		timestamp: 0,
				// 	}]
				// }
			],
			selectGroupId: 0,    // 选中的分组 默认第0 组

			preview: {        // 预览页面
				title: '',
				content: '',
			},
			edit: {           // 编辑的相关数据
				whichGroup: { // 所属分组的信息
					id: 0,
					name: ''
				},
				title: '',
				content: '',
				approved: 0,
				read: 0,
				time: 1600000000000,
			}
		},

		reducers: {	
			// 初始化 list 所有动态的数据
			initListAndGroup(state, data) {
				return {
					...state,
					list: data.list,
					group: data.group
				}
			},

			// 设置 选中分组的 id
			setSelectGroupId(state, data) { 
				return {
					...state,
					selectGroupId: data.selectGroupId
				}
			},

			// 设置 编辑页面的 标题
			setEditTitle(state, data) { 
				let newEdit = JSON.parse(JSON.stringify(state.edit));

				newEdit.title = data.title
				return {
					...state,
					edit: newEdit
				}
			},

			// 设置 编辑页面的 内容
			setEditContent(state, data) {
				let newEdit = JSON.parse(JSON.stringify(state.edit));

				newEdit.content = data.content
				return {
					...state,
					edit: newEdit
				}

			},

			// 设置 编辑页面的 相关数据
			initEditPage(state, data) { 
				return { //  初始化 selectGroupId 以及 edit preview
					...state,
					selectGroupId: data.selectGroupId,
					edit: data.edit,
					preview: data.preview,
				}

			},
		}
	},

	init: function (app) {
		ajaxs.getByListAndGroup() // 从远程服务器获取记录的列表与分组
		.then(
			val => app._store.dispatch({ // 获取成功则初始化数据
				type: 'dynamic/initListAndGroup',
				list: val.list,
				group: val.group
			}), 
			error => alert(error)// 获取失败则弹出失败信息
		);
	}
}

export default dynamic;
