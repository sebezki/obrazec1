document.addEventListener("DOMContentLoaded", function() {
    const form = document.querySelector("form");
    const email = document.getElementById("email");
      
    // Validacija emaila
    function validateEmail() {
        const value = email.value.trim();
        const emailPattern = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;
        
        if (value === "") {
          Swal.fire({
            icon: "error",
            title: "Manjka e-poštni naslov",
            text: "Prosimo, vnesite svoj e-poštni naslov."
			});
			return false;
        }
        
        if (!emailPattern.test(value)) {
          Swal.fire({
            icon: "error",
            title: "Neveljaven e-poštni naslov",
            text: "Prosimo, vnesite veljaven e-poštni naslov."
			});
			return false;
        }
        
        return true;
    }
      
    // Ob oddaji forme
    form.addEventListener("submit", function(event) {
    event.preventDefault();
        
    if (!validateEmail()) {
        return;
    }
        
        // Uspeh - email je veljaven
        Swal.fire({
          icon: "success",
          title: "E-pošta poslana!",
          text: "Preverite svojo e-pošto za povezavo za ponastavitev gesla."
		});
    });
});