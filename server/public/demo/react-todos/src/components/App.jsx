import React from 'react';

import Title from './Title.jsx';
import Head from './Head.jsx';
import Body from './Body.jsx';
import Foot from './Foot.jsx';

const NAME = 'react-todos-Haizai^0.1';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = JSON.parse(window.localStorage.getItem(NAME)) || {
      todos: [{text: "默认todo1", selected: false, key: 0}, {text: "默认todo2", selected: true, key: 1}],
      visibility: '全部',
      allKey: 1
    };
  }
  componentDidUpdate(prevProps, prevState) {
    window.localStorage.setItem(NAME, JSON.stringify(prevState));
  }
  addTodo(e) {
    if (e.keyCode === 13 && e.target.value.trim() !== '') {
      this.state.todos.push({
        text: e.target.value,
        selected: false,
        key: ++this.state.allKey
      });
      e.target.value = '';
      this.forceUpdate();
    };
  }
  toggleAll() {
    this.state.todos.every( todo => todo.selected )
      ? this.state.todos.forEach( todo => todo.selected = false )
      : this.state.todos.forEach( todo => todo.selected = true );
    this.forceUpdate();
  }
  delTodo(index) {
    this.state.todos.splice(index, 1);
    this.forceUpdate();
  }
  toggle(index) {
    this.state.todos[index].selected = !this.state.todos[index].selected;
    this.forceUpdate();
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
      this.state.todos[index].text = e.target.value;
      e.target.style.display = 'none';
    } else {
      this.state.todos.splice(index, 1);
    };
    this.forceUpdate();
  }
  delSelectedTodos() {
    this.setState({todos: this.state.todos.filter( todo => !todo.selected )});
  }
  changeVisibility(e) {
    this.setState({visibility: e.target.textContent.trim()});
  }
  render() {
    let isAllSelected = ( this.state.todos.length && this.state.todos.every( todo => todo.selected ) ) ? true : false,
      selectedCount   = this.state.todos.filter( todo => todo.selected ).length,
      footStyle       = this.state.todos.length === 0 ? 'none' : 'block',
      visibilityTodos = this.state.todos.filter( todo => {
        switch (this.state.visibility) {
          case '全部'       : return true;
          case '被选中的'   : return todo.selected;
          case '未被选中的' : return !todo.selected;
        };
      });
    const bodyMethods = {}
    return (
      <div className='container'>
        <Title />
        <Head 
          isAllSelected={isAllSelected}
          addTodo={this.addTodo.bind(this)}
          toggleAll={this.toggleAll.bind(this)}
        />      
        <Body
          todos={visibilityTodos}
          delTodo={this.delTodo.bind(this)}
          toggle={this.toggle.bind(this)}
          tryEdit={this.tryEdit.bind(this)}
          submitEdit={this.submitEdit.bind(this)}
        />   
        <Foot
          footStyle={footStyle}
          selectedCount={selectedCount}
          visibility={this.state.visibility}
          delSelectedTodos={this.delSelectedTodos.bind(this)}
          changeVisibility={this.changeVisibility.bind(this)}
        />
      </div>
    );
  }
};
