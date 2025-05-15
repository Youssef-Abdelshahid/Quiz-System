document.addEventListener("DOMContentLoaded", () => {
    updateUserInterface();
});

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
        // alert("Welcome Admin!");
        localStorage.setItem("loggedInUserEmail", adminEmail);
        localStorage.setItem("loggedInUserPassword", adminPassword);
        localStorage.setItem("loggedInUserName", "Admin");
        localStorage.setItem("loggedInUserRole", "Admin");
        window.location.href = "admin_page.html";
        updateUserInterface();
        closePopup();
    } else if (email === userEmail && password === userPassword) {
        // alert("Welcome User!");
        localStorage.setItem("loggedInUserEmail", userEmail);
        localStorage.setItem("loggedInUserPassword", userPassword);
        localStorage.setItem("loggedInUserName", "Ahmed");
        localStorage.setItem("loggedInUserRole", "User");


        updateUserInterface();
        closePopup();
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



function updateUserInterface() {
    let userEmail = localStorage.getItem("loggedInUserEmail");
    let userName = localStorage.getItem("loggedInUserName");
    let userRole = localStorage.getItem("loggedInUserRole");

    let loginButton = document.querySelector(".login-btn");
    let rightSideHeader = document.querySelector(".right-side-header");

    if (userEmail && userName && userRole) {
        if (loginButton) {
            loginButton.style.display = "none"; // Hide login button
        }

        // Check if the profile button already exists to prevent multiple duplicates
        if (!document.querySelector(".profile-btn")) {
            let profileButton = document.createElement("button");
            profileButton.classList.add("icon-btn", "profile-btn");
            profileButton.innerHTML = `<i class="fas fa-user-circle"></i>`;
            profileButton.onclick = openProfilePopup; // Open profile popup
            rightSideHeader.appendChild(profileButton);
        }
    }
}


function openProfilePopup() {
    let userEmail = localStorage.getItem("loggedInUserEmail");
    let userName = localStorage.getItem("loggedInUserName");
    let userRole = localStorage.getItem("loggedInUserRole");
    let userpassword = localStorage.getItem("loggedInUserPassword");

    if (!userEmail || !userName || !userRole) return;

    document.getElementById("popup-container").style.display = "flex";
    document.getElementById("popup-overlay").style.display = "flex";
    disableScroll();

    const popupContent = document.getElementById("popup-content");
    popupContent.innerHTML = `
        <h2>Welcome, <span id="profile-name-text">${userName}</span></h2>
        <p>Email: <span id="profile-email-text">${userEmail}</span></p>
        <p>Role: <span id="profile-role-text">${userRole}</span></p>
        <button id="editProfileBtn" class="btn-submit">Edit Profile</button>
        <button id="createQuizBtn" class="btn-submit create-quiz-btn">Create Quiz</button>
        <button id="historyBtn" class="btn-submit create-quiz-btn">History</button>
        <button id="logoutBtn" class="btn-submit">Logout</button>
    `;

    document.getElementById("createQuizBtn").onclick = createQuiz;
    document.getElementById("historyBtn").onclick = quizzesHistory;
    document.getElementById("logoutBtn").onclick = logout;

    const editBtn = document.getElementById("editProfileBtn");
    editBtn.addEventListener("click", () => {
        popupContent.innerHTML = `
            <h2>Welcome, <input id="profile-name-input" type="text" value="${userName}" style="width: 200px;"></h2>
            <p>Email: <input id="profile-email-input" type="email" value="${userEmail}" style="width: 250px;"></p>
            <p>Password: <input id="profile-password-input" type="text" value="${userpassword}" style="width: 250px;"></p>
            <p>Role: <span id="profile-role-text">${userRole}</span></p>
            <button id="saveProfileBtn" class="btn-submit">Save</button>
            <button id="cancelEditBtn" class="btn-submit" >Cancel</button>
        `;

        document.getElementById("saveProfileBtn").addEventListener("click", () => {
            const newName = document.getElementById("profile-name-input").value.trim();
            const newEmail = document.getElementById("profile-email-input").value.trim();
            const newPassword = document.getElementById("profile-password-input").value;

            if (!newName) {
                alert("Name cannot be empty");
                return;
            }
            const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
            if (!emailRegex.test(newEmail)) {
                alert("Please enter a valid email address");
                return;
            }
            if (newPassword && newPassword.length < 6) {
                alert("Password must be at least 6 characters long");
                return;
            }

            localStorage.setItem("loggedInUserName", newName);
            localStorage.setItem("loggedInUserEmail", newEmail);
            if (newPassword) {
                localStorage.setItem("loggedInUserPassword", newPassword);
            }

            openProfilePopup();
        });

        document.getElementById("cancelEditBtn").addEventListener("click", () => {
            openProfilePopup();
        });
    });
}


function createQuiz() {
    window.location.href = "create_quiz.html";
}

function quizzesHistory() {
    window.location.href = "history.html";
}

function redirectToHome() {
    window.location.href = "index.html";
}

function logout() {
    localStorage.removeItem("loggedInUserEmail");
    localStorage.removeItem("loggedInUserName");
    localStorage.removeItem("loggedInUserRole");
    location.reload();
}