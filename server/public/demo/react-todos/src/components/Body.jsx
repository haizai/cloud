import React from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

import Todo from './Todo.jsx'

export default class Body extends React.Component {
  render() {
    const {todos,...methods} = this.props;
    return (
      <div className='body'>
      <ReactCSSTransitionGroup 
        transitionName="fade"
        transitionEnterTimeout={300} 
        transitionLeaveTimeout={300}>      
      {
        todos.map((todo, index)=>{
          return (
              <Todo
                methods={methods}
                index={index}
                text={todo.text} 
                selected={todo.selected}
                key={todo.key}
              />
          )
        })
      }
      </ReactCSSTransitionGroup>
      </div>
    )
  }
}