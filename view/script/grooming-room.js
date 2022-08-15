const tasksList = document.getElementById('tasksList');
const error = document.getElementById('error-response');
const success = document.getElementById('success-response');

const sprintRoomId = document.getElementById('sprint-room-id');
const endGrooming = document.getElementById('end-grooming-btn');

function buildUniqueId(prefix = 'comment') {
    return prefix + '-' + Math.floor(Math.random() * Date.now());
}

const state = {
    sprintId: '',
    sprintRoomId: '',
    tasks: []
};

function init() {
    const urlParams = new URLSearchParams(window.location.search);
    state.sprintId = urlParams.get('sprintId');
    
    getSprint();

    sprintRoomId.addEventListener('keyup', (e) => handleFieldChange(e.target.value, 'sprintRoomId'))
    endGrooming.addEventListener('click', handleSaveSprint);

}

function renderTaskList() {
    const frag = document.createDocumentFragment();

    state.tasks.forEach((task) => {
        console.log('>> task', task);
        const item = buildTaskItemEl(task.publicId, task.epicLink, task.taskLink, task.taskDescription,
                                    task.comments);
        frag.appendChild(item);
    });

    while (tasksList.lastChild) {
        tasksList.removeChild(tasksList.lastChild);
    }
    tasksList.appendChild(frag);

}

function renderSprintDetails() {
    sprintRoomId.textContent = state.sprintRoomId;
}


function buildTaskItemEl(id, epicLinkValue, taskLinkValue, taskDescriptionValue) {
    const taskItem = document.createElement('div');
    taskItem.classList.add('task-row', 'row');
    taskItem.publicId = id;
    const approvedForPlanning = '';
    const devComments = '';
    const bizzComments = '';
    const answer = '';
    // comments.foreach(comment => {

    // });

    taskItem.appendChild(createCheckboxNode(approvedForPlanning, 's1'));
    taskItem.appendChild(buildButtonEl(epicLinkValue, 's1'));
    taskItem.appendChild(buildButtonEl(taskLinkValue, 's1'));
    taskItem.appendChild(createTaskColNode(taskDescriptionValue, 's2'));
    taskItem.appendChild(createTaskColNode(devComments, 's2'));
    taskItem.appendChild(createTaskColNode(bizzComments, 's2'));
    taskItem.appendChild(createTaskColNode(answer, 's2'));
    
    return taskItem;
}

const createTaskColNode = (text, gridColSize) => {
    const span = document.createElement('span');
    const textContent = document.createTextNode(text);
    span.className = `col ${gridColSize}`;
    
    span.appendChild(textContent);
    return span;
}

const createCheckboxNode = (isChecked, gridColSize) => {
    //todo add on click 
    const div = document.createElement('div');
    const checkbox = document.createElement('input');
    checkbox.classList.add('filled-in');
    checkbox.checked = isChecked;

    const span2 = document.createElement('span');
    checkbox.type = 'checkbox';

    div.className = `col ${gridColSize}`;
    
    div.appendChild(checkbox);
    div.appendChild(span2);
    return div;
}

function buildButtonEl(link, gridColSize) {
    
    const div = document.createElement('div');
    const button = document.createElement('a');
    const text = link ? link.substring(link.length - 5) : '';
    button.textContent = text;
    button.href = link;
    button.target = '_blank'
    button.className = 'waves-effect waves-teal btn-flat secondary-color centered';
    
    div.className = `col ${gridColSize}`;
    
    div.appendChild(button);
    return div;
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
        publicId: buildUniqueId('task')

    }
    state.tasks = [...state.tasks, newTask];
    state.epicLink = '';
    state.taskLink = '';
    state.taskDescription = '';
    renderInput();
    renderTaskList();
}

function handleTaskDeleteButtonClick(id) {
    state.tasks = state.tasks.filter((t) => t.publicId !== id);
    renderTaskList();
}

function getSprint() {
    const ajaxReques = new XMLHttpRequest();
    ajaxReques.open('GET', '../service/Sprints.php/'+state.sprintId);
    ajaxReques.send();

    ajaxReques.onreadystatechange = () => {
        console.log('>>>> ajaxReques', ajaxReques);
        if (ajaxReques.readyState === 4 && ajaxReques.status == 200) {
            const response = JSON.parse(ajaxReques.responseText);
            //todo
            console.log('>>> resp', response);
            state.sprintRoomId = response.data.sprint.roomId;
            state.sprintPassword = response.data.sprint.roomPassword;
            state.tasks = response.data.tasks;
            
            renderSprintDetails();
            renderTaskList();
            
        } else if (ajaxReques.readyState === 4 && (ajaxReques.status === 400 || ajaxReques.status === 404)) {
            const response = JSON.parse(ajaxReques.responseText);
            showError(response.error);
        } else if (ajaxReques.readyState === 4  && (ajaxReques.status === 500)) {
            showError('Service unavailable');
        }
    }
}

function handleSaveSprint(e) {
    e.preventDefault();
    
    hideError();
    
    if (!isFormValid()) {  
        showError('Fields cannot be empty');
        return;
    }

    const data = {
        sprintId: state.sprintId,
        tasks: state.tasks, 
        sprintRoomId: state.sprintRoomId, 
        sprintPassword: state.sprintPassword 
    };
    console.log('>> data', data);
    const ajaxReques = new XMLHttpRequest();
    ajaxReques.open('PUT', '../service/Sprints.php');
    ajaxReques.send(JSON.stringify(data));

    ajaxReques.onreadystatechange = () => {
        console.log('>>>> ajaxReques', ajaxReques);
        if (ajaxReques.readyState === 4 && ajaxReques.status == 200) {
            const response = JSON.parse(ajaxReques.responseText);
            // state.sprintId = response.data.sprintId;
            //  ? 
            //     showSuccess(response.data) 
            //     : showSuccess('Sprint created successfully');
            // setTimeout(hideSuccess, 5000);
            window.location.replace('./edit-sprint.php?sprintId=' + state.sprintId);
            
        } else if (ajaxReques.readyState === 4 && (ajaxReques.status === 400 || ajaxReques.status === 404)) {
            const response = JSON.parse(ajaxReques.responseText);
            showError(response.error);
        } else if (ajaxReques.readyState === 4  && (ajaxReques.status === 500)) {
            showError('Service unavailable');
        }
    }
}

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


// const isFormValid = () => {
//     let flag = true;
//     if (isEmpty(state.sprintRoomId)) {
//         sprintRoomId.classList.add('invalid');
//         flag = false;
//     }

//     if (isEmpty(state.sprintPassword)) {
//         sprintPassword.classList.add('invalid');
//         flag = false;
//     }

//     if (isEmptyList(state.tasks)) {
//         // roomPass.classList.add('invalid');
//         flag = false;
//     }
    
//     return flag;
// }

const isEmpty = value => value && value.trim() !== '' ? false : true;
const isEmptyList = value => value && value.length > 0 ? false : true;

document.addEventListener('DOMContentLoaded', init);
