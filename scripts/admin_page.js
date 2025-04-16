document.addEventListener("DOMContentLoaded", function () {
    let chartInstance;
    const mainContent = document.getElementById("mainContent");
    const editQuizContainer = document.querySelector(".edit-quiz-container");
    const questionSection = document.getElementById("question-section");

    function createChart() {
        const ctx = document.getElementById("quizChart").getContext("2d");
        if (chartInstance) {
            chartInstance.destroy();
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

    createChart();

    function renderQuizList() {
        mainContent.innerHTML = `
            <div class="quiz-header">
                <div class="search-bar">
                    <input type="text" placeholder="Search">
                    <button class="search-btn">
                        <i class="fas fa-search"></i>
                    </button>
                </div>
                <a href="create_quiz.html">
                    <button class="create-quiz-btn">Create Quiz</button>
                </a>
            </div>
            <table class="quiz-table">
                <thead>
                    <tr>
                        <th>Quiz Title</th>
                        <th>Category</th>
                        <th>Difficulty</th>
                        <th>Questions No.</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    ${mockQuizData.map(quiz => `
                        <tr data-quiz-id="${quiz.id}">
                            <td>${quiz.name}</td>
                            <td>${quiz.category}</td>
                            <td>${quiz.difficulty}</td>
                            <td>${quiz.questions ? quiz.questions.length : 0}</td>
                            <td>
                                <button class="edit-quiz-btn">Edit</button>
                                <button class="delete-quiz-btn">Delete</button>
                            </td>
                        </tr>
                    `).join('')}
                </tbody>
            </table>
        `;
        attachQuizListListeners();
    }

    function attachQuizListListeners() {
        const editQuizButtons = document.querySelectorAll(".edit-quiz-btn");
        const deleteButtons = document.querySelectorAll(".delete-quiz-btn");

        editQuizButtons.forEach(button => {
            button.addEventListener("click", function () {
                const quizId = parseInt(this.closest("tr").dataset.quizId);
                openEditQuizContainer(quizId);
            });
        });

        deleteButtons.forEach(btn => {
            btn.addEventListener("click", function () {
                const row = this.closest("tr");
                const quizIdToDelete = parseInt(row.dataset.quizId);
                const indexToDelete = mockQuizData.findIndex(quiz => quiz.id === quizIdToDelete);
                if (indexToDelete > -1) {
                    mockQuizData.splice(indexToDelete, 1);
                    renderQuizList();
                }
            });
        });
    }

    function openEditQuizContainer(quizId) {
        mainContent.style.display = "none";
        editQuizContainer.style.display = "flex";
        document.querySelector("header h1").textContent = "Edit Quiz";


        const quizIndex = mockQuizData.findIndex(quiz => quiz.id === quizId);

        if (quizIndex !== -1) {
            const quizSelect = document.getElementById("select-quiz-to-edit");
            if (quizSelect) {
                quizSelect.value = quizIndex;
                const loadEvent = new Event('change');
                quizSelect.dispatchEvent(loadEvent);
            } else {
                populateEditQuizForm(quizId);
            }
        } else {
            alert("Quiz not found!");
            showDashboard();
        }
    }

    function populateEditQuizForm(quizId) {
        const selectedQuiz = mockQuizData.find(quiz => quiz.id === quizId);
        if (selectedQuiz) {
            document.getElementById("quiz-name").value = selectedQuiz.name;
            document.getElementById("quiz-description").value = selectedQuiz.description || "";
            document.getElementById("quiz-category").value = selectedQuiz.category;
            document.getElementById("quiz-difficulty").value = selectedQuiz.difficulty;
            questionSection.style.display = "block";

            const quizSelect = document.getElementById("select-quiz-to-edit");
            if (quizSelect) {
                quizSelect.innerHTML = '';
                const defaultOption = document.createElement('option');
                defaultOption.value = '';
                defaultOption.textContent = 'Select a Quiz to Edit';
                quizSelect.appendChild(defaultOption);
                mockQuizData.forEach((quiz, index) => {
                    const option = document.createElement('option');
                    option.value = index;
                    option.textContent = `${quiz.name} (ID: ${quiz.id})`;
                    option.selected = mockQuizData.indexOf(selectedQuiz) === index;
                    quizSelect.appendChild(option);
                });
            }
        } else {
            alert("Quiz not found!");
            showDashboard();
        }
    }

    function showDashboard() {
        document.querySelector("header h1").textContent = "Dashboard";
        mainContent.style.display = "block";
        editQuizContainer.style.display = "none";
        mainContent.innerHTML = `
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
        createChart();
    }

    document.getElementById("dashboardMenu").addEventListener("click", function () {
        document.querySelectorAll(".menu li").forEach(li => li.classList.remove("active"));
        this.classList.add("active");
        document.querySelector("header h1").textContent = "Dashboard";
        mainContent.style.display = "block";
        editQuizContainer.style.display = "none";
        showDashboard();
    });

    document.getElementById("quizzesMenu").addEventListener("click", function () {
        document.querySelectorAll(".menu li").forEach(li => li.classList.remove("active"));
        this.classList.add("active");
        document.querySelector("header h1").textContent = "Quizzes";
        mainContent.style.display = "block";
        editQuizContainer.style.display = "none";
        renderQuizList();
    });

    document.getElementById("usersMenu").addEventListener("click", function () {
        document.querySelectorAll(".menu li").forEach(li => li.classList.remove("active"));
        this.classList.add("active");
        document.querySelector("header h1").textContent = "Users";
        mainContent.style.display = "block";
        editQuizContainer.style.display = "none";
        mainContent.innerHTML = `
            <div class="user-header">
                <div class="search-bar">
                    <input type="text" id="userSearchInput" placeholder="Search by name or email">
                    <button class="search-btn">
                        <i class="fas fa-search"></i>
                    </button>
                </div>
                <a>
                    <button id="addUserBtn" class="create-quiz-btn">Add User</button>
                </a>
            </div>
            <table class="user-table">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Password</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Alice Johnson</td>
                        <td>alice@example.com</td>
                        <td>alice123</td>
                        <td>
                            <button class="edit-btn">Edit</button>
                            <button class="delete-btn">Delete</button>
                        </td>
                    </tr>
                    <tr>
                        <td>Bob Smith</td>
                        <td>bob@example.com</td>
                        <td>bob@123</td>
                        <td>
                            <button class="edit-btn">Edit</button>
                            <button class="delete-btn">Delete</button>
                        </td>
                    </tr>
                </tbody>
            </table>
        `;
        attachEditAndDeleteListeners("users");
        function attachEditAndDeleteListeners(context) {
            const editButtons = document.querySelectorAll(".edit-btn");
            const deleteButtons = document.querySelectorAll(".delete-btn");
    
            deleteButtons.forEach((btn) => {
                btn.addEventListener("click", function () {
                    const row = this.closest("tr");
                    row.remove();
                });
            });
    
            editButtons.forEach((btn) => {
                btn.addEventListener("click", function () {
                    const row = this.closest("tr");
                    const cells = row.querySelectorAll("td");
                    const editableIndices = context === "quizzes" ? [0, 1, 2] : [0, 1, 2];
                
                    editableIndices.forEach((i) => {
                        const originalValue = cells[i].textContent.trim();
                        const input = document.createElement("input");
                        input.type = "text";
                        input.value = originalValue;
                        input.className = "edit-input";
                        input.setAttribute("data-original", originalValue);
                        input.style.width = "90%";
                        cells[i].innerHTML = "";
                        cells[i].appendChild(input);
                    });
                
                    const actionsCell = cells[cells.length - 1];
                    actionsCell.innerHTML = "";
                
                    const okButton = document.createElement("button");
                    okButton.textContent = "OK";
                    okButton.className = "ok-btn";
                
                    const cancelButton = document.createElement("button");
                    cancelButton.textContent = "Cancel";
                    cancelButton.className = "cancel-btn";
                    cancelButton.style.marginLeft = "10px";
                
                    actionsCell.appendChild(okButton);
                    actionsCell.appendChild(cancelButton);
                
                    okButton.addEventListener("click", () => {
                        const inputs = editableIndices.map(i => cells[i].querySelector("input"));
                        const name = inputs[0].value.trim();
                        const email = inputs[1].value.trim();
                        const password = inputs[2].value.trim();
            
                        // Validate inputs
                        if (!name) {
                            alert("Name cannot be empty");
                            return;
                        }
            
                        const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
                        if (!emailRegex.test(email)) {
                            alert("Please enter a valid email address");
                            return;
                        }
            
                        if (password.length < 6) {
                            alert("Password must be at least 6 characters long");
                            return;
                        }
            
                        // If validation passes, update the row
                        editableIndices.forEach((i, index) => {
                            const input = inputs[index];
                            cells[i].textContent = input.value;
                        });
            
                        actionsCell.innerHTML = `
                            <button class="edit-btn">Edit</button>
                            <button class="delete-btn">Delete</button>
                        `;
                
                        attachEditAndDeleteListeners(context);
                    });
                
                    cancelButton.addEventListener("click", () => {
                        editableIndices.forEach((i) => {
                            const input = cells[i].querySelector("input");
                            cells[i].textContent = input.getAttribute("data-original");
                        });
                
                        actionsCell.innerHTML = `
                            <button class="edit-btn">Edit</button>
                            <button class="delete-btn">Delete</button>
                        `;
                
                        attachEditAndDeleteListeners(context);
                    });
                });
            });
        }
    
        document.getElementById("addUserBtn").addEventListener("click", function () {
            const tbody = document.querySelector(".user-table tbody");
        
            const newRow = document.createElement("tr");
            newRow.innerHTML = `
                <td><input type="text" class="edit-input" placeholder="Name" style="width: 90%"></td>
                <td><input type="text" class="edit-input" placeholder="Email" style="width: 90%"></td>
                <td><input type="text" class="edit-input" placeholder="Password" style="width: 90%"></td>
                <td>
                    <button class="ok-btn">OK</button>
                    <button class="cancel-btn" style="margin-left: 10px;">Cancel</button>
                </td>
            `;
            tbody.appendChild(newRow);
        
            const okBtn = newRow.querySelector(".ok-btn");
            const cancelBtn = newRow.querySelector(".cancel-btn");
        
            okBtn.addEventListener("click", () => {
                const inputs = newRow.querySelectorAll("input");
                const name = inputs[0].value.trim();
                const email = inputs[1].value.trim();
                const password = inputs[2].value.trim();
        
                if (!name) {
                    alert("Name cannot be empty");
                    return;
                }
        
                const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
                if (!emailRegex.test(email)) {
                    alert("Please enter a valid email address");
                    return;
                }
        
                if (password.length < 6) {
                    alert("Password must be at least 6 characters long");
                    return;
                }
        
                inputs.forEach(input => {
                    const td = input.parentElement;
                    td.textContent = input.value;
                });
        
                const actionsCell = newRow.querySelector("td:last-child");
                actionsCell.innerHTML = `
                    <button class="edit-btn">Edit</button>
                    <button class="delete-btn">Delete</button>
                `;
        
                attachEditAndDeleteListeners("users");
            });
        
            cancelBtn.addEventListener("click", () => {
                newRow.remove();
            });
        });

        document.getElementById("userSearchInput").addEventListener("input", function () {
            const filter = this.value.toLowerCase();
            const rows = document.querySelectorAll(".user-table tbody tr");
        
            rows.forEach(row => {
                const name = row.cells[0].textContent.toLowerCase();
                const email = row.cells[1].textContent.toLowerCase();
        
                if (name.includes(filter) || email.includes(filter)) {
                    row.style.display = "";
                } else {
                    row.style.display = "none"; 
                }
            });
        });
    });


    document.getElementById("logoutBtn").addEventListener("click", function () {
        localStorage.removeItem("loggedInUserEmail");
        localStorage.removeItem("loggedInUserName");
        localStorage.removeItem("loggedInUserRole");
        location.reload();
        window.location.href = "index.html";
    });

    showDashboard();
});

document.addEventListener('DOMContentLoaded', () => {
    const quizNameInput = document.getElementById('quiz-name');
    const quizDescriptionInput = document.getElementById('quiz-description');
    const quizCategoryInput = document.getElementById('quiz-category');
    const quizDifficultyInput = document.getElementById('quiz-difficulty');
    const questionSection = document.getElementById('question-section');
    const selectQuestionDropdown = document.getElementById('select-question');
    const removeQuestionButton = document.getElementById('remove-question');
    const questionTypeDropdown = document.getElementById('question-type');
    const questionTextInput = document.getElementById('question-text');
    const mcqOptionsDiv = document.getElementById('mcq-options');
    const choicesContainer = document.getElementById('choices-container');
    const addChoiceButton = document.getElementById('add-choice');
    const correctAnswerSelect = document.getElementById('correct-mcq-answer');
    const questionMarkInput = document.getElementById('question-mark');
    const saveQuestionButton = document.getElementById('save-question-btn');
    const finishButton = document.getElementById('finish-btn');
    const questionNumberDisplay = document.getElementById('question-number');
    const quizInfoDiv = document.getElementById('quiz-info');
    const selectQuizLabel = document.getElementById('select-quiz-label');
    let quizSelectDropdown;

    let currentQuizIndex = null;
    let currentQuestionIndex = null;
    let editingQuiz = null;

    function populateQuizDropdown() {
        if (quizSelectDropdown) {
            quizInfoDiv.removeChild(quizSelectDropdown);
        }
        quizSelectDropdown = document.createElement('select');
        quizSelectDropdown.id = 'select-quiz-to-edit';
        const defaultOption = document.createElement('option');
        defaultOption.value = '';
        defaultOption.textContent = 'Select a Quiz to Edit';
        quizSelectDropdown.appendChild(defaultOption);

        mockQuizData.forEach((quiz, index) => {
            const option = document.createElement('option');
            option.value = index;
            option.textContent = `${quiz.name} (ID: ${quiz.id})`;
            quizSelectDropdown.appendChild(option);
        });

        quizSelectDropdown.addEventListener('change', loadSelectedQuiz);
        quizInfoDiv.insertBefore(quizSelectDropdown, selectQuizLabel.nextSibling);
    }

    function loadSelectedQuiz() {
        const selectedIndex = parseInt(quizSelectDropdown.value, 10);

        if (!isNaN(selectedIndex) && selectedIndex >= 0 && selectedIndex < mockQuizData.length) {
            editingQuiz = { ...mockQuizData[selectedIndex] };
            currentQuizIndex = selectedIndex;
            currentQuestionIndex = 0;

            quizNameInput.value = editingQuiz.name;
            quizDescriptionInput.value = editingQuiz.description || "";
            quizCategoryInput.value = editingQuiz.category;
            quizDifficultyInput.value = editingQuiz.difficulty;

            populateQuestionDropdown(editingQuiz.questions || []);
            loadQuestion(0);
            finishButton.disabled = false;
            questionSection.style.display = 'block';
        } else {
            resetEditForm();
        }
    }

    function populateQuestionDropdown(questions) {
        selectQuestionDropdown.innerHTML = '';
        questions.forEach((question, index) => {
            const option = document.createElement('option');
            option.value = index;
            option.textContent = `Q${index + 1}: ${question.questionText.substring(0, 50)}...`;
            selectQuestionDropdown.appendChild(option);
        });
        if (questions.length > 0) {
            selectQuestionDropdown.value = 0;
        } else {
            resetQuestionForm();
        }
    }

    function loadQuestion(index) {
        if (editingQuiz && editingQuiz.questions && editingQuiz.questions.length > index) {
            const question = editingQuiz.questions[index];
            currentQuestionIndex = index;
            questionNumberDisplay.textContent = index + 1;
            questionTypeDropdown.value = question.questionType;
            questionTextInput.value = question.questionText;
            questionMarkInput.value = question.marks;

            choicesContainer.innerHTML = '';
            correctAnswerSelect.innerHTML = '';

            if (question.questionType === 'mcq') {
                mcqOptionsDiv.style.display = 'block';
                addChoiceButton.style.display = 'inline-block';
                question.options.forEach((option, i) => {
                    addChoiceInput(String.fromCharCode(65 + i), option);
                    const correctOption = document.createElement('option');
                    correctOption.value = String.fromCharCode(65 + i);
                    correctOption.textContent = String.fromCharCode(65 + i);
                    correctAnswerSelect.appendChild(correctOption);
                });
                correctAnswerSelect.value = question.correctAnswer;
            } else if (question.questionType === 'truefalse') {
                mcqOptionsDiv.style.display = 'block';
                addChoiceButton.style.display = 'none';
                addChoiceInput('A', 'True', true);
                addChoiceInput('B', 'False', true);
                const trueOption = document.createElement('option');
                trueOption.value = 'A';
                trueOption.textContent = 'A';
                correctAnswerSelect.appendChild(trueOption);
                const falseOption = document.createElement('option');
                falseOption.value = 'B';
                falseOption.textContent = 'B';
                correctAnswerSelect.appendChild(falseOption);
                correctAnswerSelect.value = question.correctAnswer;
            }
            removeQuestionButton.disabled = false;
        } else {
            resetQuestionForm();
            removeQuestionButton.disabled = true;
        }
    }

    function addChoiceInput(letter, value = '', disabled = false) {
        const choiceWrapper = document.createElement('div');
        choiceWrapper.classList.add('choice-container');

        const choiceLabel = document.createElement('label');
        choiceLabel.textContent = `${letter}:`;

        const choiceInput = document.createElement('input');
        choiceInput.type = 'text';
        choiceInput.value = value;
        choiceInput.placeholder = `Choice ${letter}`;
        choiceInput.name = letter;
        choiceInput.disabled = disabled;

        const removeBtn = document.createElement("button");
        removeBtn.textContent = "X";
        removeBtn.classList.add("remove-choice");
        removeBtn.onclick = function () {
            deleteChoice(choiceWrapper);
        };

        choiceWrapper.appendChild(choiceLabel);
        choiceWrapper.appendChild(choiceInput);
        if (!disabled) {
            choiceWrapper.appendChild(removeBtn);
        }
        choicesContainer.appendChild(choiceWrapper);
    }

    function deleteChoice(choiceWrapper) {
        const choiceCount = choicesContainer.children.length;
        if (choiceCount > 2 && questionTypeDropdown.value === 'mcq') {
            choicesContainer.removeChild(choiceWrapper);
            updateChoiceLabels();
            updateCorrectAnswerDropdown();
        } else if (questionTypeDropdown.value === 'mcq') {
            alert('MCQ must have at least two choices.');
        }
    }

    function updateChoiceLabels() {
        const choices = choicesContainer.children;
        correctAnswerSelect.innerHTML = '';
        for (let i = 0; i < choices.length; i++) {
            const choiceWrapper = choices[i];
            const letter = String.fromCharCode(65 + i);
            const choiceLabel = choiceWrapper.querySelector('label');
            choiceLabel.textContent = `${letter}:`;
            const choiceInput = choiceWrapper.querySelector('input');
            choiceInput.name = letter;
            choiceInput.placeholder = `Choice ${letter}`;
            const correctOption = document.createElement('option');
            correctOption.value = letter;
            correctOption.textContent = letter;
            correctAnswerSelect.appendChild(correctOption);
        }
        if (editingQuiz && editingQuiz.questions && editingQuiz.questions[currentQuestionIndex]) {
            correctAnswerSelect.value = editingQuiz.questions[currentQuestionIndex].correctAnswer;
        }
    }

    function updateCorrectAnswerDropdown() {
        const choices = choicesContainer.querySelectorAll('input[type="text"]');
        correctAnswerSelect.innerHTML = '';
        choices.forEach((choice, index) => {
            const letter = String.fromCharCode(65 + index);
            const option = document.createElement('option');
            option.value = letter;
            option.textContent = letter;
            correctAnswerSelect.appendChild(option);
        });
        if (editingQuiz && editingQuiz.questions && editingQuiz.questions[currentQuestionIndex]) {
            correctAnswerSelect.value = editingQuiz.questions[currentQuestionIndex].correctAnswer;
        }
    }

    addChoiceButton.addEventListener('click', () => {
        const choiceCount = choicesContainer.children.length;
        if (choiceCount < 7 && questionTypeDropdown.value === 'mcq') {
            addChoiceInput(String.fromCharCode(65 + choiceCount));
            updateCorrectAnswerDropdown();
        } else if (questionTypeDropdown.value === 'mcq') {
            alert('You cannot add more than 7 choices.');
        }
    });

    selectQuestionDropdown.addEventListener('change', () => {
        const selectedIndex = parseInt(selectQuestionDropdown.value, 10);
        if (!isNaN(selectedIndex)) {
            loadQuestion(selectedIndex);
        }
    });

    removeQuestionButton.addEventListener('click', () => {
        if (editingQuiz && editingQuiz.questions && editingQuiz.questions.length > 1) {
            editingQuiz.questions.splice(currentQuestionIndex, 1);
            populateQuestionDropdown(editingQuiz.questions);
            loadQuestion(Math.min(currentQuestionIndex, editingQuiz.questions.length - 1));
        } else if (editingQuiz && editingQuiz.questions.length === 1) {
            editingQuiz.questions = [];
            populateQuestionDropdown([]);
            resetQuestionForm();
            removeQuestionButton.disabled = true;
        } else {
            alert('The quiz must have at least one question.');
        }
    });

    questionTypeDropdown.addEventListener('change', () => {
        const type = questionTypeDropdown.value;
        choicesContainer.innerHTML = '';
        correctAnswerSelect.innerHTML = '';
        if (type === 'mcq') {
            mcqOptionsDiv.style.display = 'block';
            addChoiceButton.style.display = 'inline-block';
            addChoiceInput('A');
            addChoiceInput('B');
            updateCorrectAnswerDropdown();
        } else if (type === 'truefalse') {
            mcqOptionsDiv.style.display = 'block';
            addChoiceButton.style.display = 'none';
            addChoiceInput('A', 'True', true);
            addChoiceInput('B', 'False', true);
            const trueOption = document.createElement('option');
            trueOption.value = 'A';
            trueOption.textContent = 'A';
            correctAnswerSelect.appendChild(trueOption);
            const falseOption = document.createElement('option');
            falseOption.value = 'B';
            falseOption.textContent = 'B';
            correctAnswerSelect.appendChild(falseOption);
            correctAnswerSelect.value = 'A';
        }
    });

    function getCurrentChoices() {
        const choicesInputs = choicesContainer.querySelectorAll('input[type="text"]');
        return Array.from(choicesInputs).map(input => input.value.trim()).filter(value => value !== '');
    }

    saveQuestionButton.addEventListener('click', () => {
        if (!editingQuiz) {
            alert('Please select a quiz to edit.');
            return;
        }

        const questionText = questionTextInput.value.trim();
        const questionType = questionTypeDropdown.value;
        const questionMarks = parseInt(questionMarkInput.value, 10);
        const correctAnswer = correctAnswerSelect.value;
        const options = getCurrentChoices();

        if (!questionText || isNaN(questionMarks) || questionMarks < 1) {
            alert('Please enter a valid question and marks.');
            return;
        }

        if (questionType === 'mcq' && options.length < 2) {
            alert('MCQ must have at least two choices.');
            return;
        }

        const newQuestion = {
            questionText,
            questionType,
            options: questionType === 'mcq' ? options : ['True', 'False'],
            correctAnswer,
            marks: questionMarks
        };

        if (editingQuiz.questions && editingQuiz.questions[currentQuestionIndex] !== undefined) {
            editingQuiz.questions[currentQuestionIndex] = newQuestion;
            alert('Question saved.');
            populateQuestionDropdown(editingQuiz.questions);
            selectQuestionDropdown.value = currentQuestionIndex;
        } else if (editingQuiz.questions) {
            editingQuiz.questions.push(newQuestion);
            populateQuestionDropdown(editingQuiz.questions);
            selectQuestionDropdown.value = editingQuiz.questions.length - 1;
            loadQuestion(editingQuiz.questions.length - 1);
        } else {
            editingQuiz.questions = [newQuestion];
            populateQuestionDropdown(editingQuiz.questions);
            selectQuestionDropdown.value = 0;
            loadQuestion(0);
        }
    });

    finishButton.addEventListener('click', () => {
        if (!editingQuiz) {
            alert('Please select a quiz to edit.');
            return;
        }

        const quizName = quizNameInput.value.trim();
        const quizDescription = quizDescriptionInput.value.trim();
        const quizCategory = quizCategoryInput.value.trim();
        const quizDifficulty = quizDifficultyInput.value;

        if (!quizName || !quizDescription || !quizCategory || !quizDifficulty) {
            alert('Please fill all quiz details.');
            return;
        }

        if (!editingQuiz.questions || editingQuiz.questions.length === 0) {
            alert('The quiz must have at least one question.');
            return;
        }

        if (currentQuizIndex !== null && currentQuizIndex >= 0 && currentQuizIndex < mockQuizData.length) {
            mockQuizData[currentQuizIndex] = { ...editingQuiz, name: quizName, description: quizDescription, category: quizCategory, difficulty: quizDifficulty };
            alert(`Quiz "${quizName}" (ID: ${mockQuizData[currentQuizIndex].id}) updated successfully!`);
            window.location.href = "index.html";
        } else {
            alert('Error updating quiz.');
        }
    });

    function resetQuestionForm() {
        questionNumberDisplay.textContent = 1;
        questionTextInput.value = '';
        questionTypeDropdown.value = 'mcq';
        questionMarkInput.value = '';
        choicesContainer.innerHTML = '';
        correctAnswerSelect.innerHTML = '';
        mcqOptionsDiv.style.display = 'block';
        addChoiceButton.style.display = 'inline-block';
        addChoiceInput('A');
        addChoiceInput('B');
        updateCorrectAnswerDropdown();
    }

    function resetEditForm() {
        const quizSelect = document.getElementById('select-quiz-to-edit');
        if (quizSelect) {
            quizSelect.value = '';
        }
        quizNameInput.value = '';
        quizDescriptionInput.value = '';
        quizCategoryInput.value = '';
        quizDifficultyInput.value = 'Easy';
        questionSection.style.display = 'none';
        resetQuestionForm();
        selectQuestionDropdown.innerHTML = '';
        removeQuestionButton.disabled = true;
        finishButton.disabled = true;
        editingQuiz = null;
        currentQuizIndex = null;
        currentQuestionIndex = null;
    }

    populateQuizDropdown();
    resetEditForm();
});