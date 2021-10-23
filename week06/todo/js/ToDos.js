import {
    readFromLS,
	writeToLS,
	removeFromLS
} from './ls.js';

import {
	qs,
	onTouch
} from './utilities.js'

export default class ToDos {
	constructor() {
		this.list = [];
		this.key = 'list';
	}

	loadList() {
		let list = getTodos(this.key);
		if (list !== null) {
			this.list = list;
		}
		return this.list;
	}

	listTodos(checked) {
		checked  = checked ? checked : 'all';
		renderTodoList(this.list, qs('#list')[0]);
		renderFooter(this.list, checked, qs('#list-container')[0]);
		let that = this;
		onTouch('.checkbox', (event) => that.toggleTodo(event.target));
		onTouch('.remove-btn', (event) => that.removeTodo(event.target));
		onTouch('input[name=filter]', (event) => that.filterTodos(event.target.id));
	}

	addTodo() {
		let element = qs("#item-input")[0];
		let content = element.value;
		let id = Date.now();
		let task = {
			id: id, 
			content: content, 
			completed: false
		}
		let list = [];
		list = getTodos(this.key);
		list.push(task);
		// this.list.push(task);
		saveTodo(id, task);
		saveTodo(this.key, list);
		this.filterTodos();
		element.value = '';
		element.focus();
	}

	toggleTodo(target) {
		let listItem = target.closest('.list-item');
		let list = getTodos(this.key);
		let task = list.map(function(item){
			if(item.id === Number(listItem.id)) {
				item.completed = !item.completed;
			}
			return item;
		}).find((item) => { return item.id === Number(listItem.id); });
		
		saveTodo(task.id, task);
		saveTodo(this.key, list);
		this.filterTodos();
	}

	removeTodo(target) {
		let listItem = target.closest('.list-item');
		let list = getTodos(this.key).filter((item) => { return item.id !== Number(listItem.id); });
		this.list = list;
		removeFromLS(listItem.id);
		saveTodo(this.key, list);
		this.filterTodos();
	}

	filterTodos() {
		let radioQSElement = qs('input[name=filter]:checked')[0];
		let selected = radioQSElement ? radioQSElement.value : 'all';
		switch(selected){
			case 'all':
				this.list = getTodos(this.key);
				break;
			case 'active':
				this.list = getTodos(this.key).filter((item) => { return !item.completed; });
				break;
			case 'completed':
				this.list = getTodos(this.key).filter((item) => { return item.completed; });
				break;
			default:
				this.list = getTodos(this.key);
		}		
		this.listTodos(selected);
	}
}


function getTodos(key) {
	let todoList = readFromLS(key)
	return todoList ? todoList : [];
}

function saveTodo(key, task) {
	writeToLS(key, task);
}

function renderTodoList(list, element) {
	element.innerHTML = '';
	list.forEach((item) => {
		let checked = item.completed ? 'checked' : '';
		const itemElement = document.createElement('div');
		itemElement.className = 'list-item';
		itemElement.id = item.id;
		itemElement.innerHTML = `<div class="left">
		<input type="checkbox" class="checkbox" ${checked}>
		<span class="checkmark"></span>
		<span>${item.content}</span></div>
		<span class="remove-btn">X</span>`;
		element.appendChild(itemElement);
	  });
	  if(list.length === 0) {
		const itemElement = document.createElement('div');
		itemElement.id = 'empty-state';
		itemElement.innerHTML = `No items for selected filter`;
		element.appendChild(itemElement);
	  }
}

function renderFooter(list, checked, element) {
	element.removeChild(element.lastChild);
	let numTasks = list.filter((item) => { return !item.completed; }).length;
	let allChecked = checked === 'all' ? 'checked' : '';
	let activeChecked = checked === 'active' ? 'checked' : '';
	let completedChecked = checked === 'completed' ? 'checked' : '';
	let numTasksText = 'tasks left';
	const footer = document.createElement('div');
	footer.id = 'list-footer';
	footer.innerHTML = `<span>${numTasks} ${numTasksText}</span>
	<div><input type="radio" id="all" name="filter" value="all" ${allChecked}>
	<label for="all">All</label>
	<input type="radio" id="active" name="filter" value="active" ${activeChecked}>
	<label for="active">Active</label>
	<input type="radio" id="completed" name="filter" value="completed" ${completedChecked}>
	<label for="completed">Completed</label></div>`;
	element.appendChild(footer);
}
