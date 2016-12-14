import React from 'react';

export default class Title extends React.Component {
  render() {
    return (
      <div className='title'>
        <p>Redux Todos</p>
        <p className="author"><a href="https://github.com/haizai" target="_black">By Haizai</a></p>
      </div>
    )
  }
}