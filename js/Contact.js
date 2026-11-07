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
    
    let isVaild = true;

    if (name === "") {
       document.getElementById("nameErr").textContent = "Please enter your name.";
       isVaild = false;
    }

    if (email === "") {
       document.getElementById("emailErr").textContent = "Please enter your email.";
       isVaild = false;
    } else if  (!email.includes("@") || !email.includes(".")) {
        document.getElementById("emailErr").textContent = "Please enter your valid email.";
        isVaild = false;
    }

    if (message === "") {
       document.getElementById("messageErr").textContent = "Please write your message.";
       isVaild = false;
    }
});
