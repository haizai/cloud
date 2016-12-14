export const addTodo          = text => ({type: 'ADD_TODO', text});
export const delTodo          = index => ({type: 'DEL_TODO', index});
export const toggle           = index => ({type: 'TOGGLE', index});
export const toggleAll        = () => ({type: 'TOGGLE_ALL'});
export const submitEdit       = (text, index) => ({type: 'SUBMIT_EDIT', text, index});
export const delSelectedTodos = () => ({type: 'DEL_SELECTED_TODOS'});
export const changeVisibility = visibility => ({type: 'CHANGE_VISIBILITY', visibility});