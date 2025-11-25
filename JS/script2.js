document.addEventListener("DOMContentLoaded", function() {
    const form = document.querySelector("form");
    const email = document.getElementById("email");
    const password = document.getElementById("password");
    const username = document.getElementById("username");
    
    // Dodajamo elemente za napake
    [email, password, username].forEach(field => {
        let error = document.createElement("p");
        error.className = "error-message";
        error.style.color = "red";
        error.style.fontSize = "12px";
        error.style.marginTop = "4px";
        field.insertAdjacentElement("afterend", error);
    });
    
    // Validacijske funkcije
    function validateEmail() {
        const pattern = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;
        const error = email.nextElementSibling;
        if (email.value.trim() === "") {
            error.textContent = "";
        } else if (!pattern.test(email.value.trim())) {
            error.textContent = "Prosimo, vnesite veljaven e-poštni naslov.";
        } else {
            error.textContent = "";
        }
    }
    
    function validatePassword() {
        const value = password.value;
        const error = password.nextElementSibling;
        const strong = value.length >= 15;
        const medium = value.length >= 8 && /[a-z]/.test(value) && /\d/.test(value);
        if (value === "") {
            error.textContent = "";
        } else if (!strong && !medium) {
            error.textContent = "Geslo mora biti dolgo vsaj 15 znakov ALI 8+ znakov s številko in malo črko.";
        } else {
            error.textContent = "";
        }
    }
    
    function validateUsername() {
        const pattern = /^[A-Za-z0-9]+(-[A-Za-z0-9]+)*$/;
        const error = username.nextElementSibling;
        if (username.value.trim() === "") {
            error.textContent = "";
        } else if (!pattern.test(username.value.trim())) {
            error.textContent = "Uporabniško ime lahko vsebuje samo črke, številke in posamezne vezaje (ne na začetku ali koncu).";
        } else {
            error.textContent = "";
        }
    }
    
    // sprotno preverjanje
    email.addEventListener("input", validateEmail);
    password.addEventListener("input", validatePassword);
    username.addEventListener("input", validateUsername);
    
    // Ob kliku na Submit
    form.addEventListener("submit", function(event) {
        event.preventDefault(); // Prepreči reload
        
        validateEmail();
        validatePassword();
        validateUsername();
        
        // Če obstaja napaka, prepreči pošiljanje
        const errors = document.querySelectorAll(".error-message");
        for (let e of errors) {
            if (e.textContent !== "") {
                return;
            }
        }
        
        // Uspeh - SweetAlert
        Swal.fire({
            icon: "success",
            title: "Registracija uspešna!",
            text: "Vaš račun je bil ustvarjen."
        });
    });
});