
const logoutBtn = document.getElementById('log-out-btn');

function init() {
    logoutBtn.addEventListener('click', logout);
}

function logout(e) {
    e.preventDefault();
    
    const ajaxReques = new XMLHttpRequest();
    ajaxReques.open('POST', '../service/Logout.php');
    ajaxReques.send();

    ajaxReques.onreadystatechange = () => {
        console.log(ajaxReques);
        if (ajaxReques.readyState === 4 && ajaxReques.status == 200) {
            console.log(ajaxReques);
            const response = JSON.parse(ajaxReques.responseText);
            window.location.replace(response.data.redirectUrl);
        } else if (ajaxReques.readyState === 4 && (ajaxReques.status === 400 || ajaxReques.status === 404)) {
            // const response = JSON.parse(ajaxReques.responseText);
            // showError(response.error);
        } else if (ajaxReques.readyState === 4  && (ajaxReques.status === 500)) {
            // showError('Service unavailable');
        }
    }
}

document.addEventListener('DOMContentLoaded', init);
