document.addEventListener("DOMContentLoaded", function () {
    const body = document.body;

    // ChartJS for Performance Overview
    const ctx = document.getElementById("quizChart").getContext("2d");
    new Chart(ctx, {
        type: "bar",
        data: {
            labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
            datasets: [{
                label: "Quizzes Taken",
                data: [50, 70, 80, 120, 90, 110],
                backgroundColor: "#14ffec"
            }]
        }
    });

});

document.getElementById("logoutBtn").addEventListener("click", function() {
    localStorage.removeItem("loggedInUserEmail");
    localStorage.removeItem("loggedInUserName");
    localStorage.removeItem("loggedInUserRole");
    location.reload(); 
    window.location.href = "index.html"; 
});

