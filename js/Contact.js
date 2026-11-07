const form = document.getElementById("contactForm");

form.addEventListener("submit", function (event) {
    event.preventDefault();

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const message = document.getElementById("message").value.trim();
    const formMsg = document.getElementById("formMsg");

    document.getElementById("nameErr").textContent = "";
    document.getElementById("emailErr").textContent = "";
    document.getElementById("messageErr").textContent = "";
    
    let isValid = true;

    if (name === "") {
       document.getElementById("nameErr").textContent = "Please enter your name.";
       isValid = false;
    }

    if (email === "") {
       document.getElementById("emailErr").textContent = "Please enter your email.";
       isValid = false;
    } else if  (!email.includes("@") || !email.includes(".")) {
        document.getElementById("emailErr").textContent = "Please enter your valid email.";
        isValid = false;
    }

    if (message === "") {
       document.getElementById("messageErr").textContent = "Please write your message.";
       isValid = false;
    }

    if (isVaild) {
        formMsg.className = "ok";
        formMsg.textContent = "Message sent. Thank you, " + name + "!";
        form.reset();
    } else {
        formMsg.className = "bad";
        formMsg.textContent = "Please fix the error"
    }
});
