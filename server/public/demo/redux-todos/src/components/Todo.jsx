import React from 'react';

export default class Todo extends React.Component {
   constructor(props) {
    super(props);
    this.state = {delShow: 'none'};
  } 
  todoDelShow() {
    this.setState({delShow: 'block'});
  }
  todoDelHide() {
    this.setState({delShow: 'none'}); 
  }
  tryEdit(e) {
    let input = e.target.nextSibling;
    input.value = e.target.innerHTML;
    input.style.display = 'inline-block';
    input.select();
    input.focus();
  }
  submitEdit(e, index) {
    if (e.type == 'keydown') {
      if (e.keyCode === 13) e.target.blur();
      return;
    };
    if (e.target.value.trim()) {
      e.target.style.display = 'none';
      this.props.submitEdit(e.target.value, index);
    } else {
      this.props.delTodo(index);
    };
  }
  render() {
    const {index, selected, text, delTodo, toggle} = this.props,
      roundClass = selected ? 'round round-selected' : 'round',
      labelClass = selected ? 'body-label body-label-selected' : 'body-label';
    return (
      <div 
        className='body-item' 
        onMouseEnter={()=>this.todoDelShow()}
        onMouseMove={()=>this.todoDelShow()}
        onMouseLeave={()=>this.todoDelHide()}>
        <i 
          className={roundClass}
          onClick={()=>toggle(index)}
        />
        <div 
          className={labelClass}
          onClick={this.tryEdit}
        >{text}</div>
        <input 
          type='text' 
          className='body-input' 
          style={{display: 'none'}}
          onKeyDown={e=>this.submitEdit(e, index)}
          onBlur={e=>this.submitEdit(e, index)}
        />
        <i 
          className='body-del' 
          style={{display: this.state.delShow}}
          onClick={()=>{delTodo(index)}}
        >&times;</i>
      </div>
    )
  }
};