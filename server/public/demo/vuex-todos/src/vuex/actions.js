
export const addTodo = makeAction ('ADD_TODO')
export const delTodo = makeAction ('DEL_TODO')
export const toggle = makeAction ('TOGGLE')
export const delSelectedTodos = makeAction ('DEL_SELECTED_TODOS')
export const changeVisibility = makeAction ('CHANGE_VISIBILITY')
export const toggleAll = makeAction ('TOGGLE_ALL')
export const changeText = makeAction ('CHANGE_TEXT')

function makeAction (type) {
  return ({ dispatch }, ...args) => dispatch(type, ...args)
}
