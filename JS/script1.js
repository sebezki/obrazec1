document.addEventListener("DOMContentLoaded", function () {
    const form = document.querySelector("form");
    const username = document.getElementById("username");
    const password = document.getElementById("password");

    // Validacija uporabniško ime/email
    function validateUsernameOrEmail() {
        const value = username.value.trim();
        const emailPattern = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;
        // samo alfanumerični znaki + enojni vezaji, ne na začetku ali koncu
        const usernamePattern = /^[A-Za-z0-9]+(?:-[A-Za-z0-9]+)*$/;

        if (value === "") {
            Swal.fire({
                icon: "error",
                title: "Manjka uporabniško ime ali e-pošta",
                text: "Prosimo, vnesite svoje uporabniško ime ali e-pošto."
            });
            return false;
        }

        if (value.includes("@")) {
            // Email validacija
            if (!emailPattern.test(value)) {
                Swal.fire({
                    icon: "error",
                    title: "Neveljaven e-poštni naslov",
                    text: "Vnesite veljaven e-poštni naslov."
                });
                return false;
            }
        } else {
            // Validacija uporabniškega imena
            if (!usernamePattern.test(value)) {
                Swal.fire({
                    icon: "error",
                    title: "Neveljavno uporabniško ime",
                    text: "Uporabniško ime lahko vsebuje samo alfanumerične znake ali enojne vezaje in se ne sme začeti ali končati z vezajem."
                });
                return false;
            }
        }

        return true;
    }

    // Validacija gesla
    function validatePassword() {
        const value = password.value;
        const strong = value.length >= 15;
        const medium = value.length >= 8 && /[a-z]/.test(value) && /\d/.test(value);

        if (value === "") {
            Swal.fire({
                icon: "error",
                title: "Manjkajoče geslo",
                text: "Prosimo, vnesite svoje geslo."
            });
            return false;
        }

        if (!strong && !medium) {
            Swal.fire({
                icon: "error",
                title: "Šibko geslo",
                text: "Geslo mora imeti vsaj 15 znakov ALI 8+, vključno s številko in malo črko."
            });
            return false;
        }

        return true;
    }

    // Ob oddaji forme
    form.addEventListener("submit", function (event) {
        event.preventDefault(); // prepreči reload

        const validUsername = validateUsernameOrEmail();
        const validPassword = validatePassword();

        if (!validUsername || !validPassword) {
            return; // če je napaka, končamo
        }

        // Uspeh - vse validacije so uspešne
        Swal.fire({
            icon: "success",
            title: "Prijava uspešna!",
            text: "Prijavljeni ste."
        });
    });
});