import React from 'react';

export default class Head extends React.Component {
  render() {
    const {isAllSelected, toggleAll, addTodo} = this.props,
      roundClass = isAllSelected ? 'round round-selected' : 'round';
    return (
      <div className='head'>
        <i className={roundClass} onClick={toggleAll}/>
        <input 
          className='head-input'
          type='text' 
          placeholder='请输入新的todo，按Enter确认'
          onKeyDown={addTodo}
        />
      </div>
    )
  }
}