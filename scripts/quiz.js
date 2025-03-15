let quizData = {
    name: "",
    description: "",
    category: "",
    difficulty: "",
    questions: [],
};

let mockQuizData = [
    {
        "name": "Basic Science Quiz",
        "description": "This quiz tests general scientific knowledge.",
        "category": "Science",
        "difficulty": "Medium",
        "questions": [
            {
                "questionText": "What is the chemical symbol for gold?",
                "questionType": "mcq",
                "options": ["Ag", "Au", "Pb", "Fe"],
                "correctAnswer": "B",
                "marks": 2
            },
            {
                "questionText": "How many planets are in the Solar System?",
                "questionType": "mcq",
                "options": ["7", "8", "9", "10"],
                "correctAnswer": "B",
                "marks": 2
            },
            {
                "questionText": "True or False: Sound travels faster in air than in water.",
                "questionType": "truefalse",
                "options": ["True", "False"],
                "correctAnswer": "B",
                "marks": 1
            },
            {
                "questionText": "Which gas do plants absorb during photosynthesis?",
                "questionType": "mcq",
                "options": ["Oxygen", "Nitrogen", "Carbon Dioxide", "Hydrogen"],
                "correctAnswer": "C",
                "marks": 2
            },
            {
                "questionText": "What is the powerhouse of the cell?",
                "questionType": "mcq",
                "options": ["Nucleus", "Mitochondria", "Ribosome", "Chloroplast"],
                "correctAnswer": "B",
                "marks": 2
            }
        ]
    }, {
        "name": "World History Quiz",
        "description": "This quiz covers important historical events and figures.",
        "category": "History",
        "difficulty": "Medium",
        "questions": [
            {
                "questionText": "Who was the first President of the United States?",
                "questionType": "mcq",
                "options": ["Abraham Lincoln", "George Washington", "Thomas Jefferson", "John Adams"],
                "correctAnswer": "B",
                "marks": 2
            },
            {
                "questionText": "In which year did World War II end?",
                "questionType": "mcq",
                "options": ["1943", "1944", "1945", "1946"],
                "correctAnswer": "C",
                "marks": 2
            },
            {
                "questionText": "True or False: The Great Fire of London happened in 1666.",
                "questionType": "truefalse",
                "options": ["True", "False"],
                "correctAnswer": "A",
                "marks": 1
            },
            {
                "questionText": "Who was the leader of Germany during World War II?",
                "questionType": "mcq",
                "options": ["Joseph Stalin", "Winston Churchill", "Franklin D. Roosevelt", "Adolf Hitler"],
                "correctAnswer": "D",
                "marks": 2
            },
            {
                "questionText": "Which empire built the Colosseum?",
                "questionType": "mcq",
                "options": ["Greek Empire", "Roman Empire", "Persian Empire", "Ottoman Empire"],
                "correctAnswer": "B",
                "marks": 2
            }
        ]
    }, {
        "name": "Basic Mathematics Quiz",
        "description": "This quiz tests fundamental math concepts.",
        "category": "Mathematics",
        "difficulty": "Easy",
        "questions": [
            {
                "questionText": "What is 5 + 7?",
                "questionType": "mcq",
                "options": ["10", "11", "12", "13"],
                "correctAnswer": "C",
                "marks": 2
            },
            {
                "questionText": "What is the square root of 64?",
                "questionType": "mcq",
                "options": ["6", "7", "8", "9"],
                "correctAnswer": "C",
                "marks": 2
            },
            {
                "questionText": "True or False: A triangle has three sides.",
                "questionType": "truefalse",
                "options": ["True", "False"],
                "correctAnswer": "A",
                "marks": 1
            },
            {
                "questionText": "What is the value of π (pi) rounded to two decimal places?",
                "questionType": "mcq",
                "options": ["3.12", "3.14", "3.16", "3.18"],
                "correctAnswer": "B",
                "marks": 2
            },
            {
                "questionText": "What is 9 × 9?",
                "questionType": "mcq",
                "options": ["72", "81", "90", "99"],
                "correctAnswer": "B",
                "marks": 2
            }
        ]
    }
];

