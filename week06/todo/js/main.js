import ToDos from './ToDos.js';
import {qs, onTouch} from './utilities.js';

const controller = {
  //on load grab the array and insert it into the page
  load() {
    this.todoList = new ToDos();
    let that = this;
    window.addEventListener('load', () => {
      that.todoList.loadList();
      that.todoList.listTodos();
      buildListFooter();
    });
    onTouch('#add-button', () => {
      that.todoList.addTodo();
    });
    qs('form')[0].addEventListener('submit', (event) => {
        event.preventDefault();
        that.todoList.addTodo();
    });
  }
}

controller.load();

function buildListFooter() {
  
}