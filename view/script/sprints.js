
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
            console.log('>> sprints', response.data);
            renderTable();
        } else if (ajaxReques.readyState === 4 && (ajaxReques.status === 400 || ajaxReques.status === 404)) {
            // const response = JSON.parse(ajaxReques.responseText);
            // showError(response.error);
        } else if (ajaxReques.readyState === 4 && (ajaxReques.status === 401 || ajaxReques.status === 403)) {
            window.location.replace('../login.php');
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
    // let openRoomDUrl;
    let callback;
    
    switch (status) {
        case 'NEW':
            callback = initRoomForGrooming;
            // openRoomDUrl = './grooming-room.php';
            break;
        case 'GROOMING': 
            callback = openRoomForGrooming;
            // openRoomDUrl = './grooming-room.php';
            break;
        case 'PLANNING':
            callback = openRoomForPlanning;
            // openRoomDUrl = './planning-room.php';
            break;

        case 'ACTIVE':
        callback = closeSprint;
            // openRoomDUrl = './planning-room.php';
            break;
        default:
            openRoomDUrl = '';
            break;
    }

    const edit = buildButtonEl(id, 'Edit', actionButtonStyle.normal, () => { 
        window.location.href = './edit-sprint.php?sprintId=' + id;
    });
    const action = buildButtonEl(id, 'Open Room', actionButtonStyle.accent, () => {
        callback(id);
    });
    actions.appendChild(edit);
    actions.appendChild(action);
    return actions;
}

const initRoomForGrooming = (id) => {
    const openRoomDUrl = './grooming-room.php';
    const data = {sprintId: id, action: 'open-grooming'};
    const ajaxReques = new XMLHttpRequest();
    ajaxReques.open('POST', '../service/Sprints.php');
    ajaxReques.send(JSON.stringify(data));

    ajaxReques.onreadystatechange = () => {
        console.log('>>>> ajaxReques', ajaxReques);
        if (ajaxReques.readyState === 4 && ajaxReques.status == 200) {
            
            window.location.href = `./${openRoomDUrl}?sprintId=${id}`;
            
        } else if (ajaxReques.readyState === 4 && (ajaxReques.status === 400 || ajaxReques.status === 404)) {
            const response = JSON.parse(ajaxReques.responseText);
            showError(response.error);
        } else if (ajaxReques.readyState === 4  && (ajaxReques.status === 500)) {
            showError('Service unavailable');
        }
    }
}

const openRoomForGrooming = (id) => {
    const openRoomDUrl = './grooming-room.php';
    window.location.href = `./${openRoomDUrl}?sprintId=${id}`;
}

const openRoomForPlanning = (id) => {
    const openRoomDUrl = './planning-room.php';
    window.location.href = `./${openRoomDUrl}?sprintId=${id}`;
}

const closeSprint = (id) => {
    const ajaxReques = new XMLHttpRequest();
    
    const data = {sprintId: id, action: 'close-sprint'};
    ajaxReques.open('POST', '../service/Sprints.php');
    ajaxReques.send(JSON.stringify(data));

    ajaxReques.onreadystatechange = () => {
        if (ajaxReques.readyState === 4 && ajaxReques.status == 200) {
            window.location.replace = `./sprints.php`;
            
        } else if (ajaxReques.readyState === 4 && (ajaxReques.status === 400 || ajaxReques.status === 404)) {
            const response = JSON.parse(ajaxReques.responseText);
            showError(response.error);
        } else if (ajaxReques.readyState === 4  && (ajaxReques.status === 500)) {
            showError('Service unavailable');
        }
    }
}

function buildButtonEl(id, text, style, onClick) {
    const button = document.createElement('a');
    button.textContent = text;
    button.className = style;
    button.addEventListener('click', onClick.bind(null, id));

    return button;
}

document.addEventListener('DOMContentLoaded', init);