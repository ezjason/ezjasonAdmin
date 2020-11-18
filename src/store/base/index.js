export default {
  state: {
    name: 'ezjason',
    color: '#F1BD4E'
  },
  mutations: {
    changeName (state, val) {
      state.name = val
    },
    changeColor(state,val){
      state.color = val
    }
  },
  actions: {}
}
