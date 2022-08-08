const addTaskBtn = document.getElementById('addTask');
const epicLink = document.getElementById('epicLink');
const taskLink = document.getElementById('taskLink');
const taskDescription = document.getElementById('taskDescription');
const tasksList = document.querySelector('#tasksList');

function buildUniqueId(prefix = 'task') {
    return prefix + '-' + Math.floor(Math.random() * Date.now());
}

const state = {
    epicLink: '',
    taskLink: '',
    taskDescription: '',
    tasks: []
};

function init() {
    epicLink.addEventListener('change', handleEpicLinkChange);
    taskLink.addEventListener('change', handleTaskLinkChange);
    taskDescription.addEventListener('change', handleTaskDescriptionChange);
    addTaskBtn.addEventListener('click', handleTaskSubmit);
    renderInput();
    renderTaskList();
}

function renderInput() {
    epicLink.value = state.epicLink;
    taskLink.value = state.taskLink;
    taskDescription.value = state.taskDescription;
}

function renderTaskList() {
    const frag = document.createDocumentFragment();

    state.tasks.forEach((task) => {
        const item = buildTaskItemEl(task.id, task.epicLink, task.taskLink, task.taskDescription);
        frag.appendChild(item);
    });

    while (tasksList.lastChild) {
        tasksList.removeChild(tasksList.lastChild);
    }
    tasksList.appendChild(frag);

}

function buildTaskItemEl(id, epicLinkValue, taskLinkValue, taskDescriptionValue) {
    const taskItem = document.createElement('li');
    taskItem.id = id;

    taskItem.appendChild(createTaskColNode(epicLinkValue, 's2'));
    taskItem.appendChild(createTaskColNode(taskLinkValue, 's2'));
    taskItem.appendChild(createTaskColNode(taskDescriptionValue, 's6'));
    
    taskItem.appendChild(buildDeleteButtonEl(id));

    return taskItem;
}

const createTaskColNode = (text, gridColSize) => {
    const span = document.createElement('span');
    const textContent = document.createTextNode(text);
    span.className = `col ${gridColSize}`;
    
    span.appendChild(textContent);
    return span;
}

function buildDeleteButtonEl(id) {
    const button = document.createElement('a');
    const textContent = document.createTextNode('Remove');

    button.className = 'waves-effect waves-teal btn-flat secondary-color centered';
    button.addEventListener('click', handleTaskDeleteButtonClick.bind(null, id));
    button.appendChild(textContent);

    return button;
}

function handleEpicLinkChange(e) {
    state.epicLink = e.target.value;
}

function handleTaskLinkChange(e) {
    state.taskLink = e.target.value;
}

function handleTaskDescriptionChange(e) {
    state.taskDescription = e.target.value;
}

function handleTaskSubmit(e) {
    e.preventDefault();
    const newTask = {
        epicLink: state.epicLink,
        taskLink: state.taskLink,
        taskDescription: state.taskDescription,
        id: buildUniqueId('task')

    }
    state.tasks = [...state.tasks, newTask];
    state.epicLink = '';
    state.taskLink = '';
    state.taskDescription = '';
    renderInput();
    renderTaskList();
}

function handleTaskDeleteButtonClick(id) {
    state.tasks = state.tasks.filter((t) => t.id !== id);
    renderTaskList();
}

document.addEventListener('DOMContentLoaded', init);
