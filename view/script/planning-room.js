const tasksList = document.getElementById('tasksList');
const error = document.getElementById('error-response');
const success = document.getElementById('success-response');

const sprintRoomId = document.getElementById('sprint-room-id');
const endGrooming = document.getElementById('end-planning-btn');

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

    // sprintRoomId.addEventListener('keyup', (e) => handleFieldChange(e.target.value, 'sprintRoomId'))
    endGrooming.addEventListener('click', handleEndPlanning);

}

function renderTaskList() {
    const frag = document.createDocumentFragment();

    state.tasks.forEach((task) => {
        console.log('>> task', task);
        const item = buildTaskItemEl(task.publicId, task.epicLink, task.taskLink, task.taskDescription,
                                    task.comments);
        item.addEventListener('keyup', e => updateField(e.target.value));
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


function buildTaskItemEl(id, epicLinkValue, taskLinkValue, taskDescriptionValue, comments) {
    console.log('>>> buildTaskItemEl', id);
    const taskItem = document.createElement('div');
    taskItem.classList.add('task-row', 'row');
    // taskItem.publicId = id;
    const assignee = '';
    const storypoints = '';
    const includedInSprint = false;
    const devComments = 'predefined comment';
    const answer = '';

    const commentSection = buildContainer('s6');

    // comments.foreach(comment => {
    //     const tag = comment.type === 'DEV' ? 'DEV' : 'BUSINESS';

    //     const row = buildContainer('s12');
    //     row.appendChild(buildCommentEl(tag, comment.content, 's4'));
    //     row.appendChild(buildCommentEl('answer', answer, 's4'));
    //     commentSection.appendChild(row);
    // });

    //comments
    const commentRow = buildContainer('s12');
    commentRow.appendChild(buildCommentEl('tag', devComments, 's7', onAddComment, id));
    commentRow.appendChild(buildCommentEl('answer', answer, 's5', onAddAnswer, id));
    const button = createButton('Add');
    button.addEventListener('click', onAddComment.bind(id));
    commentRow.appendChild(button);

    taskItem.appendChild(buildCommentEl('asignee', assignee, 's1', () => {}, id));
    taskItem.appendChild(createCheckboxNode(includedInSprint, 's1'));
    taskItem.appendChild(buildCommentEl('storyPoints', storypoints, 's1', () => {}, id));
    taskItem.appendChild(buildButtonEl(taskLinkValue, 's1'));
    taskItem.appendChild(createTaskColNode(taskDescriptionValue, 's2'));


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
    const text = link ? link.substring(link.length - 5) : '';
    const button = createButton(text);
    button.textContent = text;
    button.href = link;
    button.target = '_blank'
  
    div.className = `col ${gridColSize}`;
    
    div.appendChild(button);
    return div;
}

function createButton (text) {
    const button = document.createElement('a');
    button.textContent = text;
    button.className = 'waves-effect waves-teal btn-flat secondary-color centered';
    

    return button;
}


function buildContainer (gridColSize) {
    const div = document.createElement('div');
    div.className = `col ${gridColSize}`;
    return div;
}

function buildCommentEl(tag, text, gridColSize, onClick, id) {
    
    const div = document.createElement('div');

    const textarea = document.createElement('textarea');
    textarea.className = 'comment';
    textarea.textContent = text;

    textarea.addEventListener('input', () => autoExpand(textarea));

    // const button = createButton('Add');
    // button.addEventListener('click', onAddComment.bind(id));

    div.className = `col ${gridColSize}`;
    div.appendChild(textarea);
    // div.appendChild(button);
    return div;
}

const autoExpand = (field) => {
	// Reset field height
	field.style.height = 'inherit';

	// Get the computed styles for the element
    const computed = window.getComputedStyle(field);
    // Calculate the height
    const height = field.scrollHeight + parseInt(computed.getPropertyValue('border-top-width'), 10) * 3;
    field.style.height = height + 'px';

};

function getSprint() {
    const ajaxReques = new XMLHttpRequest();
    ajaxReques.open('GET', '../service/Sprints.php/'+state.sprintId);
    ajaxReques.send();;

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

function onAddAnswer(e ) { };

function onAddComment(e, id ) {
    console.log('>>> onAddComment e ', e, id);
}

function handleEndPlanning(e) {
    e.preventDefault();
    
    const data = {
        sprintId: state.sprintId,
        action: 'end-planning'
    };
    
    const ajaxReques = new XMLHttpRequest();
    ajaxReques.open('POST', '../service/Sprints.php/' + state.sprintId);
    ajaxReques.send(JSON.stringify(data));

    ajaxReques.onreadystatechange = () => {
        console.log('>>>> ajaxReques', ajaxReques);
        if (ajaxReques.readyState === 4 && ajaxReques.status == 200) {
            window.location.replace('./sprints.php');
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

function debounce(func, timeout = 1000){
    let timer;
    return (...args) => {
        clearTimeout(timer);
        timer = setTimeout(() => { func.apply(this, args); }, timeout);
    };
}

function saveInput(){
    console.log('Saving data');
}
  
const updateField = debounce(() => saveInput());

const isEmpty = value => value && value.trim() !== '' ? false : true;
const isEmptyList = value => value && value.length > 0 ? false : true;

document.addEventListener('DOMContentLoaded', init);
