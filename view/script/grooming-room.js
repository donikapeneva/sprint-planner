const tasksList = document.getElementById('tasksList');
const error = document.getElementById('error-response');
const success = document.getElementById('success-response');

const sprintRoomId = document.getElementById('sprint-room-id');
const endGrooming = document.getElementById('end-grooming-btn');
const exportCsv = document.getElementById('export-btn');

function buildUniqueId(prefix = 'comment') {
    return prefix + '-' + Math.floor(Math.random() * Date.now());
}

const state = {
    sprintId: '',
    sprintRoomId: '',
    tasks: [],
    // comments: [],
    // comment: '',
    // answer: ''
};

function init() {
    const urlParams = new URLSearchParams(window.location.search);
    state.sprintId = urlParams.get('sprintId');
    getSprint();
    endGrooming.addEventListener('click', handleEndGrooming);
    exportCsv.addEventListener('click', handleExportTasksAsCsv);
}

function renderTaskList() {
    const frag = document.createDocumentFragment();

    state.tasks.forEach((task) => {
        console.log('>> task', task);
        const item = buildTaskItemEl(task);
        //global change listener - autosave 
        // item.addEventListener('keyup',  debounce(() => handleUpdateTask(task.publicId)));
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


function buildTaskItemEl({ publicId, isApprovedForPlanning, epicLink, taskLink, taskDescription, comments }) {
    console.log('>>> buildTaskItemEl', publicId);
    const taskItem = document.createElement('div');
    taskItem.classList.add('task-row', 'row');

    const approvedForPlanning = isApprovedForPlanning;
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
    //onAddComment - will be triggered after  change; we dont want it, if we use the add button
    //another approach is - auto save, if click add - add new empty text ares
    commentRow.appendChild(buildTextElComment('tag', devComments, 's7', onAddComment, publicId));
    commentRow.appendChild(buildTextElComment('answer', answer, 's5', onAddAnswer, publicId));
    const button = createButton('Add');
    
    // button.addEventListener('click', onAddComment.bind(publicId));
    commentRow.appendChild(button);

    taskItem.appendChild(createCheckboxNode(approvedForPlanning, 's1', publicId, handleSetApprovedForPlanning));
    taskItem.appendChild(buildButtonEl(epicLink, 's1'));
    taskItem.appendChild(buildButtonEl(taskLink, 's1'));
    taskItem.appendChild(createTaskColNode(taskDescription, 's3'));


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

const createCheckboxNode = (isChecked, gridColSize, id, onClick) => {
    
    const div = document.createElement('div');
    const checkbox = document.createElement('input');
    checkbox.classList.add('filled-in');
    checkbox.checked = (isChecked == true);

    div.addEventListener("click", (e) => onClick(e, checkbox, id));

    const span2 = document.createElement('span');
    checkbox.type = 'checkbox';

    div.className = `col ${gridColSize}`;
    
    div.appendChild(checkbox);
    div.appendChild(span2);
    return div;
}

const handleSetApprovedForPlanning = (e, checkbox, id) => {
    checkbox.checked = !checkbox.checked;
    state.tasks.forEach(task => {
        if (task.publicId === id) {
            task.isApprovedForPlanning = checkbox.checked;
        }
    })

    handleUpdateTask(id);
}

function onAddAnswer(e ) { };

function onAddComment(e) {
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


    // console.log(">>> comment id",commentId, taskId)
    // if(!commentId) {
    //     //no current comments;
    //     commentId = buildUniqueId();
    //     state.tasks.forEach(task => {
    //         if (task.publicId === taskId) {
    //             //TODO this should be initial empty (BE Should return it)
    //             if(!task.comments) {
    //                 task.comments = [{id: commentId, comment: element.value, answer: ''}];
    //             } else {
    //                 console.log(">>> searching comments")
    //                 task.comments.forEach(commentRow => {
    //                     if(commentId === commentRow.id) {
    //                         console.log(">>> will update");
    //                         commentRow.comment = element.value
    //                     }
    //                 })
    //             }
    //         }
    //     });

    //     console.log(state.tasks);
    // }
    // console.log('>>> onAddComment e ', id);
    // console.log(state.tasks.filter(task => task.publicId === id));
    // // comment = {idComment ,comment: '', answer : ''}

    // state.tasks.forEach(task => {
    //     if (task.publicId === id) {
    //         if(!task.comments) {
    //             const commentId = buildUniqueId();
    //         }
    //     }
    // })
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

function buildTextEl(tag, text, gridColSize, onUpdate, id) {
    
    const div = document.createElement('div');

    const textarea = document.createElement('textarea');
    textarea.className = 'comment';
    textarea.textContent = text;

    textarea.addEventListener('input', () => autoExpand(textarea));
    // textarea.addEventListener('keyup', debounce(() => onUpdate(textarea, id)));

    // const button = createButton('Add');
    // button.addEventListener('click', onAddComment.bind(id));

    div.className = `col ${gridColSize}`;
    div.appendChild(textarea);
    // div.appendChild(button);
    return div;
}

function buildTextElComment(tag, text, gridColSize, onUpdate, taskId, commentId) {
    
    const div = document.createElement('div');

    const textarea = document.createElement('textarea');
    textarea.className = 'comment';
    textarea.textContent = text;

    textarea.addEventListener('input', () => autoExpand(textarea));
    textarea.addEventListener('keyup', debounce(() => onUpdate(textarea, taskId, commentId)));

    div.className = `col ${gridColSize}`;
    div.appendChild(textarea);
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

function handleEndGrooming(e) {
    e.preventDefault();
    
    const data = {
        sprintId: state.sprintId,
        action: 'end-grooming'
    };
    
    const ajaxReques = new XMLHttpRequest();
    ajaxReques.open('POST', '../service/Sprints.php/' + state.sprintId);
    ajaxReques.send(JSON.stringify(data));

    ajaxReques.onreadystatechange = () => {
        console.log('>>>> ajaxReques', ajaxReques);
        if (ajaxReques.readyState === 4 && ajaxReques.status == 200) {
            window.location.replace('./sprints.php');
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

function saveInput(){
    console.log('Saving data');
}
  
const updateField = debounce(() => saveInput());

const isEmpty = value => value && value.trim() !== '' ? false : true;
const isEmptyList = value => value && value.length > 0 ? false : true;

const tasksToExportData = () => {
    return state.tasks.map(({ epicLink, taskLink, taskDescription, comments }) => ({
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
    console.log('>>> export', state.tasks);
    //todo export all and export not approved
    const data = tasksToExportData();
    console.log('>> data', data);
    const csvContent = convertToCSV(data);
    downloadCSV(csvContent, 'tasks.csv');

}

document.addEventListener('DOMContentLoaded', init);