function addChoice() {
    const choicesContainer = document.getElementById('choices-container');
    const choiceCount = choicesContainer.children.length;

    if (choiceCount < 7) {
        const letter = String.fromCharCode(65 + choiceCount);
        const choiceWrapper = document.createElement('div');
        choiceWrapper.classList.add('choice-container');

        const choiceInput = document.createElement('input');
        choiceInput.type = 'text';
        choiceInput.placeholder = `Choice ${letter}`;
        choiceInput.name = `${letter}`;
        choiceInput.required = true;

        const choiceLabel = document.createElement('label');
        choiceLabel.textContent = `${letter}:`;

        const removeBtn = document.createElement("button");
        removeBtn.textContent = "X";
        removeBtn.classList.add("remove-choice");
        removeBtn.onclick = function () {
            deleteChoice(choiceWrapper);
        };

        choiceWrapper.appendChild(choiceLabel);
        choiceWrapper.appendChild(choiceInput);
        if (letter !== 'A' && letter !== 'B') {
            choiceWrapper.appendChild(removeBtn);
        }

        choicesContainer.appendChild(choiceWrapper);
        updateCorrectAnswerDropdown();
    } else {
        alert('You cannot add more than 7 choices.');
    }
}

function deleteChoice(choiceWrapper) {
    const choicesContainer = document.getElementById('choices-container');
    const choiceCount = choicesContainer.children.length;

    if (choiceCount > 2) {
        choicesContainer.removeChild(choiceWrapper);
        updateChoiceLabels();
        updateCorrectAnswerDropdown();
    } else {
        alert('Choices A and B cannot be deleted.');
    }
}

function updateChoiceLabels() {
    const choicesContainer = document.getElementById('choices-container');
    const choices = choicesContainer.children;

    for (let i = 0; i < choices.length; i++) {
        const choiceWrapper = choices[i];
        const letter = String.fromCharCode(65 + i);
        const choiceLabel = choiceWrapper.querySelector('label');
        choiceLabel.textContent = `${letter}:`;

        const choiceInput = choiceWrapper.querySelector('input');
        choiceInput.placeholder = `${letter}`;
    }
}

function updateCorrectAnswerDropdown() {
    const dropdown = document.getElementById('correct-mcq-answer');
    dropdown.innerHTML = "";

    const choicesContainer = document.getElementById('choices-container');
    const choices = choicesContainer.children;

    for (let i = 0; i < choices.length; i++) {
        const letter = String.fromCharCode(65 + i);
        const choiceOption = document.createElement('option');
        choiceOption.value = letter;
        choiceOption.textContent = `${letter})`;
        dropdown.appendChild(choiceOption);
    }

    dropdown.disabled = false;
}

function initializeChoices() {
    const choicesContainer = document.getElementById('choices-container');

    if (choicesContainer.children.length < 2) {
        for (let i = 0; i < 2; i++) {
            const letter = String.fromCharCode(65 + i);
            const choiceWrapper = document.createElement('div');
            choiceWrapper.classList.add('choice-container');

            const choiceInput = document.createElement('input');
            choiceInput.type = 'text';
            choiceInput.placeholder = `Choice ${letter}`;
            choiceInput.name = `${letter}`;
            choiceInput.required = true;

            const choiceLabel = document.createElement('label');
            choiceLabel.textContent = `${letter}:`;

            choiceWrapper.appendChild(choiceLabel);
            choiceWrapper.appendChild(choiceInput);

            choicesContainer.appendChild(choiceWrapper);
        }
    }
    updateCorrectAnswerDropdown();
}

initializeChoices();

