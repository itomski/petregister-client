$(document).ready(() => { // Warte bis das ganze HTML geladen wurde

    $('#btn-data').click(() => { // Click-Event-Listener
        $.ajax({
            type: 'get',
            url: 'http://localhost:8080/api/v1/pets',
            dataType: 'json', // Der Response ist JSON
            beforeSend: (req) => { // Request manipulieren... JWT Token dranhängen
                if(localStorage.getItem('token')) {
                    // An Request Authorization-Header dranhängen
                    req.setRequestHeader('Authorization', 'Bearer ' + localStorage.getItem('token'));
                }
            },
            success: (resp) => { // resp ist das Response (JSON) von der API, hier ein Array mit Tier-Objekten
                let tbl = $("#pet-tbl");
                let output = '';
                $.each(resp, (i, pet) => { // Schleife, läuft das Tier-Array durch, i = index, pet = Tier-Objekt
                    let owner = '';
                    if(pet.owner != null) {
                        owner = pet.owner.firstname + " " + pet.owner.lastname;
                    }
                    output += '<tr><td>' + pet.chipId + '</td><td>' + pet.name + '</td><td>' + pet.type + '</td><td>' + pet.race + '</td><td>' + pet.birthDate + '</td><td>' + owner + '</td></tr>';
                });
                tbl.html(output);
            },
            error: () => {
                console.log('Error');
            }
        });
    });

    $('#login-form').submit((event) => { // Submit-Event-Listener für das Formular
        event.preventDefault(); // Unterbindet den Browser-Sprung zu Action

        let form = $('#login-form');
        let method = form.attr('method'); // Fragt das Method-Attribut im Form-Tag ab
        let action = form.attr('action') // Fragt das Action-Attribut im Form-Tag ab

        $.ajax({
            cache: false, // Es soll kein Browsercache verwendet werden
            type: method,
            url: action,
            contentType: 'application/json', // Mime-Type für das Versenden der Formulardaten
            data: JSON.stringify({"email": $('#email').val(), "password": $('#password').val()}), // Verpackt die Werte aus dem Formular in JSON
            success: (resp) => { // resp ist das Response (JSON) von der API
                localStorage.setItem('token', resp.token); // liest den Token aus JSON raus und scheibt ihn in LocalStorage
            },
            error: () => {
                console.log('Error');
            }
        });
    });

    $('#btn-logout').click(() => {
        localStorage.clear();
    });
});