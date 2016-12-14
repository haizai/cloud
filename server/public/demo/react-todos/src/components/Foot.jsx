import React from 'react';

export default class Foot extends React.Component {
  render() {
    const {footStyle, delSelectedTodos, selectedCount, visibility, changeVisibility} = this.props,
      viss = ['全部', '被选中的', '未被选中的'];
    return (
      <div className='foot' style={{display: footStyle}}>
        <i className='foot-del' onClick={delSelectedTodos}>&times;</i>
        <span className='foot-info'> <span className='foot-count'>{selectedCount}</span> 项被选中</span>
        <span className='foot-visibility'>
        {
          viss.map( vis=>{
            let className = vis == visibility ? 'foot-visibility-in' : null;
            return (
              <span className={className} onClick={changeVisibility} key={vis}>
                {vis}&nbsp;
              </span>
            );
          })
        }
        </span>
      </div>
    )
  }
}