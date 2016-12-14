import NAME from '../NAME';

const initTodos = window.localStorage.getItem(NAME) 
  ? JSON.parse(window.localStorage.getItem(NAME)).todos
  : [{text: "默认todo1", selected: false, key: 0}, {text: "默认todo2", selected: true, key: 1}];

let key = initTodos.reduce((a, b) => {
  if (typeof a == 'object') a = a.key;
  if (typeof b == 'object') b = b.key;
  return Math.max(a, b);
})

export default (todos = initTodos, action) => {
  switch (action.type) {
    case 'ADD_TODO':
      return [...todos, {text: action.text, selected: false, key: ++key}];
    case 'DEL_TODO':
      todos.splice(action.index, 1)
      return [...todos];
    case 'TOGGLE':
      todos[action.index].selected = !todos[action.index].selected;
      return [...todos];
    case 'TOGGLE_ALL':
      todos.every( todo => todo.selected )
      ? todos.forEach( todo => todo.selected = false )
      : todos.forEach( todo => todo.selected = true );
      return [...todos];
    case 'SUBMIT_EDIT':
      todos[action.index].text = action.text;
      return [...todos];
    case 'DEL_SELECTED_TODOS':
      return todos.filter( todo => !todo.selected );
    default:
      return todos;
  }
}