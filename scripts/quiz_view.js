// Mock Quiz Data
const mockQuizData = [
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
                "correctAnswer": "Au",
                "marks": 2
            },
            {
                "questionText": "How many planets are in the Solar System?",
                "questionType": "mcq",
                "options": ["7", "8", "9", "10"],
                "correctAnswer": "8",
                "marks": 2
            },
            {
                "questionText": "True or False: Sound travels faster in air than in water.",
                "questionType": "truefalse",
                "options": ["True", "False"],
                "correctAnswer": "False",
                "marks": 1
            },
            {
                "questionText": "Which gas do plants absorb during photosynthesis?",
                "questionType": "mcq",
                "options": ["Oxygen", "Nitrogen", "Carbon Dioxide", "Hydrogen"],
                "correctAnswer": "Carbon Dioxide",
                "marks": 2
            },
            {
                "questionText": "What is the powerhouse of the cell?",
                "questionType": "mcq",
                "options": ["Nucleus", "Mitochondria", "Ribosome", "Chloroplast"],
                "correctAnswer": "Mitochondria",
                "marks": 2
            }
        ]
    }
];

// Quiz State
let currentQuizIndex = 0;
let currentQuestionIndex = 0;
let score = 0;
let selectedQuiz = mockQuizData[currentQuizIndex];
let selectedAnswer = null; // Track the user's selected answer

// DOM Elements
const questionText = document.getElementById('question-text');
const optionsContainer = document.getElementById('options-container');
const prevButton = document.getElementById('prev-button');
const nextButton = document.getElementById('next-button');
const finishButton = document.getElementById('finish-button');
const scoreDisplay = document.getElementById('score');

// Initialize Quiz
function startQuiz() {
    loadQuestion();
    updateNavigationButtons();
    updateScore();
}

// Load Current Question
function loadQuestion() {
    const question = selectedQuiz.questions[currentQuestionIndex];
    questionText.textContent = question.questionText;
    optionsContainer.innerHTML = '';

    if (question.questionType === "mcq") {
        // Render MCQ options as radio buttons
        question.options.forEach((option, index) => {
            const radioWrapper = document.createElement('div');
            radioWrapper.classList.add('radio-option');

            const radioInput = document.createElement('input');
            radioInput.type = "radio";
            radioInput.name = "answer";
            radioInput.value = option;
            radioInput.id = `option-${index}`;
            radioInput.onchange = () => selectAnswer(option);

            const radioLabel = document.createElement('label');
            radioLabel.textContent = option;
            radioLabel.htmlFor = `option-${index}`;

            radioWrapper.appendChild(radioInput);
            radioWrapper.appendChild(radioLabel);
            optionsContainer.appendChild(radioWrapper);
        });
    } else if (question.questionType === "truefalse") {
        // Render True/False options as radio buttons
        const trueRadioWrapper = document.createElement('div');
        trueRadioWrapper.classList.add('radio-option');

        const trueRadioInput = document.createElement('input');
        trueRadioInput.type = "radio";
        trueRadioInput.name = "answer";
        trueRadioInput.value = "True";
        trueRadioInput.id = "option-true";
        trueRadioInput.onchange = () => selectAnswer("True");

        const trueRadioLabel = document.createElement('label');
        trueRadioLabel.textContent = "True";
        trueRadioLabel.htmlFor = "option-true";

        trueRadioWrapper.appendChild(trueRadioInput);
        trueRadioWrapper.appendChild(trueRadioLabel);
        optionsContainer.appendChild(trueRadioWrapper);

        const falseRadioWrapper = document.createElement('div');
        falseRadioWrapper.classList.add('radio-option');

        const falseRadioInput = document.createElement('input');
        falseRadioInput.type = "radio";
        falseRadioInput.name = "answer";
        falseRadioInput.value = "False";
        falseRadioInput.id = "option-false";
        falseRadioInput.onchange = () => selectAnswer("False");

        const falseRadioLabel = document.createElement('label');
        falseRadioLabel.textContent = "False";
        falseRadioLabel.htmlFor = "option-false";

        falseRadioWrapper.appendChild(falseRadioInput);
        falseRadioWrapper.appendChild(falseRadioLabel);
        optionsContainer.appendChild(falseRadioWrapper);
    }

    // Clear selected answer when loading a new question
    selectedAnswer = null;
}

// Handle Answer Selection
function selectAnswer(answer) {
    selectedAnswer = answer;
}

// Submit Answer and Move to Next Question
function submitAnswer() {
    const question = selectedQuiz.questions[currentQuestionIndex];
    if (selectedAnswer === null) {
        alert("Please select an answer before proceeding.");
        return false; // Return false if no answer is selected
    }

    if (selectedAnswer === question.correctAnswer) {
        score += question.marks;
    } else {
        // Only deduct marks if the score is greater than zero
        if (score > 0) {
            score -= question.marks;
        } else {
            // If the score is zero, keep it at zero
            score = 0;
        }
    }
    updateScore();
    return true; // Return true if the answer was submitted successfully
}

// Update Score Display
function updateScore() {
    scoreDisplay.textContent = score;
}

// Update Navigation Buttons
function updateNavigationButtons() {
    prevButton.disabled = currentQuestionIndex === 0;
    nextButton.disabled = currentQuestionIndex === selectedQuiz.questions.length - 1;
    finishButton.style.display = currentQuestionIndex === selectedQuiz.questions.length - 1 ? 'inline-block' : 'none';
}

// Next Question
function nextQuestion() {
    if (currentQuestionIndex < selectedQuiz.questions.length - 1) {
        const answerSubmitted = submitAnswer(); // Submit the current answer
        if (answerSubmitted) {
            currentQuestionIndex++;
            loadQuestion();
            updateNavigationButtons();
        }
    }
}

// Previous Question
function prevQuestion() {
    if (currentQuestionIndex > 0) {
        // Go back without requiring an answer to be selected
        currentQuestionIndex--;
        loadQuestion();
        updateNavigationButtons();
    }
}

// Finish Quiz
function finishQuiz() {
    const answerSubmitted = submitAnswer(); // Submit the final answer
    if (answerSubmitted) {
        alert(`Quiz finished! Your final score is ${score}`);
        // Reset or redirect as needed
    }
}

// Event Listeners
prevButton.addEventListener('click', prevQuestion);
nextButton.addEventListener('click', nextQuestion);
finishButton.addEventListener('click', finishQuiz);

// Start the Quiz
startQuiz();