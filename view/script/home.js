const email = document.getElementById('email');
const roomId = document.getElementById('roomSprintId');
const roomPass = document.getElementById('roomPassword');
const button = document.getElementById('submit-btn');

const error = document.getElementById('error-response');


// const form = document.getElementById('enter-room-form');

// const state = {
//     epicLink: '',
//     taskLink: '',
//     taskDescription: '',
//     tasks: []
// };

function initHome() {
    button.addEventListener('click', handleSubmit);
}

function handleSubmit(e) {
    e.preventDefault();
    console.log('>>> e', e);

    if (!email.value) {
        email.classList.add('invalid');
    }

    if (!roomId.value) {
        roomId.classList.add('invalid');
    }

    if (!roomPass.value) {
        roomPass.classList.add('invalid');
    }


    // const data = new FormData(form);
    
    // console.log('>>> form ', data);

    const testt = {email: email.value, roomId: roomId.value, roomPass: roomPass.value};

    const ajaxReques = new XMLHttpRequest();
    ajaxReques.open('POST', 'service/EnterRoom.php');

    ajaxReques.send(JSON.stringify(testt));

    ajaxReques.onreadystatechange = () => {
        // console.log('>>> ajaxReques', ajaxReques);
        if(ajaxReques.readyState === 4 && ajaxReques.status == 200) {
            const response = JSON.parse(ajaxReques.responseText);
            
            // if(response.)
            console.log('>>> response', response);
            
            const textContent = document.createTextNode(ajaxReques.statusText);
            error.appendChild(textContent);
            error.style.display = "block";
        }
    }
}

document.addEventListener('DOMContentLoaded', initHome);
