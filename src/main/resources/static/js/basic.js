/*
function fetchData() {
    //...
}

const fetchData = function() {
}
*/

const fetchData = () => {
    fetch('http://localhost:8080/api/v1/pets', {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('token')
        },
        method: 'GET',
    })
    .then((resp) => resp.json())
    .then((json) => {
        let tbl = document.getElementById('pet-tbl');
        tbl.innerHTML = ''; // Alten Daten entfernen

        json.forEach((pet) => {
            let row = `<tr><td>${pet.chipId}</td><td>${pet.name}</td><td>${pet.type}</td><td>${pet.race}</td><td>${pet.birthDate}</td><td></td></tr>`;
            tbl.innerHTML += row;
        })
    })
    .catch((err) => console.log(err))
}

document.getElementById('login-form').addEventListener('submit', (event) => {
    event.preventDefault();

    let form = document.getElementById('login-form');
    let loginAlert = document.getElementById('login-alert');
    let emailStr = document.getElementById('email').value;
    let passwordStr = document.getElementById('password').value;

    fetch('http://localhost:8080/api/v1/auth/login', {
        headers: { // HTTP Header
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        method: 'POST',
        body: JSON.stringify({'email': emailStr, 'password': passwordStr})
    })
    .then((resp) => resp.json()) // Parst die Antwort des Servers in JavaScript-Objekte
    .then((json) => {
        if(json.error) {
            loginAlert.classList.remove('d-none');
        }
        else {
            loginAlert.classList.add('d-none');
            localStorage.setItem('token', json.token)
            form.reset(); // Formular leeren
        }
    })
    .catch((err) => console.log(err))
});

document.getElementById('btn-data').addEventListener('click', (event) => {
    fetchData();
});

document.getElementById('btn-logout').addEventListener('click', (event) => {
    localStorage.clear();
    console.log('LOGOUT');
});

document.getElementById('pet-form').addEventListener('submit', (event) => {
    event.preventDefault();

    let form = document.getElementById('pet-form');
    let chipIdStr = document.getElementById('chipId').value;
    let nameStr = document.getElementById('name').value;
    let typeStr = document.getElementById('type').value;
    let raceStr = document.getElementById('race').value;
    let birthDateStr = document.getElementById('birthDate').value;

    fetch('http://localhost:8080/api/v1/pets', {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('token')
        },
        method: 'POST',
        body: JSON.stringify({'chipId': chipIdStr, 'name': nameStr, 'type': typeStr, 'race': raceStr, 'birthDate': birthDateStr})
    })
    .then((resp) => resp.json())
    .then((json) => {
        if(json.error) {
            console.log()
        }
        else {
            fetchData();
            form.reset();
        }
    })
    .catch((err) => console.log(err))
});