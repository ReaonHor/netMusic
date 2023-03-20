import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
	state:{
		topListId:[],
		nextId:''
	},
	mutations: {
		init_id(state,payload) {
			state.topListId = payload
		},
		next_id(state,payload) {
			for(var i = 0; i<state.topListId.length;i++) {
				if(state.topListId[i].id == payload) {
					state.nextId = state.topListId[i+1].id
				}
			}
		}
	}
})