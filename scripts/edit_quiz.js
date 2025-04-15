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

    let currentQuizIndex = null;
    let currentQuestionIndex = null;
    let editingQuiz = null;

    function populateQuizDropdown() {
        const quizSelect = document.createElement('select');
        quizSelect.id = 'select-quiz-to-edit';
        const defaultOption = document.createElement('option');
        defaultOption.value = '';
        defaultOption.textContent = 'Select a Quiz to Edit';
        quizSelect.appendChild(defaultOption);

        mockQuizData.forEach((quiz, index) => {
            const option = document.createElement('option');
            option.value = index;
            option.textContent = `${quiz.name} (ID: ${quiz.id})`;
            quizSelect.appendChild(option);
        });

        quizSelect.addEventListener('change', loadSelectedQuiz);
        const quizInfoDiv = document.getElementById('quiz-info');
        const selectQuizLabel = document.getElementById('select-quiz-label');

        quizInfoDiv.insertBefore(quizSelect, selectQuizLabel.nextSibling);
    }

    function loadSelectedQuiz() {
        const quizSelect = document.getElementById('select-quiz-to-edit');
        const selectedIndex = parseInt(quizSelect.value, 10);

        if (!isNaN(selectedIndex) && selectedIndex >= 0 && selectedIndex < mockQuizData.length) {
            editingQuiz = { ...mockQuizData[selectedIndex] };
            currentQuizIndex = selectedIndex;
            currentQuestionIndex = 0;

            quizNameInput.value = editingQuiz.name;
            quizDescriptionInput.value = editingQuiz.description;
            quizCategoryInput.value = editingQuiz.category;
            quizDifficultyInput.value = editingQuiz.difficulty;

            populateQuestionDropdown(editingQuiz.questions);
            loadQuestion(0);
            finishButton.disabled = false;
            questionSection.style.display = 'flex';
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
        selectQuestionDropdown.value = 0;
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

        if (editingQuiz.questions && editingQuiz.questions[currentQuestionIndex] !== undefined) {
            editingQuiz.questions[currentQuestionIndex] = {
                questionText,
                questionType,
                options: questionType === 'mcq' ? options : ['True', 'False'],
                correctAnswer,
                marks: questionMarks
            };
            alert('Question saved.');
            populateQuestionDropdown(editingQuiz.questions);
            selectQuestionDropdown.value = currentQuestionIndex;
        } else if (editingQuiz.questions) {
            editingQuiz.questions.push({
                questionText,
                questionType,
                options: questionType === 'mcq' ? options : ['True', 'False'],
                correctAnswer,
                marks: questionMarks
            });
            populateQuestionDropdown(editingQuiz.questions);
            selectQuestionDropdown.value = editingQuiz.questions.length - 1;
            loadQuestion(editingQuiz.questions.length - 1);
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