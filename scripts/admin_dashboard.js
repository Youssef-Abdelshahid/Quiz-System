document.addEventListener("DOMContentLoaded", function () {
    let chartInstance;

    // Function to create chart
    function createChart() {
        const ctx = document.getElementById("quizChart").getContext("2d");
        if (chartInstance) {
            chartInstance.destroy(); // Destroy the existing chart before creating a new one
        }
        chartInstance = new Chart(ctx, {
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
    }

    // Initially create the chart when the page loads
    createChart();

    // Handle Dashboard Menu Click
    document.getElementById("dashboardMenu").addEventListener("click", function () {
        // Highlight the selected sidebar item
        document.querySelectorAll(".menu li").forEach(li => li.classList.remove("active"));
        this.classList.add("active");

        // Change header title
        document.querySelector("header h1").textContent = "Dashboard";

        // Replace main content with the original dashboard content
        const content = document.getElementById("mainContent");
        content.innerHTML = `
            <section class="stats">
                <div class="card light-green">
                    <i class="fa-solid fa-check"></i>
                    <h3>450</h3>
                    <p>Quizzes Completed</p>
                </div>
                <div class="card yellow">
                    <i class="fa-solid fa-clipboard-question"></i>
                    <h3>120</h3>
                    <p>Active Quizzes</p>
                </div>
                <div class="card blue">
                    <i class="fa-solid fa-users"></i>
                    <h3>780</h3>
                    <p>Users Registered</p>
                </div>
                <div class="card gray">
                    <i class="fa-solid fa-trophy"></i>
                    <h3>30</h3>
                    <p>Top Scorers</p>
                </div>
            </section>

            <section class="dashboard-content">
                <div class="chart-box">
                    <h2>Performance Overview</h2>
                    <canvas id="quizChart"></canvas>
                </div>
                <div class="todo-box">
                    <h2>Todo List</h2>
                    <ul id="todo-list">
                        <li>Review user feedback</li>
                        <li>Update quiz database</li>
                        <li>Optimize performance</li>
                    </ul>
                </div>
            </section>
        `;

        // Reinitialize the chart on dashboard load
        createChart();
    });

    // Handle Quizzes Menu Click
    document.getElementById("quizzesMenu").addEventListener("click", function () {
        // Highlight the selected sidebar item
        document.querySelectorAll(".menu li").forEach(li => li.classList.remove("active"));
        this.classList.add("active");

        // Change header title
        document.querySelector("header h1").textContent = "Quizzes";

        // Replace main content with quiz management content
        const content = document.getElementById("mainContent");
        content.innerHTML = `
        <div class="quiz-header">
        <div class="search-bar">
            <input type="text" placeholder="Search">
            <button class="search-btn">
                <i class="fas fa-search"></i>
            </button>
        </div>
            <a href="create_quiz.html">
            <button class="create-btn">Create Quiz</button>
            </a>
        </div>
            <table class="quiz-table">
                <thead>
                    <tr>
                        <th>Quiz Title</th>
                        <th>Category</th>
                        <th>Created On</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Math Basics</td>
                        <td>Mathematics</td>
                        <td>2025-04-13</td>
                        <td>
                            <button class="edit-btn">Edit</button>
                            <button class="delete-btn">Delete</button>
                        </td>
                    </tr>
                    <tr>
                        <td>History 101</td>
                        <td>History</td>
                        <td>2025-03-29</td>
                        <td>
                            <button class="edit-btn">Edit</button>
                            <button class="delete-btn">Delete</button>
                        </td>
                    </tr>
                </tbody>
            </table>
        `;
    });

    // Handle Logout Button Click
    document.getElementById("logoutBtn").addEventListener("click", function() {
        localStorage.removeItem("loggedInUserEmail");
        localStorage.removeItem("loggedInUserName");
        localStorage.removeItem("loggedInUserRole");
        location.reload();
        window.location.href = "index.html";
    });
});
