import React from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

import Todo from './Todo.jsx';

export default class Body extends React.Component {
  render() {
    const {todos, delTodo, submitEdit, toggle} = this.props;
    return (
      <ReactCSSTransitionGroup
        className='body'
        transitionName="fade"
        transitionEnterTimeout={300} 
        transitionLeaveTimeout={300}>      
        {
          todos.map((todo, index)=>{
            return (
              <Todo
                delTodo={delTodo}
                submitEdit={submitEdit}
                toggle={toggle}
                index={index}
                text={todo.text} 
                selected={todo.selected}
                key={todo.key}
              />
            )
          })
        }
      </ReactCSSTransitionGroup>
    )
  }
}