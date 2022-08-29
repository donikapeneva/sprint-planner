const tasksList = document.getElementById('tasksList');
const error = document.getElementById('error-response');
const success = document.getElementById('success-response');
const sprintRoomId = document.getElementById('sprint-room-id');
const sprintStatusTitle = document.getElementById('sprint-stage-id');

const state = {
    sprintId: '',
    sprintStatus : '',
    tasks: []
};

function init () {
    const urlParams = new URLSearchParams(window.location.search);
    state.sprintId = urlParams.get('sprintId');
    getSprint();
}

const renderTaskList = () => {
    const frag = document.createDocumentFragment();
    state.tasks.forEach((task) => {
        const item = buildTaskItemEl(task);
        frag.appendChild(item);
    });

    while (tasksList.lastChild) {
        tasksList.removeChild(tasksList.lastChild);
    }
    tasksList.appendChild(frag);
}

const renderSprintDetails = () => {
    sprintRoomId.textContent = state.sprintRoomId;
    sprintStatusTitle.textContent = state.sprintStatus;
}


const buildTaskItemEl = ({ publicId, taskLink, taskDescription,
                            assignee, storyPoints}) => {
    const taskItem = document.createElement('div');
    taskItem.classList.add('task-row', 'row');

    const devComments = 'predefined comment';
    const answer = '';

    const commentSection = buildContainer('s6');

    const commentRow = buildContainer('s12');
    commentRow.appendChild(buildTextEl('tag', devComments, 's7'));
    commentRow.appendChild(buildTextEl('answer', answer, 's5'));
    
    taskItem.appendChild(buildTextEl('asignee', assignee, 's1'));
    taskItem.appendChild(buildTextEl('storyPoints', storyPoints, 's1'));
    taskItem.appendChild(buildButtonEl(taskLink, 's1'));
    taskItem.appendChild(createTaskColNode(taskDescription, 's2'));

    commentSection.appendChild(commentRow);
    taskItem.appendChild(commentSection);
    
    return taskItem;
}

const createTaskColNode = (text, gridColSize) => {
    const span = document.createElement('span');
    const textContent = document.createTextNode(text);
    span.className = `col ${gridColSize}`;
    
    span.appendChild(textContent);
    return span;
}

const buildButtonEl = (link, gridColSize) => {
    const div = document.createElement('div');
    const text = link ? link.substring(link.length - 5) : '';
    const button = createButton(text);
    button.textContent = text;
    button.href = link;
    button.target = '_blank'
  
    div.className = `col ${gridColSize}`;
    
    div.appendChild(button);
    return div;
}

const createButton = (text) => {
    const button = document.createElement('a');
    button.textContent = text;
    button.className = 'waves-effect waves-teal btn-flat secondary-color centered';
    
    return button;
}


const buildContainer = (gridColSize) => {
    const div = document.createElement('div');
    div.className = `col ${gridColSize}`;
    return div;
}

const buildTextEl = (tag, text, gridColSize) => {
    
    const div = document.createElement('div');

    const textarea = document.createElement('textarea');
    textarea.className = 'comment';
    textarea.textContent = text;
    textarea.readOnly = true;

    div.className = `col ${gridColSize}`;
    div.appendChild(textarea);
    return div;
}

const getSprint = () => {
    const ajaxReques = new XMLHttpRequest();
    ajaxReques.open('GET', '../service/Sprints.php/'+state.sprintId);
    ajaxReques.send();;

    ajaxReques.onreadystatechange = () => {
        if (ajaxReques.readyState === 4 && ajaxReques.status == 200) {
            const response = JSON.parse(ajaxReques.responseText);
            
            state.sprintRoomId = response.data.sprint.roomId;
            state.tasks = response.data.tasks;
            state.sprintStatus = response.data.sprint.status;
            
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

const isEmpty = value => value && value.trim() !== '' ? false : true;
const isEmptyList = value => value && value.length > 0 ? false : true;

document.addEventListener('DOMContentLoaded', init);
