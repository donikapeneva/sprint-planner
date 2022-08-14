const addTaskBtn = document.getElementById('addTask');
const epicLink = document.getElementById('epicLink');
const taskLink = document.getElementById('taskLink');
const taskDescription = document.getElementById('taskDescription');
const tasksList = document.querySelector('#tasksList');
const error = document.getElementById('error-response');
const success = document.getElementById('success-response');

const sprintId = document.getElementById('sprint-id');
const sprintPassword = document.getElementById('sprint-password');
const createSprintBtn = document.getElementById('create-sprint-btn');

function buildUniqueId(prefix = 'task') {
    return prefix + '-' + Math.floor(Math.random() * Date.now());
}

const state = {
    sprintId: '',
    sprintPassword: '',
    epicLink: '',
    taskLink: '',
    taskDescription: '',
    tasks: []
};

function init() {
    epicLink.addEventListener('change', (e) => handleFieldChange(e.target.value, 'epicLink'));
    taskLink.addEventListener('change', (e) => handleFieldChange(e.target.value, 'taskLink'));
    taskDescription.addEventListener('change', (e) => handleFieldChange(e.target.value, 'taskDescription'));
    addTaskBtn.addEventListener('click', handleAddTask);

    sprintId.addEventListener('keyup', (e) => handleFieldChange(e.target.value, 'sprintId'))
    sprintPassword.addEventListener('keyup', (e) => handleFieldChange(e.target.value, 'sprintPassword'))
    createSprintBtn.addEventListener('click', handleSubmitSprint);

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

function handleFieldChange(newValue, field) {
    state[field] = newValue;
}

function handleAddTask(e) {
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

function handleSubmitSprint(e) {
    e.preventDefault();
    
    hideError();
    
    if (!isFormValid()) {  
        showError('Fields cannot be empty');
        return;
    }

    const data = { 
        tasks: state.tasks, 
        sprintRoomId: state.sprintId, 
        sprintPassword: state.sprintPassword 
    };
    console.log('>> data', data);
    const ajaxReques = new XMLHttpRequest();
    ajaxReques.open('POST', '../service/Sprints.php');
    ajaxReques.send(JSON.stringify(data));

    ajaxReques.onreadystatechange = () => {
        console.log('>>>> ajaxReques', ajaxReques);
        if (ajaxReques.readyState === 4 && ajaxReques.status == 200) {
            const response = JSON.parse(ajaxReques.responseText);
            response.data ? 
                showSuccess(response.data) 
                : showSuccess('Sprint created successfully');
            setTimeout(hideSuccess, 5000);
            
        } else if (ajaxReques.readyState === 4 && (ajaxReques.status === 400 || ajaxReques.status === 404)) {
            const response = JSON.parse(ajaxReques.responseText);
            showError(response.error);
        } else if (ajaxReques.readyState === 4  && (ajaxReques.status === 500)) {
            showError('Service unavailable');
        }
    }
}

//todo move to shared
const hideSuccess = () => success.classList.add('hidden');

const showSuccess = (message) => {
    success.textContent = message;
    success.classList.remove('hidden');
}

const hideError = () => error.classList.add('hidden');

const showError = (errorMessage) => { 
    error.textContent = errorMessage;
    error.classList.remove('hidden');
}


const isFormValid = () => {
    let flag = true;
    if (isEmpty(state.sprintId)) {
        sprintId.classList.add('invalid');
        flag = false;
    }

    if (isEmpty(state.sprintPassword)) {
        sprintPassword.classList.add('invalid');
        flag = false;
    }

    if (isEmptyList(state.tasks)) {
        // roomPass.classList.add('invalid');
        flag = false;
    }
    
    return flag;
}

const isEmpty = value => value && value.trim() !== '' ? false : true;
const isEmptyList = value => value && value.length > 0 ? false : true;

document.addEventListener('DOMContentLoaded', init);
