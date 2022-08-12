const email = document.getElementById('email');
const pass = document.getElementById('password');
const form = document.getElementById('login-form');
const error = document.getElementById('error-response');

const state = {
    email: '',
    password: ''
};

function init() {
    form.addEventListener('submit', handleSubmit);
    email.addEventListener('keyup', (e) => handleFieldChange(e.target.value, 'email', email));
    pass.addEventListener('change', (e) => handleFieldChange(e.target.value, 'password', pass));
}

function handleSubmit(e) {
    e.preventDefault();
    hideError();

    if(!isFormValid()) {
        showError('Fields cannot be empty');
        return;
    }

    const data = { ...state };
    const ajaxReques = new XMLHttpRequest();
    ajaxReques.open('POST', '../service/Login.php');
    ajaxReques.send(JSON.stringify(data));

    ajaxReques.onreadystatechange = () => {
        console.log(ajaxReques);
        if (ajaxReques.readyState === 4 && ajaxReques.status == 200) {
            console.log(ajaxReques);
            const response = JSON.parse(ajaxReques.responseText);
            window.location.replace(response.data.redirectUrl);
            
        } else if (ajaxReques.readyState === 4 && (ajaxReques.status === 400 || ajaxReques.status === 404)) {
            const response = JSON.parse(ajaxReques.responseText);
            showError(response.error);
        } else if (ajaxReques.readyState === 4  && (ajaxReques.status === 500)) {
            showError('Service unavailable');
        }
    }
}

const isFormValid = () => {
    let flag = true;
    if (isEmpty(email.value)) {
        email.classList.add('invalid');
        flag = false;
    }

    if (isEmpty(pass.value)) {
        pass.classList.add('invalid');
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
