const addTaskBtn = document.getElementById('btn-addTask');
const taskTextInput = document.getElementById('task-text');
const removeAllTask = document.getElementById('btn-removeAll');
const readyAllTask = document.getElementById('btn-readyAll');
const taskWrapper = document.querySelector('.task');

let tasks;

!localStorage.tasks ? tasks = [] : tasks = JSON.parse(localStorage.getItem('tasks'));

let todoItemElems = [];
let todoItemStatus = [];


const task = {
	taskText: 'dsadwqerqw',
	status: false,
}

function Task(taskText) {
	this.taskText = taskText;
	this.status = false;
}

const createTemplate = (elem, key) => {
	return `<div class="task__item">
	<div class="task__control">
		<div class="task__text">${elem.taskText}</div>
		<div class="task__btn">
			<button onclick="readyTask(${key})" class="btn-ready">${elem.status ? 'unready' : 'ready'}</button>
			<button onclick="deleteTask(${key})" class="btn-remove">delete</button>
		</div>
	</div>
	<div class="task__status">
		<div class="task__status-indicator ${elem.status ? 'active' : ''}">
		<div class="task__status-indicatorSmall ${elem.status ? 'active' : ''}"></div>
		</div>
	</div>
</div>`
}

const addHtmlContent = () => {
	taskWrapper.innerHTML = '';
	if (tasks.length > 0) {
		tasks.forEach((elem, key) => {
			taskWrapper.innerHTML += createTemplate(elem, key);
		});
		todoItemStatus = document.querySelectorAll('.task__status-indicator');
		todoItemElems = document.querySelectorAll('.task__item');

	}
}

addHtmlContent();

const loadLocal = () => {
	localStorage.setItem('tasks', JSON.stringify(tasks))
}

const readyTask = key => {
	tasks[key].status = !tasks[key].status;
	if (tasks[key].status) {
		todoItemStatus[key].classList.add('active');
	} else {
		todoItemStatus[key].classList.remove('active');
	}
	loadLocal();
	addHtmlContent();
}



addTaskBtn.addEventListener('click', () => {
	if (taskTextInput.value && (/[a-zа-яё]/i.test(taskTextInput.value) || /[0-9]/.test(taskTextInput.value))) {
		tasks.push(new Task(taskTextInput.value));
		loadLocal();
		addHtmlContent();
		taskTextInput.value = '';
	} else {
		taskTextInput.value = '';
	}
})

const chekEnter = (key) => {
	let check = key.keyCode || key.which;
	if (taskTextInput.value && (/[a-zа-яё]/i.test(taskTextInput.value) || /[0-9]/.test(taskTextInput.value))) {
		if (check === 13) {
			tasks.push(new Task(taskTextInput.value));
			loadLocal();
			addHtmlContent();
			taskTextInput.value = '';
		}
	} else {
		taskTextInput.value = '';
	}
}


const deleteTask = key => {
	todoItemElems[key].classList.add('removeItem')
	setTimeout(() => {

		tasks.splice(key, 1);
		loadLocal();
		addHtmlContent();
	}, 500)
}

removeAllTask.addEventListener('click', () => {
	taskWrapper.innerHTML = '';
	tasks = [];
	loadLocal();
	taskTextInput.value = '';
})


readyAllTask.addEventListener('click', () => {
	if (tasks.every(elem => elem.status)) {
		tasks.forEach(elem => {
			elem.status = false;
			readyAllTask.innerHTML = 'ready all';
		});
	} else {
		tasks.forEach(elem => {
			elem.status = true;
		});
		readyAllTask.innerHTML = 'unready all';
	}
	loadLocal();
	addHtmlContent();
})

