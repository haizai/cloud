import NAME from '../NAME';

const initVisibility = window.localStorage.getItem(NAME) 
  ? JSON.parse(window.localStorage.getItem(NAME)).visibility
  : '全部';

export default (visibility = initVisibility, action) => {
  switch (action.type) {
    case 'CHANGE_VISIBILITY':
      return action.visibility;
    default:
      return visibility;
  }
}