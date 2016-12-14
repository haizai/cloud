import React from 'react';

export default class Todo extends React.Component {
   constructor(props) {
    super(props);
    this.state = {
      delShow: 'none'
    };
  } 
  todoDelShow() {
    this.setState({delShow: 'block'});
  }
  todoDelHide() {
    this.setState({delShow: 'none'}); 
  }
  render() {
    const {index, selected, text, methods} = this.props,
      {delTodo, submitEdit, toggle, tryEdit} = methods,
      roundClass = selected ? 'round round-selected' : 'round',
      labelClass = selected ? 'body-label body-label-selected' : 'body-label';
    return (
      <div 
        className='body-item' 
        onMouseEnter={this.todoDelShow.bind(this)}
        onMouseMove={this.todoDelShow.bind(this)}
        onMouseLeave={this.todoDelHide.bind(this)}>
        <i 
          className={roundClass}
          onClick={()=>toggle(index)}
        />
        <div 
          className={labelClass}
          onClick={tryEdit}
        >{text}</div>
        <input 
          type='text' 
          className='body-input' 
          style={{display: 'none'}}
          onKeyDown={e=>submitEdit(e, index)}
          onBlur={e=>submitEdit(e, index)}
        />
        <i 
          className='body-del' 
          style={{display: this.state.delShow}}
          onClick={()=>delTodo(index)}
        >&times;</i>
      </div>
    )
  }
};