function updateQuestionType() {
    const questionType = document.getElementById('question-type').value;
    const choicesContainer = document.getElementById('choices-container');
    const choices = choicesContainer.querySelectorAll('.choice-container');
    const correctAnswerSelect = document.getElementById('correct-mcq-answer');
    const addChoiceBtn = document.getElementById('add-choice');

    correctAnswerSelect.innerHTML = '';

    if (questionType === 'truefalse') {
        while (choicesContainer.children.length > 2) {
            choicesContainer.removeChild(choicesContainer.lastChild);
        }

        choices[0].querySelector('input').value = "True";
        choices[1].querySelector('input').value = "False";
        choices[0].querySelector('input').disabled = true;
        choices[1].querySelector('input').disabled = true;
        addChoiceBtn.style.display = 'none';
    } else {
        choices[0].querySelector('input').value = "";
        choices[1].querySelector('input').value = "";
        choices[0].querySelector('input').disabled = false;
        choices[1].querySelector('input').disabled = false;
        addChoiceBtn.style.display = 'inline-block';
    }

    choicesContainer.querySelectorAll('.choice-container input').forEach((choice, index) => {
        const letter = String.fromCharCode(65 + index);
        correctAnswerSelect.innerHTML += `<option value="${letter}">${letter}) ${choice.value}</option>`;
    });

    correctAnswerSelect.disabled = false;
}

function getQuestionMark() {
    const markInput = document.getElementById('question-mark');
    return parseInt(markInput.value) || 1;
}

function saveQuestion() {
    const questionText = document.getElementById('question-text').value.trim();
    const questionType = document.getElementById('question-type').value;
    const correctAnswer = document.getElementById('correct-mcq-answer').value;
    const questionMarks = parseInt(document.getElementById('question-mark').value, 10);

    if (!questionText || isNaN(questionMarks) || questionMarks < 1) {
        alert('Please enter a valid question and marks.');
        return;
    }

    const choicesContainer = document.getElementById('choices-container');
    const choices = choicesContainer.children;
    const options = [];

    for (let i = 0; i < choices.length; i++) {
        const choiceText = choices[i].querySelector('input').value.trim();
        if (choiceText) {
            options.push(choiceText);
        } else {
            alert('All choices must be filled.');
            return;
        }
    }

    if (questionType === 'mcq' && options.length < 2) {
        alert('MCQ must have at least two choices.');
        return;
    }

    quizData.questions.push({
        questionText,
        questionType,
        options: questionType === 'mcq' ? options : ['True', 'False'],
        correctAnswer,
        marks: questionMarks
    });

    const existingIndex = quizData.questions.findIndex(q => q.questionText === questionText && q.questionType === questionType);

    if (existingIndex !== -1) {
        quizData.questions[existingIndex].options = options;
        quizData.questions[existingIndex].correctAnswer = correctAnswer;
        quizData.questions[existingIndex].marks = questionMarks;
    } else {
        quizData.questions.push({
            questionText,
            questionType,
            options: questionType === 'mcq' ? options : ['True', 'False'],
            correctAnswer,
            marks: questionMarks
        });
    }

    updateQuestionDropdown();
    resetQuestionForm()

    document.querySelector("button[onclick='finishQuiz()']").disabled = false;
}

function resetQuestionForm() {
    document.getElementById('question-text').value = '';
    document.getElementById('question-type').value = 'mcq';
    document.getElementById('question-mark').value = '';
    document.getElementById('choices-container').innerHTML = '';

    addChoice();
    addChoice();
    updateCorrectAnswerDropdown();
    document.getElementById('add-choice').style.display = 'inline-block';
}

function updateQuestionDropdown() {
    const select = document.getElementById('select-question');
    const deleteButton = document.getElementById('remove-question');

    const previousSelection = select.value; 
    select.innerHTML = '';

    const newQuestionOption = document.createElement('option');
    newQuestionOption.value = "new";
    newQuestionOption.textContent = "Creating New Question";
    select.appendChild(newQuestionOption);

    quizData.questions.forEach((question, index) => {
        const option = document.createElement('option');
        option.value = index;
        option.textContent = `Q${index + 1}: ${question.questionText}`;
        select.appendChild(option);
    });

    select.value = previousSelection && select.querySelector(`[value="${previousSelection}"]`)
        ? previousSelection
        : "new";

    deleteButton.disabled = (select.value === "new");
}

