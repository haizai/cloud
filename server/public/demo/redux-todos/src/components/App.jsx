import React from 'react';

import Title from './Title.jsx';
import Head from './Head.jsx';
import Body from './Body.jsx';
import Foot from './Foot.jsx';

export default class App extends React.Component {
  render() {
    const {todos, visibility, addTodo, changeVisibility, delSelectedTodos, delTodo, submitEdit, toggle, toggleAll} = this.props,
      isAllSelected   = ( todos.length && todos.every( todo => todo.selected ) ) ? true : false,
      selectedCount   = todos.filter( todo => todo.selected ).length,
      footStyle       = todos.length === 0 ? 'none' : 'block',
      visibilityTodos = todos.filter( todo => {
        switch (visibility) {
          case '全部'       : return true;
          case '被选中的'   : return todo.selected;
          case '未被选中的' : return !todo.selected;
        };
      });
    return (
      <div className='container'>
        <Title />
        <Head
          isAllSelected={isAllSelected}
          addTodo={addTodo}
          toggleAll={toggleAll}
        />      
        <Body
          todos={visibilityTodos}
          delTodo={delTodo}
          toggle={toggle}
          submitEdit={submitEdit}
        />   
        <Foot
          footStyle={footStyle}
          selectedCount={selectedCount}
          visibility={visibility}
          delSelectedTodos={delSelectedTodos}
          changeVisibility={changeVisibility}
        />
      </div>
    );
  }
};