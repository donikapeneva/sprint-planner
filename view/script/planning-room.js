const tasksList = document.getElementById('tasksList');
const error = document.getElementById('error-response');
const success = document.getElementById('success-response');

const sprintRoomId = document.getElementById('sprint-room-id');
const endGrooming = document.getElementById('end-planning-btn');
const exportAllCsv = document.getElementById('export-all-btn');
const autoAssignBtn = document.getElementById('auto-assign-btn');

function buildUniqueId(prefix = 'comment') {
    return prefix + '-' + Math.floor(Math.random() * Date.now());
}

const state = {
    sprintId: '',
    sprintRoomId: '',
    tasks: [],
    teamMembers: [
        {
            name: "maria",
            team: 'alpha',
            role: 'frontend'
        },
        {
            name: "pesho",
            team: 'alpha',
            role: 'backend'
        },
        {
            name: "ivan",
            team: 'alpha',
            role: 'backend'
        }
    ]
};

function init() {
    const urlParams = new URLSearchParams(window.location.search);
    state.sprintId = urlParams.get('sprintId');
    
    getSprint();

    // sprintRoomId.addEventListener('keyup', (e) => handleFieldChange(e.target.value, 'sprintRoomId'))
    endGrooming.addEventListener('click', handleEndPlanning);
    exportAllCsv.addEventListener('click', handleExportTasksAsCsv);
    autoAssignBtn.addEventListener('click', handleAutoAssign);

}

function renderTaskList() {
    const frag = document.createDocumentFragment();

    state.tasks.forEach((task) => {
        console.log('>> task', task);
        const item = buildTaskItemEl(task);
        // item.addEventListener('keyup', e => updateField(e.target.value));
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


function buildTaskItemEl({ publicId, epicLink, taskLink, taskDescription,
                            isIncludedInSprint, assignee, storyPoints, comments}) {
    console.log('>>> buildTaskItemEl', publicId);
    const taskItem = document.createElement('div');
    taskItem.classList.add('task-row', 'row');

    const devComments = 'predefined comment';
    const answer = '';

    const commentSection = buildContainer('s6');

    // comments.foreach(comment => {
    //     const tag = comment.type === 'DEV' ? 'DEV' : 'BUSINESS';

    //     const row = buildContainer('s12');
    //     row.appendChild(buildTextEl(tag, comment.content, 's4'));
    //     row.appendChild(buildTextEl('answer', answer, 's4'));
    //     commentSection.appendChild(row);
    // });

    //comments
    const commentRow = buildContainer('s12');
    commentRow.appendChild(buildTextEl('tag', devComments, 's7', onAddComment, publicId));
    commentRow.appendChild(buildTextEl('answer', answer, 's5', onAddAnswer, publicId));
    const button = createButton('Add');
    button.addEventListener('click', onAddComment.bind(publicId));
    commentRow.appendChild(button);

    taskItem.appendChild(buildTextEl('asignee', assignee, 's1', handleSetAssignee, publicId));
    taskItem.appendChild(createCheckboxNode(isIncludedInSprint, 's1', publicId, handleSetAIncludedInSprint));
    taskItem.appendChild(buildTextEl('storyPoints', storyPoints, 's1', handleSetStoryPoints, publicId));
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

const createCheckboxNode = (isChecked, gridColSize, id, onChange) => {
    const div = document.createElement('div');
    const checkbox = document.createElement('input');
    checkbox.classList.add('filled-in');
    checkbox.checked = isChecked;
    div.addEventListener("click", (e) => onChange(e, checkbox, id));

    const span2 = document.createElement('span');
    checkbox.type = 'checkbox';

    div.className = `col ${gridColSize}`;
    
    div.appendChild(checkbox);
    div.appendChild(span2);
    return div;
}

const handleSetAIncludedInSprint = (e, checkbox, id) => {
    checkbox.checked = !checkbox.checked;
    state.tasks.forEach(task => {
        if (task.publicId === id) {
            task.isIncludedInSprint = checkbox.checked;
        }
    })

    handleUpdateTask(id);
}

const handleSetAssignee = (element, id) => {
    state.tasks.forEach(task => {
        if (task.publicId === id) {
            task.assignee = element.value;
        }
    })

    handleUpdateTask(id);
}

const handleSetStoryPoints = (element, id) => {
    state.tasks.forEach(task => {
        if (task.publicId === id) {
            task.storyPoints = element.value;
        }
    })

    handleUpdateTask(id);
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

function buildTextEl(tag, text, gridColSize, onClick, id) {
    
    const div = document.createElement('div');

    const textarea = document.createElement('textarea');
    textarea.className = 'comment';
    textarea.textContent = text;

    textarea.addEventListener('input', () => autoExpand(textarea));
    textarea.addEventListener('keyup', debounce(() => onClick(textarea, id)));

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

function handleUpdateTask(taskId) {
    
    console.log(">>>> task ", state.tasks.filter(task => task.publicId === taskId));
    const data = {
        task: state.tasks.filter(task => task.publicId === taskId)[0]
    };
    
    const ajaxReques = new XMLHttpRequest();
    ajaxReques.open('PUT', '../service/Tasks.php/' + taskId);
    ajaxReques.send(JSON.stringify(data));

    ajaxReques.onreadystatechange = () => {
        console.log('>>>> ajaxReques', ajaxReques);
        if (ajaxReques.readyState === 4 && ajaxReques.status == 200) {
            //window.location.replace('./sprints.php');
        } else if (ajaxReques.readyState === 4 
            && (ajaxReques.status === 400 || ajaxReques.status === 404
                || ajaxReques.status === 401)) {
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

function saveInput(asd){
    console.log(">>>> asd",asd);
    console.log('Saving data');
}
  
const updateField = debounce(() => saveInput());

const isEmpty = value => value && value.trim() !== '' ? false : true;
const isEmptyList = value => value && value.length > 0 ? false : true;

const tasksToExportData = (tasks) => {
    return tasks.map(({ epicLink, taskLink, taskDescription, comments }) => ({
        epicLink, taskLink, taskDescription, comments
    }));
}
const convertToCSV = (data) => {
    const headers = Object.keys(data[0]);
    const rows = data.map(obj => headers.map(header => obj[header]));
    const csvArray = [headers, ...rows];
    return csvArray.map(row => row.join(',')).join('\n');
}

const downloadCSV = (csvContent, fileName) => {
    const link = document.createElement('a');
    link.setAttribute('href', 'data:text/csv;charset=utf-8,' + encodeURIComponent(csvContent));
    link.setAttribute('download', fileName);
    link.style.display = 'none';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

const handleExportTasksAsCsv = () => {
    const data = tasksToExportData(state.tasks);
    const csvContent = convertToCSV(data);
    downloadCSV(csvContent, 'tasks.csv');
}

const handleAutoAssign = () => {
    state.tasks = state.tasks.map((task) => {
        const randomAssignee  = state.teamMembers[Math.floor(Math.random() * state.teamMembers.length)];
        return {...task, assignee: randomAssignee.name};

    })
    renderTaskList();

}

document.addEventListener('DOMContentLoaded', init);