function jumpToQuestion() {
    const select = document.getElementById('select-question');
    const deleteButton = document.getElementById('remove-question');

    if (select.value === "new") {
        resetQuestionForm();
        deleteButton.disabled = true;
    } else {
        const question = quizData.questions[select.value];
        document.getElementById('question-text').value = question.questionText;
        document.getElementById('question-type').value = question.questionType;
        document.getElementById('question-mark').value = question.marks;

        const choicesContainer = document.getElementById('choices-container');
        choicesContainer.innerHTML = "";

        if (question.questionType === "truefalse") {
            const trueChoice = createChoiceElement("A", "True", true);
            const falseChoice = createChoiceElement("B", "False", true);
            choicesContainer.appendChild(trueChoice);
            choicesContainer.appendChild(falseChoice);
            document.getElementById('add-choice').style.display = 'none';
        } else {
            document.getElementById('add-choice').style.display = 'inline-block';
            question.options.forEach((choice, index) => {
                const choiceElement = createChoiceElement(String.fromCharCode(65 + index), choice, false);
                choicesContainer.appendChild(choiceElement);
            });
        }

        updateCorrectAnswerDropdown();

        const correctAnswerSelect = document.getElementById('correct-mcq-answer');
        if (correctAnswerSelect) {
            correctAnswerSelect.value = question.correctAnswer;
        }

        deleteButton.disabled = false;
    }
}

function createChoiceElement(letter, value, disabled) {
    const choiceWrapper = document.createElement('div');
    choiceWrapper.classList.add('choice-container');

    const choiceLabel = document.createElement('label');
    choiceLabel.textContent = `${letter}:`;

    const choiceInput = document.createElement('input');
    choiceInput.type = 'text';
    choiceInput.value = value;
    choiceInput.name = letter;
    choiceInput.disabled = disabled;

    choiceWrapper.appendChild(choiceLabel);
    choiceWrapper.appendChild(choiceInput);
    return choiceWrapper;
}

function deleteQuestion() {
    const select = document.getElementById('select-question');
    const selectedIndex = parseInt(select.value, 10);

    if (!isNaN(selectedIndex)) {
        quizData.questions.splice(selectedIndex, 1);
        updateQuestionDropdown();
        resetQuestionForm();
    }
    if(quizData.questions.length === 0){
        document.querySelector("button[onclick='finishQuiz()']").disabled = true;
    }
}

function finishQuiz() {
    const quizNameInput = document.getElementById('quiz-name');
    const quizDescriptionInput = document.getElementById('quiz-description');
    const quizCategoryInput = document.getElementById('quiz-category');
    const quizDifficultyInput = document.getElementById('quiz-difficulty');

    const quizName = quizNameInput.value.trim();
    const quizDescription = quizDescriptionInput.value.trim();
    const quizCategory = quizCategoryInput.value.trim();
    const quizDifficulty = quizDifficultyInput.value;

    if (!quizName || !quizDescription || !quizCategory || !quizDifficulty) {
        alert('Please fill all quiz details before finishing.');
        return;
    }

    if (quizData.questions.length === 0) {
        alert('You must add at least one question before finishing the quiz.');
        return;
    }

    mockQuizData.push({ ...quizData });

    quizData = { name: "", description: "", category: "", difficulty: "", questions: [] };

    quizNameInput.value = "";
    quizDescriptionInput.value = "";
    quizCategoryInput.value = "";
    quizDifficultyInput.value = "Easy";

    alert('Quiz saved successfully!');
    window.location.href = "index.html";
}
