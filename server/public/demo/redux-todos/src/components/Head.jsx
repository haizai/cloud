import React from 'react';

export default class Head extends React.Component {
  addTodo(e) {
    if (e.keyCode === 13 && e.target.value.trim() !== '') {
      this.props.addTodo(e.target.value);
      e.target.value = '';
    };
  }
  render() {
    const {isAllSelected, toggleAll} = this.props,
      roundClass = isAllSelected ? 'round round-selected' : 'round';
    return (
      <div className='head'>
        <i className={roundClass} onClick={toggleAll}/>
        <input 
          className='head-input'
          type='text' 
          placeholder='请输入新的todo，按Enter确认'
          onKeyDown={e=>this.addTodo(e)}
        />
      </div>
    )
  }
}
