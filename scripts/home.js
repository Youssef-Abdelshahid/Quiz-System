function disableScroll() {
    window.addEventListener("wheel", preventScroll, { passive: false });
    window.addEventListener("touchmove", preventScroll, { passive: false });
}

function enableScroll() {
    window.removeEventListener("wheel", preventScroll);
    window.removeEventListener("touchmove", preventScroll);
}

function preventScroll(event) {
    event.preventDefault();
}

function openPopup(type) {
    document.getElementById("popup-container").style.display = "flex";
    document.getElementById("popup-overlay").style.display = "flex";
    disableScroll()

    toggleForm(type);
}

function closePopup() {
    document.getElementById("popup-container").style.display = "none";
    document.getElementById("popup-overlay").style.display = "none";
    enableScroll()
}

document.getElementById("popup-overlay").addEventListener("click", closePopup);

function toggleForm(type) {

    if (type === "signup") {
        document.querySelector(".google-btn").querySelector("i").nextSibling.nodeValue = " Sign up with Google";
        document.querySelector(".facebook-btn").querySelector("i").nextSibling.nodeValue = " Sign up with Facebook";

        document.getElementById("login-form").style.display = "none";
        document.getElementById("signup-form").style.display = "contents";
        document.getElementById("popup-title").innerText = "Sign Up";
        document.getElementById("login-form").style.animation = ";"
    } else {
        document.querySelector(".google-btn").querySelector("i").nextSibling.nodeValue = " Continue with Google";
        document.querySelector(".facebook-btn").querySelector("i").nextSibling.nodeValue = " Continue with Facebook";

        document.getElementById("signup-form").style.display = "none";
        document.getElementById("login-form").style.display = "contents";
        document.getElementById("popup-title").innerText = "Log in";
    }
}


function login() {
    let email = document.getElementById("email").value.trim();
    let password = document.getElementById("password").value.trim();

    const adminEmail = "admin@gmail.com";
    const adminPassword = "Admin123!";

    const userEmail = "ahmed@gmail.com";
    const userPassword = "Ahmed123!";

    if (email === "" || password === "") {
        alert("Please enter email and password!");
        return;
    }

    if (email === adminEmail && password === adminPassword) {
        alert("Welcome Admin!");
    } else if (email === userEmail && password === userPassword) {
        alert("Welcome User!");
    } else {
        alert("Invalid email or password!");
    }
}

function signup() {
    let name = document.getElementById("signup-name").value.trim();
    let email = document.getElementById("signup-email").value.trim();
    let password = document.getElementById("signup-password").value;
    let confirmPassword = document.getElementById("signup-confirm-password").value;

    let nameRegex = /^[A-Za-z\s]{3,}$/;
    if (!nameRegex.test(name)) {
        alert("Name must be at least 3 characters long and contain only letters and spaces!");
        return;
    }

    let emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        alert("Please enter a valid email address!");
        return;
    }

    let passwordRegex = /^(?=.*[0-9])(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;
    if (!passwordRegex.test(password)) {
        alert("Password must be at least 8 characters long, contain at least one number and one special character!");
        return;
    }

    if (password !== confirmPassword) {
        alert("Passwords do not match!");
        return;
    }

    alert("Sign-up successful!");
}
