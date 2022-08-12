const email = document.getElementById('email');
const roomId = document.getElementById('roomSprintId');
const roomPass = document.getElementById('roomPassword');
const button = document.getElementById('submit-btn');
const error = document.getElementById('error-response');
const form = document.getElementById('enter-room-form');

const state = {
    email: '',
    roomId: '',
    roomPass: ''
};

function init() {
    button.addEventListener('click', handleSubmit);
    form.addEventListener('submit', handleSubmit);
    email.addEventListener('keyup', (e) => handleFieldChange(e.target.value, 'email', email));
    roomId.addEventListener('keyup', (e) => handleFieldChange(e.target.value, 'roomId', roomId));
    roomPass.addEventListener('keyup', (e) => handleFieldChange(e.target.value, 'roomPass', roomPass));
}

function handleSubmit(e) {
    e.preventDefault();

    hideError();

    if(!isFormValid()) {
        showError('Fields cannot be empty');
        return;
    }
    
    const data = { ...state };
    console.log('>> data', data);
    const ajaxReques = new XMLHttpRequest();
    ajaxReques.open('POST', 'service/EnterRoom.php');
    ajaxReques.send(JSON.stringify(data));

    ajaxReques.onreadystatechange = () => {
        if (ajaxReques.readyState === 4 && ajaxReques.status == 200) {
            const response = JSON.parse(ajaxReques.responseText);
            
        } else if (ajaxReques.readyState === 4 && (ajaxReques.status === 400 || ajaxReques.status === 404)) {
            const response = JSON.parse(ajaxReques.responseText);
            showError(response.error);
        }
    }
}

const isFormValid = () => {
    let flag = true;
    if (isEmpty(email.value)) {
        email.classList.add('invalid');
        flag = false;
    }

    if (isEmpty(roomId.value)) {
        roomId.classList.add('invalid');
        flag = false;
    }

    if (isEmpty(roomPass.value)) {
        roomPass.classList.add('invalid');
        flag = false;
    }
    
    return flag;
}

function handleFieldChange(newValue, field, element) {
    state[field] = newValue;
    hideError();
    element.classList.remove('invalid');
}

const isEmpty = value => value && value.trim() !== '' ? false : true;

const showError = (errorMessage) => { 
    error.textContent = errorMessage;
    error.classList.remove('hidden');
}

const hideError = () => error.classList.add('hidden');

document.addEventListener('DOMContentLoaded', init);
