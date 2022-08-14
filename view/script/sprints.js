
const sprintsTableContent = document.getElementById('sprints-table-content');
const sprintsTable = document.getElementById('sprints-table');

const actionButtonStyle = {
    normal: 'waves-effect waves-teal btn-flat secondary-color centered',
    accent: 'waves-effect waves-light btn'
}

const state = {
    sprints: []
};

function init() {
    getAllSprints();
}

function getAllSprints() {
    const ajaxReques = new XMLHttpRequest();
    ajaxReques.open('GET', '../service/Sprints.php');
    ajaxReques.send();

    ajaxReques.onreadystatechange = () => {
        console.log(ajaxReques);
        if (ajaxReques.readyState === 4 && ajaxReques.status == 200) {
            console.log(ajaxReques);
            const response = JSON.parse(ajaxReques.responseText);
            state.sprints = response.data;
            console.log('>> resp', response);
            renderTable();
            
        } else if (ajaxReques.readyState === 4 && (ajaxReques.status === 400 || ajaxReques.status === 404)) {
            // const response = JSON.parse(ajaxReques.responseText);
            // showError(response.error);
        } else if (ajaxReques.readyState === 4  && (ajaxReques.status === 500)) {
            // showError('Service unavailable');
        }
    }
}



function renderTable() {
    if (state.sprints && state.sprints.length) {
        state.sprints.forEach((sprint) => {
            const item = buildSprintItemEl(sprint.id, sprint.roomId, sprint.status);
            sprintsTableContent.appendChild(item);
        });
    }
    else {
        sprintsTableContent.appendChild(buildEmptyElement());
    }
}

const buildEmptyElement = () => {
    return createSprintColNode('No data yet.');
}

const buildSprintItemEl = (id, roomId, status) => {
    const sprintRow = document.createElement('tr');
    sprintRow.appendChild(createSprintColNode(roomId));
    sprintRow.appendChild(createSprintColNode(status));
    sprintRow.appendChild(createSprintActions(id, status));
    return sprintRow;
}

const createSprintColNode = (text) => {
    const col = document.createElement('td');
    col.textContent = text;
    return col;
}

const createSprintActions = (id, status) => {
    const actions = document.createElement('td');
    let openRoomDUrl;
    switch (status) {
        case status === 'NEW':
        case status === 'GROOMING': 
            openRoomDUrl = '/grooming-room.php';
            break;
        case status === 'PLANNING':
            openRoomDUrl = '/planning-room.php';
            break;
        default:
            openRoomDUrl = '';
            break;
    } 

    const edit = buildButtonEl(id, 'Edit', actionButtonStyle.normal, () => {});
    const action = buildButtonEl(id, 'Open Room', actionButtonStyle.accent, () => {});
    actions.appendChild(edit);
    actions.appendChild(action);
    return actions;
}

function buildButtonEl(id, text, style, onClick) {
    const button = document.createElement('a');
    button.textContent = text;
    button.className = style;
    button.addEventListener('click', onClick.bind(null, id));

    return button;
}

document.addEventListener('DOMContentLoaded', init);