document.getElementById("subscribe-btn").addEventListener("click", function () {
    const email = document.getElementById("email-input").value;
    const msg = document.querySelector(".newsletter-msg");

    if (email === "" || !email.includes("@")) {
        msg.style.color = "red";
        msg.textContent = "Introduce un correo válido.";
        return;
    }

    // Guardar en localStorage
    let storedEmails = JSON.parse(localStorage.getItem("newsletterEmails")) || [];
    storedEmails.push(email);
    localStorage.setItem("newsletterEmails", JSON.stringify(storedEmails));

    msg.style.color = "green";
    msg.textContent = "¡Gracias por suscribirte!";

    document.getElementById("email-input").value = "";
});
